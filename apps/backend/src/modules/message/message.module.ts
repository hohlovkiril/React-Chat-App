import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "src/entities";
import { MessageController } from "./controllers/message.controller";
import { MessageService } from "./providers/message.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}