import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // getAll(): Promise<User[]> {
  //   return this.userService.findAll();
  // }
  //
  // @Get(':id')
  // getOne(@Param('id') id: number) {
  //   return this.userService.findOne(id);
  // }
  //
  // @Post()
  // create(@Body() data: Partial<User>) {
  //   return this.userService.create(data);
  // }
  //
  // @Put(':id')
  // update(@Param('id') id: number, @Body() data: Partial<User>) {
  //   return this.userService.update(id, data);
  // }
  //
  // @Delete(':id')
  // delete(@Param('id') id: number) {
  //   return this.userService.remove(id);
  // }
}
