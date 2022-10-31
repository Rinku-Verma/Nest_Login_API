import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RefreshDTO } from './dto/refresh.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwt: JwtService,
  ) {}

  //----->>>>     LOGIN USER SIGNIN
  async login(loginUser: any) {
    try {
      const email = loginUser.email.toLowerCase();
      const isPresent = await this.userRepo.findOneBy({ email: email });
      if (isPresent) {
        const flag = await bcrypt.compare(
          loginUser.password,
          isPresent.password,
        );
        if (flag) {
          const payload = { email: isPresent.email, id: isPresent.id };
          const accessT = this.jwt.sign(payload, {
            secret: process.env.SECRET_KEY,
            expiresIn: process.env.EXPIRE_AT,
            algorithm: 'HS256',
          });
          const refreshT = this.jwt.sign(payload, {
            secret: process.env.REFRESH_TOKEN,
            expiresIn: process.env.EXPIRE_RT,
            algorithm: 'HS256',
          });
          isPresent.refresh_token = await bcrypt.hash(refreshT, 10);
          this.userRepo.save(isPresent);
          return {
            accessToken: accessT,
            refreshToken: refreshT,
          };
        } else {
          throw new BadRequestException('Wrong Password..!');
        }
      } else {
        throw new BadRequestException('Invalid User ID....!!');
      }
    } catch (err) {
      throw new BadRequestException({ error: err });
    }
  }

  //------>>>>> REGISTER USER SIGNUP
  async create(registerUser: any) {
    try {
      const email = registerUser.email.toLowerCase();
      const isPresent = await this.userRepo.findOneBy({ email: email });
      if (isPresent) {
        throw new BadRequestException('User Already Exist..!!');
      } else {
        registerUser.email = email;
        registerUser.password = await bcrypt.hash(registerUser.password, 10);
        const payload = {
          email: registerUser.email,
          id: registerUser.firstName,
        };
        const rToken = this.jwt.sign(payload, {
          secret: process.env.REFRESH_TOKEN,
          expiresIn: process.env.EXPIRE_RT,
          algorithm: 'HS256',
        });
        registerUser.refresh_token = await bcrypt.hash(rToken, 10);
        this.userRepo.save(registerUser);
        return { message: 'User Registered Successfully' };
      }
    } catch (err) {
      throw new BadRequestException({ error: err });
    }
  }

  //-------->>>>>>    FORGET PASSWORD
  async forgetPassword(Password: any) {
    try {
      const email = Password.email.toLowerCase();
      const isPresent = await this.userRepo.findOneBy({ email: email });
      if (isPresent) {
        if (Password.password === Password.confirmPass) {
          isPresent.password = await bcrypt.hash(Password.password, 10);
          this.userRepo.save(isPresent);
          return { message: 'User Password Forget Successfully' };
        } else {
          throw new BadRequestException('Enter Same Password...!!');
        }
      } else {
        throw new BadRequestException('Invalid User ID');
      }
    } catch (err) {
      throw new BadRequestException({ error: err });
    }
  }

  //-------->>>>>>      ONLY ADMIN CAN FIND ALL DATA
  async findAll(email: any) {
    try {
      if (email === 'rinkuverma@gmail.com') {
        return await this.userRepo.find();
      } else {
        throw new UnauthorizedException({ message: 'YOUR ARE NOT ADMIN' });
      }
    } catch (err) {
      throw new BadRequestException({ error: err });
    }
  }

  //------>>>>>     USER PROFILE
  async findOne(id: any) {
    try {
      const isPresent = await this.userRepo.findOneBy({ id: id });
      if (isPresent) {
        return { Profile: isPresent };
      } else {
        throw new UnauthorizedException('User Data Not Found...!!');
      }
    } catch (err) {
      throw new BadRequestException({ error: err });
    }
  }

  //----->>>> UPDATE USER DATA
  async update(id: any, updateUser: any) {
    try {
      const isPresent = await this.userRepo.findOneBy({ id: id });
      if (isPresent) {
        const flag = await bcrypt.compare(
          updateUser.password,
          isPresent.password,
        );
        if (flag) {
          isPresent.firstName = updateUser.firstName;
          isPresent.lastName = updateUser.lastName;
          this.userRepo.save(isPresent);
          return { message: 'User Data Updated' };
        } else {
          throw new BadRequestException('Please Enter Correct Password');
        }
      }
    } catch (err) {
      throw new BadRequestException({ error: err });
    }
  }

  //------>>>>>>      DELETE USER ACCOUNT
  async remove(id: any) {
    try {
      const isPresent = await this.userRepo.findOneBy({ id: id });
      if (isPresent) {
        this.userRepo.delete({ id: id });
        return { message: 'Profile Deleted Successfully' };
      }
    } catch (err) {
      throw new BadRequestException({ Error: err });
    }
  }

  //----->>>>>      LOGOUT USER
  async logout(id: any) {
    try {
      const isPresent = await this.userRepo.findOneBy({ id: id });
      isPresent.refresh_token = '-1';
      this.userRepo.save(isPresent);
      return { message: 'User Logout' };
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async refresh(body: RefreshDTO) {
    // console.log('hello');
    try {
      // console.log('jj')
      const id = this.jwt.verify(body.refreshToken, {
        secret: process.env.REFRESH_TOKEN,
      });
      const isPresent = await this.userRepo.findOneBy({ id: id.id });
      // console.log(isPresent)
      if (isPresent) {
        // console.log('kk');
        const flag = await bcrypt.compare(
          body.refreshToken,
          isPresent.refresh_token,
        );
        if (flag) {
          const payload = {
            id: isPresent.id,
            email: isPresent.email,
          };
          const accessT = this.jwt.sign(payload, {
            secret: process.env.SECRET_KEY,
            expiresIn: process.env.EXPIRE_AT,
            algorithm: 'HS256',
          });
          return { accessT: accessT };
        } else {
          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      throw new BadRequestException({ error: err });
    }
  }
}
//"3333@Adcc"
