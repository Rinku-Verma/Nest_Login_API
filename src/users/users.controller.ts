import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTGuard } from '../auth/guard/At.guard';
import { ApiSecurity } from '@nestjs/swagger';
import { UpdateUserDTO } from './dto/update.dto';
// import { RefreshTGuard } from '../auth/guard/RT.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiSecurity('jwt-auth')
  @UseGuards(AccessTGuard)
  @Get()
  findAll(@Req() req: any) {
    const email = req.user['email'];
    return this.usersService.findAll(email);
  }

  @ApiSecurity('jwt-auth')
  @UseGuards(AccessTGuard)
  @Get('profile')
  findOne(@Req() req: any) {
    const id = req.user['id'];
    return this.usersService.findOne(id);
  }

  @ApiSecurity('jwt-auth')
  @UseGuards(AccessTGuard)
  @Patch('update')
  update(@Req() req: any, @Body() updateUser: UpdateUserDTO) {
    const id = req.user['id'];
    return this.usersService.update(id, updateUser);
  }

  @ApiSecurity('jwt-auth')
  @UseGuards(AccessTGuard)
  @Delete('delete')
  remove(@Req() req: any) {
    const id = req.user['id'];
    return this.usersService.remove(id);
  }

  @ApiSecurity('jwt-auth')
  @UseGuards(AccessTGuard)
  @Post('logout')
  logout(@Req() req: any) {
    const id = req.user['id'];
    return this.usersService.logout(id);
  }
}
