import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { Result } from 'src/common/utils/result';
import { CreateUserDto } from './dto/create.dto';
import { QueryUserDto } from './dto/query.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { RedisService } from 'nestjs-redis';
import { ConfigService } from '@nestjs/config';
import { genSalt, hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRep: Repository<UserEntity>,
    private readonly redisService: RedisService,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) { }

  async create(dto: CreateUserDto): Promise<UserEntity | Result> {
    console.log(dto)
    const existing = await this.findByUsername(dto.username)
    if (existing) throw new HttpException('账号已存在，请调整后重新注册！', HttpStatus.NOT_ACCEPTABLE);
    const salt = await genSalt()
    dto.password = await hash(dto.password, salt)
    const user = plainToClass(UserEntity, { salt, ...dto }, { ignoreDecorators: true })
    console.log('user', user)
    const res = await this.userRep.save(user)
    return res
  }

  // 登录
  async login(account: string, password: string): Promise<object | Result> {
    const user = await this.findByUsername(account)
    if (!user) throw new HttpException('账号或密码错误', HttpStatus.NOT_FOUND);
    console.log('账号', account)
    console.log('密码', password)
    console.log('加密的密码', user.password)
    const checkPassword = await compare(password, user.password)
    console.log('是否一致', checkPassword)
    if (!checkPassword) throw new HttpException('账号或密码错误', HttpStatus.NOT_FOUND);
    // 生成 token
    const data = this.genToken({ id: user.id })
    return data
  }

  // 分页列表查找
  async page(dto: QueryUserDto): Promise<object> {
    const { page = 1, size = 10, username, status } = dto
    const where = {
      ...(status ? { status } : null),
      ...(username ? { username: Like(`%${username}%`) } : null),
    }
    const [result, total] = await this.userRep.findAndCount({ where, order: { id: 'DESC' }, skip: size * (page - 1), take: size })
    return {
      list: classToPlain(result),
      page: page,
      size: size,
      count: total,
    }
  }

  // 根据ID查找
  async findById(id: number): Promise<UserEntity> {
    const res = await this.userRep.findOne(id)
    if (!res) {
      throw new NotFoundException()
    }
    return res
  }

  // 根据ID更新
  async updateById(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    await this.findById(id)
    let updateResult = 1
    const user = plainToClass(UserEntity, dto)
    const res = await this.userRep.update(id, user).catch(e => updateResult = 0);
    return await this.findById(id)
  }

  // 根据ID删除
  async deleteById(id: number): Promise<UpdateResult> {
    await this.findById(id)
    const res = await this.userRep.softDelete(id)
    return res
  }

  // 根据用户名查找
  async findByUsername(username: string): Promise<UserEntity> {
    return await this.userRep.findOne({ username })
  }

  // 生成 token
  genToken(payload: { id: number }): Record<string, unknown> {
    const accessToken = `Bearer ${this.jwtService.sign(payload)}`
    const refreshToken = this.jwtService.sign(payload, { expiresIn: this.config.get('jwt.refreshExpiresIn') })
    return { accessToken, refreshToken }
  }

  // 刷新 token
  refreshToken(id: number): string {
    return this.jwtService.sign({ id })
  }

  // 校验 token
  verifyToken(token: string): number {
    try {
      if (!token) return 0
      const id = this.jwtService.verify(token.replace('Bearer ', ''))
      return id
    } catch (error) {
      return 0
    }
  }

  // 根据JWT解析的ID校验用户
  async validateUserByJwt(payload: { id: number }): Promise<UserEntity> {
    return await this.findById(payload.id)
  }
}
