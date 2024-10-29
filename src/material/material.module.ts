import { Module } from '@nestjs/common';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { Material_Entity } from 'src/entity/material.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [TypeOrmModule.forFeature([Material_Entity]), CourseModule],
  controllers: [MaterialController],
  providers: [MaterialService],
  exports: [MaterialModule],
})
export class MaterialModule {}
