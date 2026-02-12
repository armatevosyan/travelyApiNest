import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { Repository, In } from 'typeorm';
import { Facility } from './facility.entity';
import { FacilityQueryDto } from './facility.dto';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(Facility)
    private readonly facilityRepo: Repository<Facility>,
    private readonly i18n: I18nService,
  ) {}

  async findAll(query: FacilityQueryDto) {
    const { search, limit = 100, page = 0 } = query;

    const qb = this.facilityRepo.createQueryBuilder('facility');

    if (search) {
      qb.where(
        '(facility.name ILIKE :search OR facility.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Order by count DESC to show most popular facilities first, then by name
    qb.orderBy('facility.count', 'DESC')
      .addOrderBy('facility.name', 'ASC')
      .skip(page * limit)
      .take(limit);

    const [facilities, total] = await qb.getManyAndCount();
    return { facilities, total };
  }

  async findByIds(ids: number[]): Promise<Facility[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    const facilities = await this.facilityRepo.find({
      where: { id: In(ids) },
    });

    if (facilities.length !== ids.length) {
      const foundIds = facilities.map((f) => f.id);
      const missing = ids.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(
        this.i18n.translate('t.FACILITY_NOT_FOUND_IDS', {
          args: { ids: missing.join(', ') },
        }),
      );
    }

    return facilities;
  }

  /**
   * Increment the count for facilities when they are added to a place
   * This tracks how many places are using each facility
   */
  async incrementCount(facilityIds: number[]): Promise<void> {
    if (!facilityIds || facilityIds.length === 0) {
      return;
    }

    await this.facilityRepo
      .createQueryBuilder()
      .update(Facility)
      .set({ count: () => 'count + 1' })
      .whereInIds(facilityIds)
      .execute();
  }

  /**
   * Decrement the count for facilities when they are removed from a place
   * This tracks how many places are using each facility
   */
  async decrementCount(facilityIds: number[]): Promise<void> {
    if (!facilityIds || facilityIds.length === 0) {
      return;
    }

    await this.facilityRepo
      .createQueryBuilder()
      .update(Facility)
      .set({ count: () => 'GREATEST(count - 1, 0)' }) // Prevent negative counts
      .whereInIds(facilityIds)
      .execute();
  }

  /**
   * Update facility counts when a place's facilities change
   * Increments new facilities and decrements removed facilities
   */
  async updateCounts(
    oldFacilityIds: number[],
    newFacilityIds: number[],
  ): Promise<void> {
    const oldSet = new Set(oldFacilityIds);
    const newSet = new Set(newFacilityIds);

    // Facilities that were added (in new but not in old)
    const added = newFacilityIds.filter((id) => !oldSet.has(id));
    // Facilities that were removed (in old but not in new)
    const removed = oldFacilityIds.filter((id) => !newSet.has(id));

    await Promise.all([
      this.incrementCount(added),
      this.decrementCount(removed),
    ]);
  }
}
