import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";
import { v1 as uuid } from 'uuid';


@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
 async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
  const { title, description } = createTaskDto;
  const task = new Task();
  task.status = TaskStatus.OPEN;
  task.description = description;
  task.title = title
  task.id = uuid()
  await task.save();
  return task;
 }
 
}