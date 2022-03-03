import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignupCredentialsDTO } from './dto/signup.credentials.dto';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { JwtPayload } from './jwt.payload';
import { UserEntity } from './user.entity';
import * as crypto from 'crypto-js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    private jwtService: JwtService,
  ) {}

  // signup
  async signup(signupCredentialsDto: SignupCredentialsDTO) {
    return this.userRepository.signup(signupCredentialsDto);
  }

  // signin
  async signin(authCredentialsDto: AuthCredentialsDTO) {
    const user = await this.userRepository.signin(authCredentialsDto);
    console.log(user);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const payload: JwtPayload = {
      username: user.username,
      id: user.id,
    };

    const token = await this.jwtService.sign(payload);
    return { token };
  }

  async updateUser(signupCredentialsDto: SignupCredentialsDTO) {
    user.username = signupCredentialsDto.username;
    user.password = `${crypto.MD5(signupCredentialsDto.password)}`;
    user.firstname = signupCredentialsDto.firstname;
    user.lastname = signupCredentialsDto.lastname;
    user.country = signupCredentialsDto.country;
    user.city = signupCredentialsDto.city;
    user.email = signupCredentialsDto.email;
    user.gender = signupCredentialsDto.gender;
  }
}
