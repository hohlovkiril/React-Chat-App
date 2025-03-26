import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChatCreateDto, ChatGetManyDto, ChatUpdateDto } from "src/dto";
import { ChatEntity } from "src/entities";
import { Repository, SelectQueryBuilder } from "typeorm";

@Injectable()
export class ChatService {

  private readonly logger: Logger = new Logger(ChatService.name);

  constructor(
    @InjectRepository(ChatEntity)
    private readonly repository: Repository<ChatEntity>,
  ) {}

  private async createBuilder(): Promise<SelectQueryBuilder<ChatEntity>> {
    return await this.repository.createQueryBuilder('chat')
      .leftJoinAndSelect('chat.messages', 'messages')
      .leftJoinAndSelect('chat.creator', 'creator')
      .leftJoinAndSelect('chat.invited', 'invited');
  }

  public async findOneByIdOrNull(id: number): Promise<ChatEntity | null> {
    const query = await this.createBuilder();

    query.where('chat.id = :id', { id });

    return await query.getOne();
  }

  public async findOneByIdOrFailed(id: number): Promise<ChatEntity> {
    const message = await this.findOneByIdOrNull(id);

    if (!message) {
      throw new NotFoundException(`Chat with id: ${id} not found!`);
    }

    return message;
  }

  public async findMany(payload: ChatGetManyDto): Promise<ChatEntity[]> {
    const query = await this.createBuilder();

    query.where('1 = 1');

    query.orderBy('chat.id', 'DESC');

    return await query.getMany();
  }

  public async create(payload: ChatCreateDto): Promise<ChatEntity> {
    const newChat = await this.repository.create();

    return newChat;
  }

  public async update(id: number, payload: ChatUpdateDto): Promise<ChatEntity> {
    const chat = await this.findOneByIdOrFailed(id);

    return chat;
  }

  public async remove(id: number): Promise<ChatEntity> {
    const chat = await this.findOneByIdOrFailed(id);

    await this.repository.remove(chat);

    return chat;
  }
}