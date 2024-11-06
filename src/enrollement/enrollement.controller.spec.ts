import { Test, TestingModule } from '@nestjs/testing';
import { EnrollementController } from './enrollement.controller';
import { EnrollementService } from './enrollement.service';

const mockEnrollment = {
  createEnrollement: jest.fn(),
  getEnrollCourseByUserId: jest.fn(),
  getAll: jest.fn(),
  getEnrollmentById: jest.fn(),
  updateEnrollmentById: jest.fn(),
  deleteEnrollmentById: jest.fn(),
};

describe('EnrollementController', () => {
  let controller: EnrollementController;
  let service: EnrollementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnrollementController],
      providers: [
        {
          provide: EnrollementService,
          useValue: mockEnrollment,
        },
      ],
    }).compile();

    controller = module.get<EnrollementController>(EnrollementController);
    service = module.get<EnrollementService>(EnrollementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createEnrollement', () => {
    it('should create the new data', async () => {
      const CreateEnrollement = {
        userId: '799ef181-f5f8-4821-b6ee-93f0a659c2b0',
        courseId: '24393a6b-bda4-4149-b3e7-864e4f36bcd0',
        status: 'REJECTED',
      };
      await controller.createEnrollement(CreateEnrollement);
      expect(service.createEnrollement).toHaveBeenCalledWith(CreateEnrollement);
    });
  });

  describe('getEnrollCourseByUserId', () => {
    it('should get the enrollment by using the user-Id', async () => {
      const enrollByUserId = ' 96c52131-398a-42ae-886e-5656b0be7f03';
      await controller.getEnrollCourseByUserId(enrollByUserId);
      expect(service.getEnrollCourseByUserId).toHaveBeenCalledWith(
        enrollByUserId,
      );
    });
  });

  describe('getAllEnrollment', () => {
    it('should get all the Enrollment data', async () => {
      await controller.getAll();
      expect(service.getAll).toHaveBeenCalledWith();
    });
  });

  describe('getEnrollmentById', () => {
    it('should get the enrollment by the enrollment-Id', async () => {
      const GetEnrollById = '8c89d89a-5167-4072-a70c-3fa006efc242';
      await controller.getEnrollmentById(GetEnrollById);
      expect(service.getEnrollmentById).toHaveBeenCalledWith(GetEnrollById);
    });
  });

  describe('updateEnrollmentById', () => {
    it('should update the enrollment by their enrollment-Id', async () => {
      let updateId = '8c89d89a-5167-4072-a70c-3fa006efc242';
      const updateEnroll = {
        status: 'REJECTED',
      };
      await controller.updateEnrollmentById(updateId,updateEnroll);
      expect(service.updateEnrollmentById).toHaveBeenCalledWith(
        updateId,
        updateEnroll,
      );
    });
  });

  describe('deleteEnrollmentById', () => {
    it('should delete the enrollement by the enrollementID', async () => {
      var DeleteEnrollmentById = '8c89d89a-5167-4072-a70c-3fa006efc242';
      await controller.deleteEnrollmentById(DeleteEnrollmentById);
      expect(service.deleteEnrollmentById).toHaveBeenCalledWith(
        DeleteEnrollmentById,
      );
    });
  });
});
