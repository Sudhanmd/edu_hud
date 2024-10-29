import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EnquiryService } from './enquiry.service';
import { Enquiry_entity } from 'src/entity/enquiry.entity';

@Controller('enquiry')
export class EnquiryController {
  constructor(private readonly enquiryServices: EnquiryService) {}

  @Post('addenquiry')
  async createEnquiry(@Body() body: Enquiry_entity) {
    return await this.enquiryServices.createEnquiry(body);
  }

  @Get('getAllEnrollment')
  async getAllEnquiries() {
    return await this.enquiryServices.getAllEnquiries();
  }

  @Get()
  async getAllEnquriesById(@Param('id') id: string) {
    return await this.enquiryServices.getAllEnquriesById(id);
  }

  @Put()
  async updateAllEnquriesById(
    @Param('id') id: string,
    @Body() body: Enquiry_entity,
  ) {
    return await this.enquiryServices.updateAllEnquriesById(id, body);
  }

  @Delete()
  async deleteEnquiryById(@Param('Id') id: string) {
    return await this.enquiryServices.deleteEnquiryById(id);
  }
}
