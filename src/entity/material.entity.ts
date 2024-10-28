import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course_entity } from "./course.entity";
import { Url } from "url";

@Entity()
export class Material_Entity{
    @Column()
    @PrimaryGeneratedColumn('uuid')
    id : string

    @ManyToOne(()=> Course_entity, (course)=>course.id)
    course : Course_entity[];

    @Column()
    title : string;

    @Column()
    description : string;

    @Column()
    url ?: Url

    @CreateDateColumn(
        {type:'timestamp without time zone'})
        date : Date;

    @Column()
    contentType : string;
}