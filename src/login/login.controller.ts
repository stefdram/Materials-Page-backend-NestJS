import { Controller, Get, Param, Body, Post, Res, Put, Req, Delete, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entity/login.entity';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { ComparePasswordDto } from './dto/compare-password.dto';
import { AuthGuard } from '@nestjs/passport/dist';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('users')
  async getUsers(): Promise<Users[]> {
    return this.loginService.getUsers();
  }

  @Get('users/:nik')
  async getUserByNik(@Param('nik') nik: number): Promise<Users> {
    return this.loginService.getUserByNik(nik);
  }

  @Post('users/signup')
  async createUser(
    @Body() payload: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    return this.loginService.createUser(payload, res);
  }

  @Put('users/:nik')
  async updateUser(
    @Body() payload: UpdateUserDto,
    @Param('nik') nik: number,
    @Res() res: Response,
  ): Promise<Response> {
    return this.loginService.updateUser(payload, nik, res);
  }

  @Delete('users/:nik')
  async deleteUser(
    @Param('nik') nik: number,
    @Res() res: Response,
  ): Promise<Response>  {
    return this.loginService.deleteUser(nik, res);
  }

  @Post('users/login')
  async singInUser(@Body() payload: SignInUserDto, @Res() res: Response): Promise<Response> {
    return this.loginService.signInUser(payload, res); 
  }

  @Post('compare-password')
  async comparePass(@Body() payload: ComparePasswordDto, @Res() res: Response): Promise<Response> {
    return this.loginService.comparePass(payload, res);
  }

  // next is to handle protected route using guard?
  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  test(@Res() res: Response, @Req() req): Response {
    console.log(req.user);
    return res.send("success!");
  }
}
