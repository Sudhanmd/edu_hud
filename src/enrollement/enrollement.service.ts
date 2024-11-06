import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment_entity } from '../entity/enrollment.entity';
import { Repository } from 'typeorm';
import { EnrollementDto, UpdateEnrollDto } from './enrollement.dto';

@Injectable()
export class EnrollementService {
  constructor(
    @InjectRepository(Enrollment_entity)
    private readonly enrollementRepository: Repository<Enrollment_entity>,
  ) {}

  async createEnrollement(body: EnrollementDto) {
    try {
      // body['status'] = body.status.toUpperCase();
      const create = await this.enrollementRepository.save(body);
      return { success: true, message: create };
    } catch (error) {
      throw new BadRequestException(error.message );
    }
  }

  async getEnrollCourseByUserId(user: string) {
    try {
      const checkUserId = await this.enrollementRepository.find({
        where: { user: { id: user } },
        relations: ['course'],
      });
      if (!checkUserId)
        throw new NotFoundException(`The given UserId is ${user} not found`);
      return { success: true, Message: checkUserId };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async getAll() {
    try {
      const getAllEnroll = await this.enrollementRepository.find({
        relations: ['user', 'course'],
      });
      return { success: true, Message: getAllEnroll };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async getEnrollmentById(id: string) {
    try {
      const getByid = await this.enrollementRepository.find({
        where: { id },
        relations: ['user', 'course'],
      });
      if (!getByid) throw new NotFoundException(`given ${id} is not found`);
      return { success: true, message: getByid };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async updateEnrollmentById(id: string, body: UpdateEnrollDto) {
    try {
      const getByid = await this.enrollementRepository.find({ where: { id } });
      if (!getByid) throw new NotFoundException(`given ${id} is not found`);
      const update = await this.enrollementRepository.update(id,body);
     return {success: true , message: update}
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async deleteEnrollmentById(id: string) {
    try {
      const checkId = await this.enrollementRepository.delete(id);
      if (checkId.affected === 0) {
        throw new NotFoundException(`Given ${id} is not found`);
      }
      return { sucess: true, message: `${id} is deleted successfully` };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }
}
