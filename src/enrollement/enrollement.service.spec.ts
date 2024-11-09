import { Test, TestingModule } from '@nestjs/testing';
import { EnrollementService } from './enrollement.service';
import { Repository } from 'typeorm';
import { Enrollment_entity } from '../entity/enrollment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { mock } from 'node:test';

const mockEnrollEntity = {
  id: '8c89d89a-5167-4072-a70c-3fa006efc242',
  CreateAt: '2024-10-30T05:23:35.204Z',
  status: 'REJECTED',
};
const mockservice = {
  findOne: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('EnrollementService', () => {
  let service: EnrollementService;
  let repository: Repository<Enrollment_entity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnrollementService,
        {
          provide: getRepositoryToken(Enrollment_entity),
          useValue: mockservice,
        },
      ],
    }).compile();

    service = module.get<EnrollementService>(EnrollementService);
    repository = module.get<Repository<Enrollment_entity>>(
      getRepositoryToken(Enrollment_entity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createEnrollement', () => {
    it('should create the new data', async () => {
      const createEnrollement = {
        userId: '799ef181-f5f8-4821-b6ee-93f0a659c2b0',
        courseId: '24393a6b-bda4-4149-b3e7-864e4f36bcd0',
        status: 'REJECTED',
      };
      mockservice.save.mockResolvedValue(mockEnrollEntity);
      await service.createEnrollement(createEnrollement);
      expect(mockservice.save).toHaveBeenCalledWith(createEnrollement);
    });
    it('should throw unexpected error', async () => {
      const createEnrollement = {
        userId: '799ef181-f5f8-4821-b6ee-93f0a659c2b0',
        courseId: '24393a6b-bda4-4149-b3e7-864e4f36bcd0',
        status: 'REJECTED',
      };
      mockservice.save.mockRejectedValue(createEnrollement);
      await expect(
        service.createEnrollement(createEnrollement),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getAllEnrollment', () => {
    it('should show all the enrollement', async () => {
      mockservice.find.mockResolvedValue([mockEnrollEntity]);
      await service.getAll();
      expect(mockservice.find).toHaveBeenCalled();
    });
  });

  describe('getEnrollCourseByUserId', () => {
    it('should get the erollments by the user id', async () => {
      const userId = '96c52131-398a-42ae-886e-5656b0be7f03';
      mockservice.find.mockResolvedValue(mockEnrollEntity);
      await service.getEnrollCourseByUserId(userId);
      expect(mockservice.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        relations: ['course'],
      });
    });
    it('should throw the unexpected error', async () => {
      mockservice.find.mockResolvedValue(null);
      await expect(
        service.getEnrollCourseByUserId('53c37ffc-3f24-4f0f-9fe2-f010e666c0c0'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getEnrollmentById', () => {
    it('should show the enrollment by the enrollement id', async () => {
      const userId = '96c52131-398a-42ae-886e-5656b0be7f03';
      mockservice.find.mockResolvedValue(mockEnrollEntity);
      await service.getEnrollmentById(userId);
      expect(mockservice.find).toHaveBeenCalledWith({
        where: { id: '96c52131-398a-42ae-886e-5656b0be7f03' },
        relations: ['user', 'course'],
      });
    });
    it('should throw error unexpected error', async () => {
      mockservice.find.mockResolvedValue(null);
      await expect(
        service.getEnrollmentById('3f24-4f0f-9fe2-f010e666c0c0'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateEnrollmentById', () => {
    it('should update the enrollment by the enrollment id', async () => {
      mockservice.find.mockResolvedValue(mockEnrollEntity);
      mockservice.update.mockResolvedValue({ affected: 1 });
      await service.updateEnrollmentById(
        '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0',
        { status: 'REJECTED' },
      );
      expect(mockservice.update).toHaveBeenCalledWith(
        '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0',
        { status: 'REJECTED' },
      );
    });
    it('should throw error unexpected error', async () => {
      mockservice.find.mockResolvedValue(null);
      await expect(
        service.updateEnrollmentById('3cd11941-53bb-4764-a9ba-64fd99c94907', {
          status: 'REJECTED',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteEnrollmentById', () => {
    it('successfully delete a course by id ', async () => {
      mockservice.delete.mockResolvedValue({ affected: 1 });
      await service.deleteEnrollmentById(
        '3cd11941-53bb-4764-a9ba-64fd99c94907',
      );
      expect(mockservice.delete).toHaveBeenCalledWith(
        '3cd11941-53bb-4764-a9ba-64fd99c94907',
      );
    });
    it('should throw error unexpected error', async () => {
      mockservice.delete.mockResolvedValue({ affected: 0 });
      await expect(
        service.deleteEnrollmentById('3cd11941-53bb-4764-a9ba64fd99c94907'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
