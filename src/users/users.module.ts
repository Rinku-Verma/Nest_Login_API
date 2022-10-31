import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from '../auth/strategies/at.strategy';
import { RtStrategy } from '../auth/strategies/rt.strategy';
import { UsersLocalController } from './users.local.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    JwtModule,
  ],
  controllers: [UsersController, UsersLocalController],
  providers: [UsersService, AtStrategy, RtStrategy]
})
export class UsersModule {}
