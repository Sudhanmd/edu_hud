import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enquiry_entity } from 'src/entity/enquiry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnquiryService {
  constructor(
    @InjectRepository(Enquiry_entity)
    private readonly enrollementRepository: Repository<Enquiry_entity>,
  ) {}

  async createEnquiry(body: Enquiry_entity) {
    try {
      const create = await this.enrollementRepository.save(body);
      return { success: true, message: create };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async getAllEnquiries() {
    try {
      const getall = await this.enrollementRepository.find();
      return { message: getall };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async getAllEnquriesById(id: string) {
    try {
      const getByid = await this.enrollementRepository.find({ where: { id } });
      if (!getByid) throw new NotFoundException(`given ${id} is not found`);
      return getByid;
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }
  async updateAllEnquriesById(id: string, body: Enquiry_entity) {
    try {
      const checkID = await this.enrollementRepository.findOne({
        where: { id },
      });
      if (!checkID) throw new NotFoundException(`given ${id} is not found`);
      const updatebody = await this.enrollementRepository.update(id, body);
      return { success: true, message: updatebody };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }
  async deleteEnquiryById(id: string) {
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
