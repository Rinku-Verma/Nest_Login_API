import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, Matches, MinLength} from 'class-validator';

export class RegiterUserDTO{

        @ApiProperty()
        @IsNotEmpty()
        firstName: string;

        @ApiProperty()
        @IsNotEmpty()
        lastName: string;

        @ApiProperty()
        @IsEmail()
        email: string;

        @ApiProperty()
        @IsNotEmpty()
        @MinLength(8)
        @Matches(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
        {message: 'Password mush have 8 character long 1 letter 1 number 1 special character'})
        password: string;
        
}