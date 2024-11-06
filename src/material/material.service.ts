import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MaterialDto, UPdateMaterialDto } from './material.dto';
import { Material_Entity } from '../entity/material.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course_entity } from '../entity/course.entity';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material_Entity)
    private readonly materialRepository: Repository<Material_Entity>,
  ) {}

  async createMaterial(body: MaterialDto) {
    try {
      const create = await this.materialRepository.save(body);
      return { success: true, message: create };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async getAllMaterial() {
    try {
      const getall = await this.materialRepository.find();
      if (!getall) throw new NotFoundException(`No Material Found`);
      return getall;
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async getMaterialById(id: string) {
    try {
      const getByid = await this.materialRepository.find({ where: { id } });
      if (!getByid) throw new NotFoundException(`given ${id} is not found`);
      return getByid;
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async getByCourseId(id: string) {
    try {
      const checkcourseid = await this.materialRepository.find({
        where: { course: { id } },
        relations: ['course'],
      });
      if (!checkcourseid) throw new NotFoundException(`given ${id} not found`);
      return checkcourseid;
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async updateMaterialById(id: string, body: UPdateMaterialDto) {
    try {
      const checkID = await this.materialRepository.findOne({
        where: { id: id },
      });
      if (!checkID) throw new NotFoundException(`given ${id} is not found`);
      const updatebody = await this.materialRepository.update(id, body);
      return { success: true, message: updatebody };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async deleteMaterialById(id: string) {
    try {
      const checkId = await this.materialRepository.delete(id);
      if (!checkId) throw new NotFoundException(`given id is not found`);
      return checkId;
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }
}
