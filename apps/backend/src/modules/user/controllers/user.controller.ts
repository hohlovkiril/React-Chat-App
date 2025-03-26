import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { UserSevice } from "../providers/user.provider";
import { UserCreateDto, UserGetManyDto, UserUpdateDto } from "src/dto";

@Controller('user')
export class UserController {

  private readonly logger: Logger = new Logger(UserController.name);

  constructor(
    private readonly service: UserSevice,
  ) {}

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOneByIdOrFailed(id);
  }

  @Get()
  public async getMany(@Query() dto: UserGetManyDto) {
    return await this.service.findMany(dto);
  }

  @Post()
  public async create(@Body() dto: UserCreateDto) {
    return await this.service.create(dto);
  }

  @Post(':id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UserUpdateDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}