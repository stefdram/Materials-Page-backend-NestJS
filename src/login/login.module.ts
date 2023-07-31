import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/login.entity';
import { JwtStrategy } from './helper/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
})

export class LoginModule {}