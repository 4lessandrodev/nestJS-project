import { BaseEntity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

export class Task extends BaseEntity{
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 title: string;

 @Column()
 description: string;
 
 @Column()
 status: TaskStatus
}