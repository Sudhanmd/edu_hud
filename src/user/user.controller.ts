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
import { UpdateUser, UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  //adding user by post
  @Post('adduser')
  async createUser(@Body() body: UserDto) {
    return await this.userServices.createUser(body);
  }

  @Get('getallUsers')
  async getAllUsers() {
    return await this.userServices.getAllUsers();
  }

  @Get('searchUsers')
  async searchUsers(@Query() query: { name: string }) {
    return await this.userServices.searchUsers(query.name);
  }

  @Get('getUserByUserId/:UserId')
  async getUserById(@Param('UserId') id: string) {
    return await this.userServices.getUserById(id);
  }

  @Put('updateUserByUserId/:UserId')
  async updateUserById(@Param('UserId') id: string, @Body() body: UpdateUser) {
    return await this.userServices.updateUserById(id, body);
  }

  @Delete('deleteUserByUserId/:UserId')
  async deleteUser(@Param('UserId') id: string) {
    return await this.userServices.deleteUser(id);
  }
}
