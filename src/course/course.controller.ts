import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Course_entity} from 'src/entity/course.entity';
import { CourseService } from './course.service';
import { updateCourseDto } from './course.dto';


@Controller('course')
export class CourseController {
    constructor(private readonly courseModel: CourseService) {}

     @Post('addCourse')
     async createcourser(@Body() body:Course_entity){
        return await this.courseModel.createcourse(body)
     }

     @Get('getAllCourses')
     async getAllCourse(){
        return await this.courseModel.getAllCourse()
     }

  @Get('getCourseByCourseId/:Id')
  async getUserById(@Param('id')id: string)
{ return await this.courseModel.getCourseById(id)}

  @Put('updateCourseByCourseId/:courseId')
    async updateUserById(
      @Param('id') id: string,
      @Body() body:updateCourseDto){
    return await this.courseModel.updateUserById(id,body)
  }

  @Delete('deleteCourseByCourseId/:courseId')
  async deleteCourse(@Param('Id') id: string) {
    return await this.courseModel.deleteCourse(id);
  }


}
