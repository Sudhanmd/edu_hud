import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './course/course.module';
import { EnrollementModule } from './enrollement/enrollement.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root@123',
      database: 'edu_hub',
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
  }),
  UserModule,
  CourseModule,
  EnrollementModule,
], controllers: [],
  providers: [],
})
export class AppModule {}
