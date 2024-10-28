import { Module } from '@nestjs/common';
import { EnquiryController } from './enquiry.controller';
import { EnquiryService } from './enquiry.service';

@Module({
  controllers: [EnquiryController],
  providers: [EnquiryService],
  exports:[EnquiryModule]
})
export class EnquiryModule {}
