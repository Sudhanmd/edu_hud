import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class MaterialDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsNotEmpty()
  @IsString()
  contentType: string;
}

export class UPdateMaterialDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  contentType?: string;
}
