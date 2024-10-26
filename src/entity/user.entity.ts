import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course_entity } from "./course.entity";

@Entity()
export class User_entity{
    @Column()
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name :string
    
    @Column()
    password: string

    @Column({
        type:'enum',
        enum : ['EDUCATOR', 'STUDENT'] })
    role: string

    @Column({unique:true})
    email:string

    @Column()
    mobileNumber : string

    @Column()
    image : string
    
    @OneToMany(() => User_entity, user=>(user.id))
    user :User_entity
}