import {IsEnum, IsNotEmpty } from "class-validator";

export class enrollementDto{
    @IsNotEmpty()
    @IsEnum(['ACCEPTED','REJECTED', 'PENDING'],{message:'this fied should be, ACCEPTED | REJECTED | PENDING'})
    status : 'ACCEPTED' | 'REJECTED' |'PENDING' = 'PENDING'  
}
