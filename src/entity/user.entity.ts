import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course_entity } from './course.entity';
import { Enrollment_entity } from './enrollment.entity';
import { Enquiry_entity } from './enquiry.entity';

@Entity()
export class User_entity {
  @Column()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['EDUCATOR', 'STUDENT'],
  })
  role: string;

  @Column({ unique: true })
  email: string;

  @Column()
  mobileNumber: string;

  @Column()
  image: string;

  @OneToMany(() => Course_entity, (courseEntity) => courseEntity.user)
  courseRefUser: Course_entity[];

  @OneToMany(
    () => Enrollment_entity,
    (enrollmentEntities) => enrollmentEntities.user,
  )
  enrollmentRefUser: Enrollment_entity[];

  @OneToMany(
    () => Enquiry_entity,
    (enrollmententities) => enrollmententities.user,
  )
  enquiryRefUser: Enquiry_entity[];
}
