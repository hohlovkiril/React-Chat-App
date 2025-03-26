import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entities";
import { UserController } from "./controllers/user.controller";
import { UserSevice } from "./providers/user.provider";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController],
  providers: [UserSevice],
  exports: [UserSevice],
})
export class UserModule {}