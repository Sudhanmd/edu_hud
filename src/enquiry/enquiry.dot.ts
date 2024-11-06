import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class EnquiryDto {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsEnum({
    type: 'enum',
    enum: ['open', 'close', 'inprocesses'],
    message: 'this fied should be,open | close | inprocesses',
  })
  status: string;

  @IsNotEmpty()
  @IsString()
  response?: string;
}

export class UpdateEnquiryDto {
  @IsOptional()
  @IsEnum(['open', 'close', 'inprocesses'], {
    message: 'this fied should be,open | close | inprocesses',
  })
  status: string;

  @IsOptional()
  @IsString()
  response?: string;
}

export class FilterDto {
  @IsNotEmpty()
  @IsString()
  id: string;

}
