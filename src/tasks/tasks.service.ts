import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskStatus } from './task-status.enum';
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
 
 async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
  return await this.taskRepository.createTask(createTaskDto);
 }

 async deleteTaskById(id: string): Promise<void>{
  const result = await this.taskRepository.delete(id);
  if (result.affected === 0) {
   throw new NotFoundException(`Task id ${id} not found`);
  }
 }

 // updateTastStatus(id:string, status:TaskStatus): Task{
 //  const task = this.getTaskById(id)
 //  task.status = status;
 //  return task;
 // }
 
}
