import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course_entity } from "./course.entity";


@Entity()
export class Material_Entity{
  
    @PrimaryGeneratedColumn('uuid')
    id : string

    @ManyToOne(()=> Course_entity, course => course.materialRefEntity , {onDelete:"CASCADE"})
    @JoinColumn ({name:'course'})
    course : Course_entity[];

    @Column()
    title : string;

    @Column()
    description : string;

    @Column()
    url :string

    @CreateDateColumn({type:'timestamp without time zone'})
    date : Date;

    @Column()
    contentType : string;
}