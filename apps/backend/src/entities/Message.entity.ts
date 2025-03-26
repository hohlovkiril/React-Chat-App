import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';
import { ChatEntity } from './Chat.entity';

@Entity({
  name: 'message',
})
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: false, nullable: false })
  text: string;

  @Column({ type: 'boolean', unique: false, nullable: false, default: false })
  isRead?: boolean;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  /** Relatations */

  @ManyToOne(() => ChatEntity, (chat) => chat.messages, { onDelete: 'CASCADE' })
  @JoinColumn()
  chat: ChatEntity;

  @ManyToOne(() => UserEntity, (user) => user.messages, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  user: UserEntity;
}
