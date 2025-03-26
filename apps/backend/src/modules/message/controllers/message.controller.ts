import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { MessageService } from "../providers/message.service";
import { MessageCreateDto, MessageGetManyDto, MessageUpdateDto } from "src/dto";

@Controller('message')
export class MessageController {

  private readonly logger: Logger = new Logger(MessageController.name);

  constructor(
    private readonly service: MessageService,
  ) {}

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOneByIdOrFailed(id);
  }

  @Get()
  public async getMany(@Query() dto: MessageGetManyDto) {
    return await this.service.findMany(dto);
  }

  @Post()
  public async create(@Body() dto: MessageCreateDto) {
    return await this.service.create(dto);
  }

  @Patch(':id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() dto: MessageUpdateDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}