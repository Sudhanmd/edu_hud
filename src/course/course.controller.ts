import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto, updateCourseDto } from './course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseModel: CourseService) {}

  @Post('addCourse')
  async createCourse(@Body() body: CourseDto) {
    // change entity to dto & get rel id in param
    return await this.courseModel.createCourse(body);
  }

  @Get('getAllCourses')
  async getAllCourse() {
    return await this.courseModel.getAllCourse();
  }

  @Get('getCourseByCourseId/:Id')
  async getCourseById(@Param('Id') id: string) {
    return await this.courseModel.getCourseById(id);
  }

  // get course by userId
  @Get('getCourseByUserId/:userId')
  async getCourseByUserId(@Param('userId') id: string) {
    return await this.courseModel.getCourseByUserId(id);
  }

  @Put('updateCourseByCourseId/:courseId')
  async updateCourseById(
    @Param('courseId') id: string,
    @Body() body: updateCourseDto,
  ) {
    return await this.courseModel.updateCourseById(id, body);
  }

  @Delete('deleteCourseByCourseId/:courseId')
  async deleteCourse(@Param('courseId') id: string) {
    return await this.courseModel.deleteCourse(id);
  }
}
