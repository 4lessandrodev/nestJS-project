import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
 constructor(
  @InjectRepository(TaskRepository)
  private taskRepository: TaskRepository
 ){}
 
 // getTasks():Task[] {
 //  return this.tasks
 // }

 // getTasksWithFilter(filterTaskDto: FilterTaskDto): Task[]{
 //  const {status, search } = filterTaskDto;
 //  let tasks = this.getTasks();
 //  if (status) {
 //   tasks = tasks.filter(task => task.status === status);
 //  }

 //  if (search) {
 //   tasks = tasks.filter(task => task.description.includes(search) || task.title.includes(search))
 //  }

 //  return tasks;
 // }

 async getTaskById(id: string): Promise<Task>{
  const foundTask = this.taskRepository.findOne(id);
  if (!foundTask) {
   throw new NotFoundException(`Task id ${id} not found`);
  }
  return foundTask;
 }
 
 // createTask(createTaskDto: CreateTaskDto): Task {
 //  const { title, description } = createTaskDto;
 //  const task: Task = {
 //   id: uuid(),
 //   title,
 //   description,
 //   status:TaskStatus.OPEN
 //  }
 //  this.tasks.push(task);
 //  return task;
 // }

 // deleteTaskById(id: string): Task{
 //  const foundTask = this.getTaskById(id);
 //  this.tasks = this.tasks.filter(task => task.id !== foundTask.id)
 //  return foundTask;
 // }

 // updateTastStatus(id:string, status:TaskStatus): Task{
 //  const task = this.getTaskById(id)
 //  task.status = status;
 //  return task;
 // }
 
}
