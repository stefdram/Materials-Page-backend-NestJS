import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/login.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import {
  comparePassword,
  generateToken,
  passwordHash,
} from './helper/password-config';
// import Response from express just for type declaration
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { ComparePasswordDto } from './dto/compare-password.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Users)
    private readonly loginRepository: Repository<Users>,
  ) {}

  async getUsers(): Promise<Users[]> {
    // Get all the users
    const allUsers = await this.loginRepository.find();
    return allUsers;
  }

  async getUserByNik(nik: number): Promise<Users> {
    // Get a user by a given NIK
    const user = await this.loginRepository.findOneBy({ nik: nik });
    return user;
  }

  async createUser(
    createUserDto: CreateUserDto,
    res: Response,
  ): Promise<Response> {
    const user = createUserDto;
    // Check if the user already exists
    const existingUser = await this.getUserByNik(user.nik);
    if (existingUser) {
      return res.status(400).send('User already exists');
    }
    // Create new user object
    const data = new Users();
    data.nik = user.nik;
    data.name = user.name.trim();
    data.password = await passwordHash(user.password.trim());
    try {
      // Save user to the database and return a response
      await data.save();
      return res.json({
        message: 'User created successfully',
        body: { user: { name: data.name, nik: data.nik } },
      });
    } catch (e) {
      // Error caught
      throw new InternalServerErrorException(e);
    }
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    nik: number,
    res: Response,
  ): Promise<Response> {
    // Check if the user does not exist
    const existingUser = await this.getUserByNik(nik);
    if (!existingUser) {
      return res.status(409).send('User does not exist!');
    }
    // Update the user
    const update = updateUserDto;
    existingUser.name = update.name.trim();
    existingUser.password = await passwordHash(update.password.trim());
    try {
      // Save the updated user data
      await existingUser.save();
      return res.json({
        message: 'User updated successfully',
        body: { user: { name: existingUser.name, nik: existingUser.nik } },
      });
    } catch (e) {
      // Error caught
      throw new InternalServerErrorException(e);
    }
  }

  async deleteUser(nik: number, res: Response): Promise<Response> {
    const existingUser = await this.getUserByNik(nik);
    if (!existingUser) {
      return res.status(400).send('User does not exist!');
    }
    await existingUser.remove();
    return res.json(`User ${nik} has been deleted`);
  }

  async signInUser(
    signInUserDto: SignInUserDto,
    res: Response,
  ): Promise<Response> {
    const user = signInUserDto;
    const existingUser = await this.getUserByNik(user.nik);
    if (!existingUser) {
      return res.status(404).send('User does not exist');
    }
    if (!(await comparePassword(user.password, existingUser.password))) {
      return res.status(400).send('Not allowed! Incorrect password');
    }
    const token = await generateToken(existingUser);
    return res.send({ name: existingUser.name, token: token });
  }

  async comparePass(
    comparePasswordDto: ComparePasswordDto,
    res: Response,
  ): Promise<Response> {
    const userPass = comparePasswordDto.userPassword;
    const inputPass = comparePasswordDto.inputPassword;
    if (!(await comparePassword(inputPass, userPass))) {
      return res.send(false);
    }
    return res.send(true);
  }
}
