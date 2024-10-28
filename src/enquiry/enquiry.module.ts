import { Module } from '@nestjs/common';
import { EnquiryController } from './enquiry.controller';
import { EnquiryService } from './enquiry.service';
import { Enquiry_entity } from 'src/entity/enquiry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Enquiry_entity])],
  controllers: [EnquiryController],
  providers: [EnquiryService],
  exports:[EnquiryModule]
})
export class EnquiryModule {}
