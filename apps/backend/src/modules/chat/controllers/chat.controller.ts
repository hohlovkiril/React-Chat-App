import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { ChatService } from "../providers/chat.service";
import { ChatCreateDto, ChatGetManyDto, ChatUpdateDto } from "src/dto";

@Controller('chat')
export class ChatController {

  private readonly logger: Logger = new Logger(ChatController.name);

  constructor(
    private readonly service: ChatService,
  ) {}

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOneByIdOrFailed(id)
  }

  @Get()
  public async getMany(@Query() dto: ChatGetManyDto) {
    return await this.service.findMany(dto);
  }

  @Post()
  public async create(@Body() dto: ChatCreateDto) {
    return await this.service.create(dto);
  }

  @Patch(':id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ChatUpdateDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}