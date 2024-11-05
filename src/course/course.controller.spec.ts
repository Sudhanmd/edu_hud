import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

const mockservice = {
  createCourse: jest.fn(),
  getAllCourse: jest.fn(),
  getCourseById: jest.fn(),
  getCourseByUserId: jest.fn(),
  updateCourseById: jest.fn(),
  deleteCourse: jest.fn(),
};

describe('CourseController', () => {
  let controller: CourseController;
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [{ provide: CourseService, useValue: mockservice }],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createcourse', () => {
    it('should create the new data', async () => {
      const CreateCourse = {
        title: 'Python Full Stack',
        description: 'flfdlkf',
        startDate: '2024-10-01',
        endDate: '2025-01-30',
        user: '96c52131-398a-42ae-886e-5656b0be7f03',
        category: 'programming language',
        level: 'BEGINNER',
      } as any;
      await controller.createCourse(CreateCourse);
      expect(service.createCourse).toHaveBeenCalledWith(CreateCourse);
    });
  });

  describe('getAllCourse', () => {
    it('should get all the course data', async () => {
      // const getallcourse = {};
      await controller.getAllCourse();
      expect(service.getAllCourse).toHaveBeenCalledWith();
    });
  });

  describe('getCourseById', () => {
    it('should get all the course by the course-Id', async () => {
      const getcoursebyid = '24393a6b-bda4-4149-b3e7-864e4f36bcd0';
      await controller.getCourseById(getcoursebyid);
      expect(service.getCourseById).toHaveBeenCalledWith(getcoursebyid);
    });
  });

  describe('getCourseByUserId', () => {
    it('should get course by user-Id', async () => {
      const getcoursebyuserid = '799ef181-f5f8-4821-b6ee-93f0a659c2b0';
      await controller.getCourseByUserId(getcoursebyuserid);
      expect(service.getCourseByUserId).toHaveBeenCalledWith(getcoursebyuserid);
    });
  });

  describe('updateCourseById', () => {
    it('should update the course by the course-Id', async () => {
      const updateId = '24393a6b-bda4-4149-b3e7-864e4f36bcd0';
      const updateCourse = {
        title: 'C Full Stack',
        description: 'flfdjgjhlkf',
        startDate: new Date('2024-12-25'),
        endDate: new Date('2025-10-30'),
        category: 'programming language',
      };
      await controller.updateCourseById(updateId, updateCourse);
      expect(service.updateCourseById).toHaveBeenCalledWith(
        updateId,
        updateCourse,
      );
    });
  });

  describe('deleteCourse', () => {
    it('should delete the course by the course-Id', async () => {
      const deletecourse = '24393a6b-bda4-4149-b3e7-864e4f36bcd0';
      await controller.deleteCourse(deletecourse);
      expect(service.deleteCourse).toHaveBeenCalledWith(deletecourse);
    });
  });
});
