import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatEntity } from "src/entities";
import { ChatController } from "./controllers/chat.controller";
import { ChatService } from "./providers/chat.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatEntity]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}