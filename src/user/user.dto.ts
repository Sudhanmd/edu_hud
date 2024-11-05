import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(['EDUCATOR', 'STUDENT'], {
    message: 'role must be EDUCATOR , STUDENT',
  })
  role: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  mobileNumber: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}

export class UpdateUser {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsPhoneNumber()
  mobileNumber?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
