import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Update_user, UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usermodel: UserService) {}

  //adding user by post
  @Post('adduser')
  async createUser(@Body() body: UserDto) {
    return await this.usermodel.createUser(body);
  }

  @Get('getAllStudents')
  async getAllStudents() {
    return await this.usermodel.getAllStudents();
  }

  @Get('getUserByUserId/:UserId')
  async getUserById(@Param('UserId') id: string) {
    return await this.usermodel.getUserById(id);
  }

  @Put('updateUserByUserId/:UserId')
  async updateUserById(@Param('UserId') id: string, @Body() body: Update_user) {
    return await this.usermodel.updateUserById(id, body);
  }

  @Delete('deleteUserByUserId/:UserId')
  async deleteUser(@Param('UserId') id: string) {
    return await this.usermodel.deleteUser(id);
  }
}
