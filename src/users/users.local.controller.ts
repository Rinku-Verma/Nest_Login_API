import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsersService } from './users.service';
import { loginUserDTO } from './dto/login-user.dto';
import { RegiterUserDTO } from './dto/register-user.dto';
import { ForgetDTO } from "./dto/forget-password.dto";
import { RefreshTGuard } from '../auth/guard/RT.guard';
import { RefreshDTO } from "./dto/refresh.dto";

@Controller()
@ApiTags('Local')
export class UsersLocalController {
    constructor(private readonly usersService: UsersService) {}

    @Post('signup')
    create(@Body() registerUserDto: RegiterUserDTO) {
      return this.usersService.create(registerUserDto);
    }
  
    @Post('login')
    login(@Body() login: loginUserDTO){
      return this.usersService.login(login);
    }

    @Post('forget-Password')
    forgetPassword(@Body() password: ForgetDTO){
        return this.usersService.forgetPassword(password);
    }
    
    // @UseGuards(RefreshTGuard)
    @Post('refresh')
    refresh(@Body() body: RefreshDTO){
      // const id = req.user['id'];
      return this.usersService.refresh(body);
    }
}