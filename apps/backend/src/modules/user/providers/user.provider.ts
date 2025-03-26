import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCreateDto, UserGetManyDto, UserUpdateDto } from "src/dto";
import { UserEntity } from "src/entities";
import { Repository, SelectQueryBuilder } from "typeorm";

@Injectable()
export class UserSevice {

  private readonly logger: Logger = new Logger(UserSevice.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  private async createBuilder(): Promise<SelectQueryBuilder<UserEntity>> {
    return await this.repository.createQueryBuilder('user')
      .leftJoinAndSelect('user.createdChats', 'createdChats')
      .leftJoinAndSelect('user.invitedChats', 'invitedChats');
  }

  public async findOneByIdOrNull(id: number): Promise<UserEntity | null> {
    const query = await this.createBuilder();

    query.where('user.id = :id', { id });

    return await query.getOne();
  }

  public async findOneByIdOrFailed(id: number): Promise<UserEntity> {
    const user = await this.findOneByIdOrNull(id);

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found!`);
    }

    return user;
  }

  public async findOneByUsernameOrNull(username: string): Promise<UserEntity | null> {
    const query = await this.createBuilder();

    query.where('user.username = :username', { username });

    return await query.getOne();
  }

  public async findOneByUsernameOrFailed(username: string): Promise<UserEntity> {
    const user = await this.findOneByUsernameOrNull(username);

    if (!user) {
      throw new NotFoundException(`User with username: ${username} not found!`);
    }

    return user;
  }

  public async findMany(payload: UserGetManyDto): Promise<UserEntity[]> {
    const query = await this.createBuilder();

    query.where('1 = 1');

    query.orderBy('user.id', 'DESC');

    return await query.getMany();
  }

  public async create(payload: UserCreateDto): Promise<UserEntity> {
    const newUser = await this.repository.create();

    return newUser;
  }

  public async update(id: number, payload: UserUpdateDto): Promise<UserEntity> {
    const user = await this.findOneByIdOrFailed(id);

    return user;
  }

  public async remove(id: number): Promise<UserEntity> {
    const user = await this.findOneByIdOrFailed(id);

    await this.repository.remove(user);

    return user;
  }
}