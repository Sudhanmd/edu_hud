import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { User_entity } from './user.entity';

@Entity()
export class Course_entity{

    @Column()
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    title :string;

    @Column()
    description : string;

    @Column()
    startDate : Date;

    @Column()
    endDate : Date;

    @ManyToOne(() => User_entity,(user)=>user.id ,{onDelete:'CASCADE'}) 
    @JoinColumn({name:'user'})
    user: User_entity[];

    @Column()
    category : string

    @Column({
        type :'enum',
        enum : ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] })
    level:string;


    @OneToMany(()=> Course_entity, (course)=>course.id)
    course : Course_entity[];
}
