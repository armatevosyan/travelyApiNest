import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}
  @Post('sign-up')
  create(@Body() data: Partial<User>) {
    console.log(data, 111111);
    return this.userService.create(data);
  }
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
