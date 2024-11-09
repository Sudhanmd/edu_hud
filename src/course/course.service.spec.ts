import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { Repository } from 'typeorm';
import { Course_entity } from '../entity/course.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CourseDto } from './course.dto';
import { BadRequestException } from '@nestjs/common';

const mockCourseEntity = {
  id: 'ffc85d5a-3b08-4d3a-963d-8661e5a776fa',
  title: 'Java Full Stack',
  description: 'flfdlkf',
  startDate: '2024-10-29T18:30:00.000Z',
  endDate: '2024-01-29T18:30:00.000Z',
  category: 'programming language',
  level: 'BEGINNER',
  user: { id: '96c52131-398a-42ae-886e-5656b0be7f03', name: 'John Doe' },
};

const mockservice = {
  findOne: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
describe('CourseService', () => {
  let service: CourseService;
  let repository: Repository<Course_entity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: getRepositoryToken(Course_entity),
          useValue: mockservice,
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    repository = module.get<Repository<Course_entity>>(
      getRepositoryToken(Course_entity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createcourse', () => {
    it('should create a course successfully ', async () => {
      const CreateCourse: CourseDto = {
        title: 'Python Full Stack',
        description: 'flfdlkf',
        startDate: new Date('2024-10-01'),
        endDate: new Date('2025-01-30'),
        category: 'programming language',
        level: 'BEGINNER',
      };
      mockservice.save.mockResolvedValue(mockCourseEntity);
      await service.createCourse(CreateCourse);
      expect(mockservice.save).toHaveBeenCalledWith(CreateCourse);
    });
    it('should throw unexpected error', async () => {
      const CreateCourse: CourseDto = {
        title: 'Python Full Stack',
        description: 'flfdlkf',
        startDate: new Date('2024-10-01'),
        endDate: new Date('2025-01-30'),
        category: 'programming language',
        level: 'BEGINNER',
      };
      mockservice.save.mockRejectedValue(CreateCourse);
      await expect(service.createCourse(CreateCourse)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getAllCourse', () => {
    it('should show all the course', async () => {
      mockservice.find.mockResolvedValue([mockCourseEntity]);
      await service.getAllCourse();
      expect(mockservice.find).toHaveBeenCalled();
    });
  });

  describe('getCourseById', () => {
    it('should show the course id ', async () => {
      mockservice.find.mockResolvedValue(mockCourseEntity);
      await service.getCourseById('53c37ffc-3f24-4f0f-9fe2-f010e666c0c0');
      expect(mockservice.find).toHaveBeenCalledWith({
        where: { id: '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0' },
      });
    });
    it('should throw error unexpected error', async () => {
      mockservice.find.mockResolvedValue(null);
      await expect(
        service.getCourseById('3f24-4f0f-9fe2-f010e666c0c0'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getCourseByUserId', () => {
    it('successfully returns the course by the user id', async () => {
      const userId = '96c52131-398a-42ae-886e-5656b0be7f03';
      mockservice.find.mockResolvedValue(mockCourseEntity);
      await service.getCourseByUserId(userId);
      expect(mockservice.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        relations: ['user'],
      });
    });
    it('should throw the unexpected error', async () => {
      mockservice.find.mockResolvedValue(null);
      await expect(
        service.getCourseByUserId('53c37ffc-3f24-4f0f-9fe2-f010e666c0c0'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateCourseById', () => {
    it('should successfully update a course by id ', async () => {
      mockservice.find.mockResolvedValue(mockCourseEntity);
      mockservice.update.mockResolvedValue({ affected: 1 });
      await service.updateCourseById('53c37ffc-3f24-4f0f-9fe2-f010e666c0c0', {
        title: 'Python Full Stack',
        description: 'flfdlkf',
      });
      expect(mockservice.update).toHaveBeenCalledWith(
        '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0',
        { title: 'Python Full Stack', description: 'flfdlkf' },
      );
    });

    it('should throw error unexpected error', async () => {
      mockservice.find.mockResolvedValue(null);
      await expect(
        service.updateCourseById('3cd11941-53bb-4764-a9ba-64fd99c94907', {
          title: 'Python Full Stack',
          description: 'flfdlkf',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteCourse', () => {
    it('successfully delete a course by id ', async () => {
      mockservice.delete.mockResolvedValue({ affected: 1 });
      await service.deleteCourse('3cd11941-53bb-4764-a9ba-64fd99c94907');
      expect(mockservice.delete).toHaveBeenCalledWith(
        '3cd11941-53bb-4764-a9ba-64fd99c94907',
      );
    });
    it('should throw error unexpected error', async () => {
      mockservice.delete.mockResolvedValue({ affected: 0 });
      await expect(
        service.deleteCourse('3cd11941-53bb-4764-a9ba64fd99c94907'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
