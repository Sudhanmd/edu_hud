import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MaterialDto } from './material.dto';
import { Material_Entity } from 'src/entity/material.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MaterialService {
    
constructor(
        @InjectRepository(Material_Entity)
        private readonly materialRpository: Repository<Material_Entity>,
      ){}
    

async creatematerial(body: MaterialDto) {try {
        const create = await this.materialRpository.save(body)
        return{success:true, message:create}
        } 
        catch (error) {
            throw new BadRequestException(error.message || error);
        }} 


async getAllMaterial() {
        try {
            const getall = await this.materialRpository.find()
            if(!getall) throw new NotFoundException(`No Material Found`)
            return getall;
        } catch (error) {
            throw new BadRequestException(error.message || error)
        }
    }


async getMaterialById(id: string) {
        try {
            const getByid = await this.materialRpository.find({where:{id}})
        if(!getByid) throw new NotFoundException(`given ${id} is not found`)
        return getByid;
        } 
        catch (error) {
            throw new BadRequestException(error.message || error);
        }
    }

async getByCourseId(id:string){
    try {
        const checkcourseid = await this.materialRpository.find({
            where:{id},
        relations:['Course_entity']})
        if(!checkcourseid) throw new NotFoundException(`given ${id} not found`)
        return checkcourseid;
    } catch (error) {
        throw new BadRequestException(error.message || error);
    }
}

async  updateMaterialById(id: string, body: MaterialDto) {
        try {
            const checkID = await this.materialRpository.findOne({where:{id:id}})
           if(!checkID) throw new NotFoundException(`given ${id} is not found`)
            const updatebody = await this.materialRpository.update(id,body)
           return {success:true,message:updatebody};
           } 
           catch (error) {
               throw new BadRequestException(error.message || error);
           }
       }

 async  deleteMaterialById(id: string) {try {
        const checkId = await this.materialRpository.delete(id)
        if(checkId.affected === 0){
          throw new NotFoundException (`Given ${id} is not found`);   
        }
      return {message:`${id} is deleted successfully`};
    } catch (error) {
        throw new BadRequestException(error.message || error)}
      }
  
}
