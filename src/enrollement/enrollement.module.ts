import { Module } from '@nestjs/common';
import { EnrollementController } from './enrollement.controller';
import { EnrollementService } from './enrollement.service';

@Module({
  controllers: [EnrollementController],
  providers: [EnrollementService]
})
export class EnrollementModule {}
