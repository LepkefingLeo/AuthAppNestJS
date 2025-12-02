import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class UsersService {
  constructor (private readonly db: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      role: 'user',
      password: await argon2.hash(createUserDto.password)
    }
    return await this.db.user.create({ 
      data: newUser,
      omit: {
        password: true
      } 
    });
  }

  findByEmail(email: string) {
    return this.db.user.findUnique({
      where: {
        email
      }
    })
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
