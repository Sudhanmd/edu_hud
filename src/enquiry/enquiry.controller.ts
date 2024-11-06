import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EnquiryService } from './enquiry.service';
import { EnquiryDto, FilterDto, UpdateEnquiryDto } from './enquiry.dot';
import { Filter } from 'typeorm';

@Controller('enquiry')
export class EnquiryController {
  constructor(private readonly enquiryServices: EnquiryService) {}

  @Post('addEnquiry')
  async createEnquiry(@Body() body: EnquiryDto) {
    return await this.enquiryServices.createEnquiry(body);
  }

  @Get('getAllEnquiry')
  async getAllEnquiries() {
    return await this.enquiryServices.getAllEnquiries();
  }

  @Get('getEnquiryByEnquiryID')
  async getEnquriesEnquiryId(@Query() query: FilterDto) {
    return await this.enquiryServices.getEnquriesEnquiryId(query.id);
  }

  @Get('getEnquiryByUserId')
  async getEnquriesUserId(@Query() query: FilterDto) {
    return await this.enquiryServices.getEnquriesByUserId(query.id);
  }

  @Get('getEnquiryByCourseId/:courseId')
  async getEnquriesCourseId(@Param('courseId') id: string) {
    return await this.enquiryServices.getEnquriesByCourseID(id);
  }

  @Put('updateEnrollByEnrollID/:enrollID')
  async updateAllEnquriesById(
    @Param('id') id: string,
    @Body() body: UpdateEnquiryDto,
  ) {
    return await this.enquiryServices.updateAllEnquriesById(id, body);
  }

  @Delete('deleteEnrollByEnrollID/:enrollID')
  async deleteEnquiryById(@Param('Id') id: string) {
    return await this.enquiryServices.deleteEnquiryById(id);
  }
}
