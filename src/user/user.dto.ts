import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UserDto{

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password :string;

  @IsNotEmpty()
  @IsEnum(['EDUCATOR', 'STUDENT'])
  role:'EDUCATOR'|'STUDENT';

  @IsNotEmpty()
  @IsEmail()
  email :string;

  @IsNotEmpty()
  @IsPhoneNumber()
  mobileNumber :string;

  @IsNotEmpty()
  @IsString()
  image : string;
}

export class Update_user{
  @IsOptional()
  @IsString()
  name ?: string;

  @IsOptional()
  @IsPhoneNumber()
  mobileNumber ?:string;

  @IsOptional()
  @IsString()
  image ?: string;
}


