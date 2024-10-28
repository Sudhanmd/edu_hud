import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { User_entity } from './user.entity';
import { Enrollment_entity } from './enrollment.entity';
import { Enquiry_entity } from './enquiry.entity';
import { Material_Entity } from './material.entity';

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

    @ManyToOne(() => User_entity,(user)=>user.courseRefUser,{onDelete:'CASCADE'}) 
    @JoinColumn({name:'user'})
    user: User_entity[];

    @Column()
    category : string;

    @Column({
        type :'enum',
        enum : ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] })
    level:string;

    // @OneToMany(() => Enquiry_entity,(enrollmententities) => enrollmententities.user)
    // enquiryRefUser : Enquiry_entity[];

    @OneToMany(()=> Enrollment_entity, (enrollmententity)=>enrollmententity.course)
    enrollmentRefCourse : Enrollment_entity[];

    @OneToMany(()=> Enquiry_entity, (enquiryenity)=>enquiryenity.course)
    enquiryRefCourse : Enquiry_entity[];

    @OneToMany(()=> Material_Entity, (materialEntity)=>materialEntity.course)
    materialRefEntity : Enrollment_entity[];


}

export class updateCourseDto{

    @Column()
    title :string;

    @Column()
    description : string;

    @Column()
    startDate : Date;

    @Column()
    endDate : Date;

    @Column()
    category : string;
}