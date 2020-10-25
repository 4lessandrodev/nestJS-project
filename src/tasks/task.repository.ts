import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";
import { v1 as uuid } from 'uuid';
import { FilterTaskDto } from "./dto/filter-task.dto";


@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

 async getTasks(filterTaskDto: FilterTaskDto): Promise<Task[]>{
  const { status, search } = filterTaskDto;
  const query = this.createQueryBuilder('task');
  if (status) {
   query.andWhere('task.status = :status', { status })
  }
  if (search) {
   query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search:`%${search}%` })
  }
  return await query.getMany();
}

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