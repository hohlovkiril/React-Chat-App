import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MessageEntity } from './Message.entity';
import { ChatEntity } from './Chat.entity';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true, nullable: false })
  username: string;

  @Column({ type: 'text', unique: false, nullable: false })
  password: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  registerAt: Date;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastOnlineAt: Date;

  /** Relatations */

  @OneToMany(() => ChatEntity, (chat) => chat.creator, { cascade: true })
  createdChats: ChatEntity[];

  @OneToMany(() => ChatEntity, (chat) => chat.invited, { cascade: true })
  invitedChats: ChatEntity[];

  @OneToMany(() => MessageEntity, (message) => message.user, { cascade: true })
  messages: MessageEntity[];
}
