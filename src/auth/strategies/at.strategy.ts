import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../../users/users.service";
@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(private user: UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY,
            
        });
    }
    validate(payload: any){
        // console.log(payload);
        return payload;
    }
}