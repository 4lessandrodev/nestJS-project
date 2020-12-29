import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
const ERROR_CODE_USER_ALREADY_EXIST = '23505';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { password, username } = authCredentialsDto;

    const user = new User();
    user.id = uuid();
    user.username = username;
    user.password = bcrypt.hashSync(password, 10);

    try {
      user.save();
    } catch (error) {
      if (error.code === ERROR_CODE_USER_ALREADY_EXIST) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validatePassword(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<string> {
    const { password, username } = authCredentialDto;
    const user = await this.findOne({ username });

    if (user && user.validatePassword(password)) {
      return user.username;
    }
  }
}
