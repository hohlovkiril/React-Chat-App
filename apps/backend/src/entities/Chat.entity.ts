import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageEntity } from './Message.entity';
import { UserEntity } from './User.entity';

@Entity({
  name: 'chat',
})
export class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  сreatedAt: Date;

  /** Relatations */

  @OneToMany(() => MessageEntity, (message) => message.chat, { cascade: true })
  messages: MessageEntity[];

  @ManyToOne(() => UserEntity, (user) => user.createdChats, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  creator: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.invitedChats, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  invited: UserEntity;
}
