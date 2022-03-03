import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get.user.decorator';
import { UserEntity } from './user.entity';
import { SignupCredentialsDTO } from './dto/signup.credentials.dto';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // get profile
  @UseGuards(AuthGuard())
  @Get()
  getProfile(@GetUser() user: UserEntity) {
    return user;
  }

  // signup
  @Post('/signup')
  @UsePipes(ValidationPipe)
  signup(@Body() signupCredentialsDto: SignupCredentialsDTO) {
    return this.userService.signup(signupCredentialsDto);
  }

  // signin
  @Post('signin')
  @UsePipes(ValidationPipe)
  signin(@Body() authCredentialsDto: AuthCredentialsDTO) {
    return this.userService.signin(authCredentialsDto);
  }

  //update
  @Patch('update')
  @UsePipes(ValidationPipe)
  updateUser(@Body() signupCredentialsDto: SignupCredentialsDTO) {
    return this.userService.updateUser(signupCredentialsDto);
  }
}
