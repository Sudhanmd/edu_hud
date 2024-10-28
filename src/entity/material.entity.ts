import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course_entity } from "./course.entity";
import { Url } from "url";

@Entity()
export class Material_Entity{
  
    @PrimaryGeneratedColumn('uuid')
    id : string

    @ManyToOne(()=> Course_entity, course => course.id , {onDelete:"CASCADE"})
    @JoinColumn ({name:'course'})
    course : Course_entity[];

    @Column()
    title : string;

    @Column()
    description : string;

    @Column()
    url :string

    @CreateDateColumn()
    date : Date;

    @Column()
    contentType : string;
}