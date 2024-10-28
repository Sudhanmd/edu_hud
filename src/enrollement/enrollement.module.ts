import { Module } from '@nestjs/common';
import { EnrollementController } from './enrollement.controller';
import { EnrollementService } from './enrollement.service';
import { Enrollment_entity } from 'src/entity/enrollment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment_entity])],
  controllers: [EnrollementController],
  providers: [EnrollementService],
  exports:[EnrollementModule]
})
export class EnrollementModule {}
