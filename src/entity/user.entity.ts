import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User_entity{
    @Column()
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name :string
    
    @Column()
    password: string

    @Column({type:'enum'})
    role: string

    @Column({unique:true})
    email:string

    @Column()
    mobileNumber : string

    @Column()
    image : string

}