import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course_entity } from 'src/entity/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Course_entity])],
  controllers: [CourseController],
  providers: [CourseService],
  exports:[CourseModule]
})
export class CourseModule {}
