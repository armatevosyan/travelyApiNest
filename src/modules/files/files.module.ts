import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { FileRelation } from './entities/file-relation.entity';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { User } from '@/modules/users/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([FileEntity, FileRelation, User])],
  providers: [FilesService],
  controllers: [FilesController],
  exports: [FilesService],
})
export class FilesModule {}
