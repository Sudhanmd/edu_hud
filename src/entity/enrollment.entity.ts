import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User_entity } from "./user.entity";
import { Course_entity } from "./course.entity";

@Entity()
export class Enrollment_entity{

    @Column()
    @PrimaryGeneratedColumn('uuid')
    id :string;

    @ManyToOne(()=> User_entity, user => user.enrollmentRefUser, {onDelete:"CASCADE"})
    @JoinColumn({name:'user'})
    user : User_entity[];

    @ManyToOne(()=> Course_entity, course => course.enrollmentRefCourse, {onDelete:"CASCADE"})
    @JoinColumn ({name:'course'})
    course : Course_entity[];

    @CreateDateColumn(
    {type:'timestamp without time zone'})
    CreateAt : Date;

    @Column(
    {type:'enum',
    enum: ['ACCEPTED','REJECTED', 'PENDING']
    , default: 'PENDING'})
    status : 'ACCEPTED' | 'REJECTED' |'PENDING'  
    }
