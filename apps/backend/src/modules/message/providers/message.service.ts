import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageGetManyDto, MessageCreateDto, MessageUpdateDto } from "src/dto";
import { MessageEntity } from "src/entities";
import { Repository, SelectQueryBuilder } from "typeorm";

@Injectable()
export class MessageService {

  private readonly logger: Logger = new Logger(MessageService.name);

  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>,
  ) {}

  private async createBuilder(): Promise<SelectQueryBuilder<MessageEntity>> {
    return await this.repository.createQueryBuilder('message')
      .leftJoinAndSelect('message.chat', 'chat')
      .leftJoinAndSelect('message.user', 'user')
  }

  public async findOneByIdOrNull(id: number): Promise<MessageEntity | null> {
    const query = await this.createBuilder();

    query.where('message.id = :id', { id });

    return await query.getOne();
  }

  public async findOneByIdOrFailed(id: number): Promise<MessageEntity> {
    const message = await this.findOneByIdOrNull(id);

    if (!message) {
      throw new NotFoundException(`Message with id: ${id} not found!`);
    }

    return message;
  }

  public async findMany(payload: MessageGetManyDto): Promise<MessageEntity[]> {
    const query = await this.createBuilder();

    query.where('1 = 1');

    query.orderBy('message.id', 'DESC');

    return await query.getMany();
  }

  public async create(payload: MessageCreateDto): Promise<MessageEntity> {
    const newMessage = await this.repository.create();

    return newMessage;
  }

  public async update(id: number, payload: MessageUpdateDto): Promise<MessageEntity> {
    const message = await this.findOneByIdOrFailed(id);

    return message;
  }

  public async remove(id: number): Promise<MessageEntity> {
    const message = await this.findOneByIdOrFailed(id);

    await this.repository.remove(message);

    return message;
  }
}