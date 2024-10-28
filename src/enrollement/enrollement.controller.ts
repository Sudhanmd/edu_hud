import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EnrollementService } from './enrollement.service';
import { Enrollment_entity } from 'src/entity/enrollment.entity';
import { enrollementDto } from './enrollement.dto';

@Controller('enrollement')
export class EnrollementController {
   constructor(private readonly enrollementServices: EnrollementService){}

@Post('addenrollement')
async createEnrollement(@Body()body:enrollementDto){
    return await this.enrollementServices.createEnrollement(body)
}

@Get('getAllEnrollment')
     async getAllEnrollment(){
        return await this.enrollementServices.getAllEnrollment()
     }

  @Get()
  async getEnrollmentById(@Param('id')id: string)
{ return await this.enrollementServices.getEnrollmentById(id)}

  @Put()
    async updateEnrollmentByID(
      @Param('id') id: string,
      @Body() body:Enrollment_entity){
    return await this.enrollementServices.updateEnrollmentById(id,body)
  }

  @Delete()
  async deleteEnrollmentById(@Param('Id') id: string) {
    return await this.enrollementServices.deleteEnrollmentById(id);
  }




}
