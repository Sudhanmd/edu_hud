import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User_entity } from '../entity/user.entity';
import { ILike, Repository } from 'typeorm';
import { UpdateUser, UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User_entity)
    private readonly userRepository: Repository<User_entity>, //userModel
  ) {}

  // creating new user
  async createUser(body: UserDto) {
    try {
      const checkuser = await this.userRepository.findOne({
        where: [{ email: body.email }],
      });
      if (checkuser) {
        throw new BadRequestException('Use different Email');
      }
      body['role'] = body.role.toUpperCase();
      console.info(body);
      const createuser = await this.userRepository.save(body);
      return { success: true, message: createuser };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  //getting all users
  async getAllUsers() {
    // try to find users by role=student in query filters
    const getuser = await this.userRepository.find();
    return { success: true, message: getuser };
  }

  //search users by usersname
  async searchUsers(name: string) {
    try {
      const getusers = await this.userRepository.find({
        where: { name: ILike(`%${name}%`) },
      });
      if (!getusers) throw new NotFoundException('NO Users on such value');
      return getusers;
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  //getusers by userId
  async getUserById(id: string) {
    try {
      //try relation
      const userById = await this.userRepository.findOne({ where: { id } });
      if (!userById) {
        throw new NotFoundException(`Given userID ${id} is not found`);
      }
      //return value with success
      return { success: true, message: userById };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async updateUserById(id: string, body: UpdateUser) {
    try {
      console.info(body);
      const checkUserId = await this.userRepository.findOne({
        where: { id },
      });
      if (!checkUserId) {
        throw new NotFoundException(`given id ${id} is not found`);
      }
      const updateuserbyid = await this.userRepository.update(id, body);
      return { success: true, message: updateuserbyid };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }

  async deleteUser(id: string) {
    try {
      const deleteUser = await this.userRepository.delete(id);
      if (deleteUser.affected === 0) {
        throw new NotFoundException(`userid ${id} is not found`);
      }
      return { message: `${id} is deleted successfully` };
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }
}
