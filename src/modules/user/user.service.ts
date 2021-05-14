import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { Result } from 'src/common/utils/result';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { RedisService } from 'nestjs-redis';
import { ConfigService } from '@nestjs/config';
import { genSalt, hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { RedisKeyPrefix } from 'src/common/enums/redis-prefix.enum';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly redisService: RedisService,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) { }

  // 创建
  async create(dto: CreateUserDto): Promise<Record<string, any>> {
    const existing = await this.findByAccount(dto.username)
    if (existing) throw new HttpException('账号已存在，请调整后重新注册！', HttpStatus.NOT_ACCEPTABLE);
    const salt = await genSalt()
    dto.password = await hash(dto.password, salt)
    const user = plainToClass(UserEntity, { salt, ...dto }, { ignoreDecorators: true })
    const res = await this.userRepo.save(user)
    return res
  }

  // 登录
  async login(account: string, password: string): Promise<Record<string, any>> {
    const user = await this.findByAccount(account)
    console.log("user", user)
    if (!user) throw new HttpException('账号或密码错误', HttpStatus.NOT_FOUND);
    Logger.log(account, '账号')
    Logger.log(password, '密码')
    Logger.log(user.password, '加密的密码')
    const checkPassword = await compare(password, user.password)
    Logger.log(checkPassword, '密码是否一致')
    if (!checkPassword) throw new HttpException('账号或密码错误', HttpStatus.NOT_FOUND);
    // 生成 token
    const data = this.genToken({ id: user.id })
    return {
      token: data,
      user: classToPlain(user),
    }
  }

  // 分页列表查找
  async page(dto: QueryUserDto): Promise<Record<string, any>> {
    const { page = 1, size = 10, username, status } = dto
    const where = {
      ...(status ? { status } : null),
      ...(username ? { username: Like(`%${username}%`) } : null),
    }
    const [result, total] = await this.userRepo.findAndCount({
      where,
      relations: ["dept"],
      order: { created_at: 'DESC' },
      skip: size * (page - 1),
      take: size
    })
    console.log(result)
    return {
      list: classToPlain(result),
      page: page,
      size: size,
      count: total,
    }
  }

  // 根据ID查找
  async findById(id: number): Promise<Record<string, any>> {
    const redis_user = await this.redisService.getClient('admin').hgetall(`user:info:${id}`)
    let user = plainToClass(UserEntity, redis_user, { enableImplicitConversion: true })
    if (!user?.id) {
      user = await this.userRepo.findOne(id)
      console.log(user)
      if (!user) {
        throw new NotFoundException()
      }
      await this.redisService.getClient('admin').hmset(`${RedisKeyPrefix.USER_INFO}${id}`, classToPlain(user))
    }
    return classToPlain(user)
  }

  // 根据ID更新
  async updateById(dto: UpdateUserDto): Promise<Record<string, any>> {
    const existing = await this.findById(dto.id)
    if (dto.password) {
      if (dto.password !== dto.confirmPassword) throw new HttpException('账号或密码错误', HttpStatus.NOT_ACCEPTABLE);
      dto.password = await hash(dto.password, existing.salt)
    }
    const user = plainToClass(UserEntity, dto)
    await this.userRepo.update(dto.id, user)
    await this.redisService.getClient('admin').hmset(`${RedisKeyPrefix.USER_INFO}${dto.id}`, classToPlain(dto))
    return classToPlain(await this.findById(dto.id))
  }

  // 根据ID删除
  async deleteById(id: number): Promise<Record<string, any>> {
    await this.findById(id)
    const res = await this.userRepo.softDelete(id)
    return res
  }

  // 根据用户名查找
  async findByAccount(username: string): Promise<Record<string, any>> {
    const user = await this.userRepo.findOne({ username })
    return user
  }

  // 生成 token
  genToken(payload: { id: number }): Record<string, any> {
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
  async validateUserByJwt(payload: { id: number }): Promise<Record<string, any>> {
    const user = await this.findById(payload.id)
    return classToPlain(user)
  }
}
