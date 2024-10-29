import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course_entity } from 'src/entity/course.entity';
import { Repository } from 'typeorm';
import { updateCourseDto } from './course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course_entity)
    private readonly courseRepository: Repository<Course_entity>,
  ) {}

  //creating the course
  async createcourse(body: updateCourseDto) {
    try {
      const createuser = await this.courseRepository.save(body);
      return { success: true, message: createuser };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  //get all users
  async getAllCourse() {
    try {
      const getcourse = await this.courseRepository.find();
      return getcourse;
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  //get course by courseId
  async getCourseById(givenid: string) {
    try {
      const getcourse = await this.courseRepository.findOneBy({ id: givenid });
      if (!getcourse)
        throw new NotFoundException(`given ${givenid} is not found`);
      return getcourse;
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async updateCourseById(id: string, body: updateCourseDto) {
    try {
      const checkCourseID = await this.courseRepository.findOne({
        where: { id: id },
      });
      if (!checkCourseID)
        throw new NotFoundException(`given ${id} is not found`);
      const updateCouseId = await this.courseRepository.update(id, body);
      return { success: true, message: updateCouseId };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async deleteCourse(id: string) {
    try {
      const deleteCourse = await this.courseRepository.delete(id);
      if (deleteCourse.affected === 0) {
        throw new NotFoundException(`courseId ${id} is not found`);
      }
      return { message: `${id} is deleted successfully` };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }
}
