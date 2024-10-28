import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User_entity } from "./user.entity";
import { Course_entity } from "./course.entity";


@Entity()
export class Enquiry_entity{

    @Column()
    @PrimaryGeneratedColumn('uuid')
    id : string

    @ManyToOne(() => User_entity,(user)=>user.enquiryRefUser ,{onDelete:'CASCADE'}) 
    @JoinColumn({name:'user'})
    user: User_entity[];

    @ManyToOne(()=> Course_entity, course => course.enquiryRefCourse, {onDelete:"CASCADE"})
    @JoinColumn ({name:'course'})
    course : Course_entity[];

    @Column()
    subject :string

    @Column()
    message : string

    @CreateDateColumn(
    {type:'timestamp without time zone'})
    date : Date;

    @Column( {type:'enum',
        enum:['open' , 'close', 'inprocesses'] })
    status : string

    @Column()
    response ?:string

}