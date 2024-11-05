import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class EnrollementDto {
  @IsNotEmpty()
  @IsEnum(['ACCEPTED', 'REJECTED', 'PENDING'], {
    message: 'this fied should be, ACCEPTED | REJECTED | PENDING',
  })
  status: string;
}

export class UpdateEnrollDto {
  @IsOptional()
  @IsEnum(['ACCEPTED', 'REJECTED', 'PENDING'], {
    message: 'this fied should be, ACCEPTED | REJECTED | PENDING',
  })
  status: string;
}
