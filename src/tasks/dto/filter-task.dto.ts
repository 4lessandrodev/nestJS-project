import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task.model";

export class FilterTaskDto{
 @IsOptional()
 @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
 status: string;
 
 @IsOptional()
 @IsNotEmpty()
 search: string;
}