import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EnrollementService } from './enrollement.service';
import { Enrollment_entity } from 'src/entity/enrollment.entity';
import { enrollementDto, UpdateEnrollDto } from './enrollement.dto';

@Controller('enroll')
export class EnrollementController {
  constructor(private readonly enrollementServices: EnrollementService) {}

  @Post('addEnroll')
  async createEnrollement(@Body() body: enrollementDto) {
    return await this.enrollementServices.createEnrollement(body);
  }

  @Get('getEnrolledCourseByUserId/:userId')
  async getEnrollCourseByUserId(@Param('userId') user: string) {
    return await this.enrollementServices.getEnrollCourseByUserId(user);
  }

  @Get('getAllEnrolls')
  async getAll() {
    return await this.enrollementServices.getAll();
  }

  @Get('getEnrollById/:enrollID')
  async getEnrollmentById(@Param('enrollID') id: string) {
    return await this.enrollementServices.getEnrollmentById(id);
  }

  @Put('updateEnrollByEnrollID/:enrollID')
  async updateEnrollmentByID(
    @Param('enrollID') id: string,
    @Body() body: UpdateEnrollDto,
  ) {
    return await this.enrollementServices.updateEnrollmentById(id, body);
  }

  @Delete('deleteEnrollByEnrollID/:enrollID')
  async deleteEnrollmentById(@Param('enrollID') id: string) {
    return await this.enrollementServices.deleteEnrollmentById(id);
  }
}
