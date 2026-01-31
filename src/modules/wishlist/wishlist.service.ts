import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { Place } from '@/modules/places/place.entity';
import {
  FileRelation,
  FileRelationType,
} from '@/modules/files/entities/file-relation.entity';
import { FilesService } from '@/modules/files/files.service';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepo: Repository<Wishlist>,
    @InjectRepository(Place)
    private readonly placeRepo: Repository<Place>,
    @InjectRepository(FileRelation)
    private readonly fileRelationRepo: Repository<FileRelation>,
    private readonly filesService: FilesService,
  ) {}

  async list(userId: number, page = 1, perPage = 10) {
    const skip = (page - 1) * perPage;

    const [rows, total] = await this.wishlistRepo.findAndCount({
      where: { userId },
      relations: ['place'],
      order: { createdAt: 'DESC' },
      skip,
      take: perPage,
    });

    const places = rows
      .map((r) => r.place)
      .filter((p): p is Place => Boolean(p));

    const placeIds = places
      .map((p) => p.id)
      .filter((id): id is number => typeof id === 'number');
    const fileRelations = placeIds.length
      ? await this.fileRelationRepo.find({
          where: {
            entityType: FileRelationType.PLACE,
            entityId: In(placeIds),
          },
          relations: ['file'],
          order: { createdAt: 'DESC' },
        })
      : [];

    const relationsByPlaceId = new Map<number, FileRelation[]>();
    for (const rel of fileRelations) {
      const list = relationsByPlaceId.get(rel.entityId) ?? [];
      list.push(rel);
      relationsByPlaceId.set(rel.entityId, list);
    }

    const items = places.map((place) => {
      const rels = relationsByPlaceId.get(place.id) ?? [];
      const files = rels.map((r) => r.file).filter(Boolean);

      const images = files.map((f) => ({
        id: f.id,
        full: { url: this.filesService.generatePublicUrl(f.bucketPath) },
        thumb: { url: this.filesService.generatePublicUrl(f.bucketPath) },
      }));

      return {
        ...place,
        images,
        image: images.length > 0 ? images[0] : undefined,
        wishlist: true,
      };
    });

    return {
      items,
      total,
      page,
      perPage,
      hasMore: page * perPage < total,
    };
  }

  async add(userId: number, placeId: number) {
    const place = await this.placeRepo.findOne({ where: { id: placeId } });
    if (!place) {
      throw new HttpException('Place not found', HttpStatus.NOT_FOUND);
    }

    const exists = await this.wishlistRepo.findOne({
      where: { userId, placeId },
    });
    if (exists) return exists;

    const row = this.wishlistRepo.create({ userId, placeId });
    return this.wishlistRepo.save(row);
  }

  async remove(userId: number, placeId: number) {
    await this.wishlistRepo.delete({ userId, placeId });
    return true;
  }

  async clear(userId: number) {
    await this.wishlistRepo.delete({ userId });
    return true;
  }
}
