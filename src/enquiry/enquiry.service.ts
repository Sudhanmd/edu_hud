import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enquiry_entity } from '../entity/enquiry.entity';
import { Repository } from 'typeorm';
import { EnquiryDto, UpdateEnquiryDto } from './enquiry.dot';

@Injectable()
export class EnquiryService {
  constructor(
    @InjectRepository(Enquiry_entity)
    private readonly enrollementRepository: Repository<Enquiry_entity>,
  ) {}

  async createEnquiry(body: EnquiryDto) {
    try {
      const create = await this.enrollementRepository.save(body);
      return { success: true, Enquiry: create };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllEnquiries() {
    try {
      const enquiry = await this.enrollementRepository.find({
        relations: ['user', 'course'],
      });
      return { success: true, Enquiry: enquiry };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getEnquiryByEnquiryID(id: string) {
    try {
      const enquiry = await this.enrollementRepository.findOne({
        where: { id },
        relations: ['user', 'course'],
      });
      if (!enquiry) {
        throw new NotFoundException(`given ${id} is not found`);
      }
      return { success: true, Enquiry: enquiry };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getEnquriesByUserId(id: string) {
    try {
      const enquiry = await this.enrollementRepository.find({
        where: { user: { id } },
        relations: ['user', 'course'],
      });
      if (!enquiry) throw new NotFoundException(`given ${id} is not found`);
      return { success: true, Enquiry: enquiry };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getEnquriesCourseId(id: string) {
    try {
      const enquiry = await this.enrollementRepository.find({
        where: { course: { id } },
        relations: ['user','course'],
      });
      if (!enquiry) throw new NotFoundException(`given ${id} is not found`);
      return { success: true, Enquiry: enquiry };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateEnquiryByEnquiryID(id: string, body: UpdateEnquiryDto) {
    try {
      console.info(body)
      const enquiry = await this.enrollementRepository.findOne({
        where: { id },
      });
      if (!enquiry) throw new NotFoundException(`given ${id} is not found`);
      const updatebody = await this.enrollementRepository.update(id, body);
      return { success: true, Enquiry: updatebody };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  
  async deleteEnquiryById(id: string) {
    try {
      const enquiry = await this.enrollementRepository.delete(id);
      if (enquiry.affected === 0) {
        throw new NotFoundException(`Given ${id} is not found`);
      }
      return { message: `deleted successfully` };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
