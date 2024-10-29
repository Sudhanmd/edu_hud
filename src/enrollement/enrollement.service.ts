import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment_entity } from 'src/entity/enrollment.entity';
import { Repository } from 'typeorm';
import { enrollementDto } from './enrollement.dto';

@Injectable()
export class EnrollementService {
  constructor(
    @InjectRepository(Enrollment_entity)
    private readonly enrollementRepository: Repository<Enrollment_entity>,
  ) {}

  async createEnrollement(body: enrollementDto) {
    try {
      const create = await this.enrollementRepository.save(body);
      return { success: true, message: create };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async getAllEnrollment() {
    try {
      const getall = await this.enrollementRepository.find();
      if (!getall) throw new NotFoundException(`No Enrollment Found`);
      return getall;
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async getEnrollmentById(id: string) {
    try {
      const getByid = await this.enrollementRepository.find({ where: { id } });
      if (!getByid) throw new NotFoundException(`given ${id} is not found`);
      return getByid;
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async updateEnrollmentById(id: string, body: Enrollment_entity) {
    try {
      const checkID = await this.enrollementRepository.findOne({
        where: { id: id },
      });
      if (!checkID) throw new NotFoundException(`given ${id} is not found`);
      const updatebody = await this.enrollementRepository.update(id, body);
      return { success: true, message: updatebody };
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
      return { message: `${id} is deleted successfully` };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }
}
