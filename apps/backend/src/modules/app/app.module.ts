import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { ChatModule } from '../chat/chat.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ChatModule,
    MessageModule,
  ]
})
export class AppModule {}