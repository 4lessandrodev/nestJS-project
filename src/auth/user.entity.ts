import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'uuid' })
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.password);
  }
}
