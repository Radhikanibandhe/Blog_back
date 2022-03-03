import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { SignupCredentialsDTO } from './dto/signup.credentials.dto';
import * as crypto from 'crypto-js';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signup(signupcredentialsDto: SignupCredentialsDTO) {
    const user = new UserEntity();
    user.username = signupcredentialsDto.username;
    user.password = `${crypto.MD5(signupcredentialsDto.password)}`;
    user.firstname = signupcredentialsDto.firstname;
    user.lastname = signupcredentialsDto.lastname;
    user.country = signupcredentialsDto.country;
    user.city = signupcredentialsDto.city;
    user.email = signupcredentialsDto.email;
    user.gender = signupcredentialsDto.gender;

    await user.save();
  }

  async signin(authCredentialsDto: AuthCredentialsDTO) {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    console.log(user);
    if (!user) {
      return null;
    }
    if (!user.validatePassword(password)) {
      return null;
    }
    return user;
  }

}
