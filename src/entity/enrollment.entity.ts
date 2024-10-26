import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User_entity } from "./user.entity";
import { Course_entity } from "./course.entity";

@Entity()
export class Enrollment_entity{

    @Column()
    @PrimaryGeneratedColumn('increment')
    id :string;

    @ManyToOne(()=> User_entity, user => user.id, {onDelete:"CASCADE"})
    @JoinColumn({name:'user'})
    user : User_entity[];

    @ManyToOne(()=> Course_entity, course => course.id , {onDelete:"CASCADE"})
    @JoinColumn ({name:'course'})
    course : Course_entity[];

    @CreateDateColumn(
    {type:'timestamp without time zone'})
    CreateAt : Date;

    @Column(
    {type:'enum',
    enum: ['ACCEPTED','REJECTED'],
    default:'PENDING' })
    status : string
}

