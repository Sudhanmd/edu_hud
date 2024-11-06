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
  async getEnquiryByEnquiryID(@Query() query: FilterDto) {
    return await this.enquiryServices.getEnquiryByEnquiryID(query.id);
  }

  @Get('getEnquiryByUserId')
  async getEnquriesByUserId(@Query() query: FilterDto) {
    return await this.enquiryServices.getEnquriesByUserId(query.id);
  }

  @Get('getEnquiryByCourseId/:courseId')
  async getEnquriesCourseId(@Param('courseId') id: string) {
    return await this.enquiryServices.getEnquriesCourseId(id);
  }

  @Put('updateEnquiryByEnquiryID/:enrollID')
  async updateEnquiryByEnquiryID(
    @Param('enrollID') id: string,
    @Body() body: UpdateEnquiryDto,
  ) {
    return await this.enquiryServices.updateEnquiryByEnquiryID(id, body);
  }

  @Delete('deleteEnrollByEnrollID/:enrollID')
  async deleteEnquiryById(@Param('Id') id: string) {
    return await this.enquiryServices.deleteEnquiryById(id);
  }
}
