import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User_entity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { Update_user, UserDto } from './user.dto';


@Injectable()
export class UserService {
  
    constructor(
        @InjectRepository(User_entity)
        private readonly userRepository: Repository<User_entity>,
      ) {} 

// creating new user
      async createUser(body: UserDto) 
      {
        try {
         const checkuser = await this.userRepository.findOne({ where:{email:body.email}})
         if(checkuser)
          {
            throw new BadRequestException ("Use different Email");
          }
          const createuser = await this.userRepository.save(body)
              return{success:true, message:createuser}
            }
        catch (error) {
          throw new BadRequestException(error.message || error)
        }
        
    }

    async getAllUser(){
        try {
            const getusers = await this.userRepository.find()
            if(!getusers) throw new NotFoundException(`no users Found please Insert`)
            return getusers;
        } catch (error) {
            throw new BadRequestException(error.message || error)
        }
    }

    async getUserById(id:string){
        try {
            const userById = await this.userRepository.findOne({where:{id}})
            if(!userById){
                throw new NotFoundException(`Given userID ${id} is not found`);
              }
        } catch (error) {
            throw new BadRequestException(error.message || error)  
        }
    }
  
    async updateUserById(id:string, body: Update_user) {
        try {
            console.info(body);
            const checkid = await this.userRepository.findOne({where : {id}});
             if(!checkid){
              throw new NotFoundException(`given id ${id} is not found`)
             }
             const updateuserbyid = await this.userRepository.update(id,body)
           return {success:true,message:updateuserbyid}
          }
          catch (error) {
            throw new BadRequestException(error.message || error)
          }
      }
      

    async deleteUser(id:string){
        try {
            const deleteUser = await this.userRepository.delete(id)
            if(deleteUser.affected === 0){
              throw new NotFoundException (`userid ${id} is not found`);   
            }
          return {message:`${id} is deleted successfully`};
        } catch (error) {
            throw new BadRequestException(error.message || error)}
          }
        
}

