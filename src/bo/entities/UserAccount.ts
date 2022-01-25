import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_account' })
export class UserAccount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 250,
    nullable: false,
    unique: true
  })
  email: string;
}
