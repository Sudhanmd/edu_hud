import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CourseDto{
    @IsNotEmpty()
    @IsString()
    title :string;

    @IsNotEmpty()
    @IsString()
    description : string;

    @IsNotEmpty()
    @IsDateString()
    startDate : Date;

    @IsNotEmpty()
     @IsDateString()
    endDate : Date;

    @IsNotEmpty()
    @IsString()
    category : string;
}

export class updateCourseDto{

   @IsOptional()
   @IsString()
   title ?:string;

   @IsOptional()
   @IsString()
   description ?: string;

    @IsDateString()
    @IsOptional()
    startDate ?: Date;

    @IsDateString()
    @IsOptional()
    endDate ?: Date;

   @IsOptional()
   @IsString()
   category ?: string;

}