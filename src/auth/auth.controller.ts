import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email)
    if (user === null) {
      throw new ForbiddenException('Invalid email or password!')
    }
    if (!await argon2.verify(user.password, loginDto.password)) {
      throw new ForbiddenException('Invalid email or password!')
    }
    return {
      token: await this.usersService.createToken(user.id)
    }
  }
}
