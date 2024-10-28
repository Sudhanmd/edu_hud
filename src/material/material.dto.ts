import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class MaterialDto{
    @IsOptional()
    @IsString()
    title ?:string;
 
    @IsOptional()
    @IsString()
    description ?: string;

    @IsOptional()
    @IsString()
    url :string;

    @IsOptional()
    @IsString()
    contentType : string;
}


