import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
 constructor(private taskService: TasksService) { }
 
 @Get()
 getAllTasks(@Query(ValidationPipe) filterTaskDto: FilterTaskDto): Task[] {
  if (Object.keys(filterTaskDto).length) {
   return this.taskService.getTasksWithFilter(filterTaskDto);
  }
  return this.taskService.getTasks();
 }
 
 @Get('/:id')
 getTaskById(@Param('id') id:string): Task{
  return this.taskService.getTaskById(id);
 }
 
 @Delete('/:id')
 deleteTaskById(@Param('id') id: string): Task{
  return this.taskService.deleteTaskById(id);
 }
 
 @Post()
 @UsePipes(ValidationPipe)
 createTask(@Body() createTaskDto: CreateTaskDto): Task {
  return this.taskService.createTask(createTaskDto);
 }
 
 @Patch('/:id/status')
 updateTaskStatus(
  @Param('id') id:string,
  @Body('status', TaskStatusValidationPipe) status:TaskStatus
  ): Task{
   return this.taskService.updateTastStatus(id, status);
  }
 }
 