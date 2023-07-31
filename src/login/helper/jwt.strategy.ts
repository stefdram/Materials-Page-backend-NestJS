import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { LoginService } from '../login.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginService: LoginService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'Random String',
    });
  }

  async validate(payload: any) {
    const user = await this.loginService.getUserByNik(payload.nik);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
