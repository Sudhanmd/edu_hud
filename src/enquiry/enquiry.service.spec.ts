import { Test, TestingModule } from '@nestjs/testing';
import { EnquiryService } from './enquiry.service';
import { AnyBulkWriteOperation, Repository } from 'typeorm';
import { Enquiry_entity } from '../entity/enquiry.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EnquiryDto } from './enquiry.dot';
import { BadRequestException } from '@nestjs/common';

const mockEnquiryEntity = {
  id: 'ffc85d5a-3b08-4d3a-963d-8661e5a776fa',
  user: '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0',
  course: 'ffc85d5a-3b08-4d3a-963d-8661e5a776fa',
  subject: 'conditions',
  message: 'i want to know deep knowledge in to it',
  status: 'inprocesses',
  response: 'lsjdflie',
};

const mockservice = {
  findOne: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('EnquiryService', () => {
  let service: EnquiryService;
  let repository: Repository<Enquiry_entity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnquiryService,
        {
          provide: getRepositoryToken(Enquiry_entity),
          useValue: mockservice,
        },
      ],
    }).compile();

    service = module.get<EnquiryService>(EnquiryService);
    repository = module.get<Repository<Enquiry_entity>>(
      getRepositoryToken(Enquiry_entity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createEnquiry', () => {
    it('should create the new data', async () => {
      const CreateEnquiry: EnquiryDto = {
        subject: 'conditions',
        message: 'i want to know deep knowledge in to it',
        status: 'inprocesses',
        response: 'lsjdflie',
      };
      mockservice.save.mockResolvedValue(mockEnquiryEntity);
      await service.createEnquiry(CreateEnquiry);
      expect(mockservice.save).toHaveBeenCalledWith(CreateEnquiry);
    });

    it('should throw the unexpected error ', async () => {
      const createEnquiry = {
        subject: '34',
        message: 'i want to know deep knowledge in to it',
        status: 'inprocesses',
        response: 'lsjdflie',
      };
      mockservice.save.mockRejectedValue(createEnquiry);
      await expect(service.createEnquiry(createEnquiry)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getAllEnquiries', () => {
    it('should show all the enquiries', async () => {
      mockservice.find.mockResolvedValue([mockEnquiryEntity]);
      await service.getAllEnquiries();
      expect(mockservice.find).toHaveBeenCalled();
    });
  });
  describe('getEnquiryByEnquiryID', () => {
    it('successfully return the enquiry by the enquiry id', async () => {
      mockservice.findOne.mockResolvedValue(mockEnquiryEntity);
      await service.getEnquiryByEnquiryID(
        'fb70c2f5-5061-43b2-954f-23d52687d024',
      );
      expect(mockservice.findOne).toHaveBeenCalledWith({
        where: { id: 'fb70c2f5-5061-43b2-954f-23d52687d024' },
        relations: ['user', 'course'],
      });
    });
    it('should throw the unexpected error', async () => {
      mockservice.findOne.mockResolvedValue(null);
      await expect(
        service.getEnquiryByEnquiryID('3f24-4f0f-9fe2-f010e666c0c0'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getEnquriesByUserId', () => {
    it('should show the enquiry by the user Id', async () => {
      mockservice.find.mockResolvedValue(mockEnquiryEntity);
      await service.getEnquriesByUserId('fb70c2f5-5061-43b2-954f-23d52687d024');
      expect(mockservice.find).toHaveBeenCalledWith({
        where: { user: { id: 'fb70c2f5-5061-43b2-954f-23d52687d024' } },
        relations: ['user', 'course'],
      });
    });
    it('should throw the unexpected error', async () => {
      mockservice.find.mockResolvedValue(null);
      await expect(
        service.getEnquriesByUserId('fb70c2f5-5061-43b2-954f-23d52687d024'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getEnquriesCourseId', () => {
    it('should show the enquiry by the course Id', async () => {
      mockservice.find.mockResolvedValue(mockEnquiryEntity);
      await service.getEnquriesCourseId('fb70c2f5-5061-43b2-954f-23d52687d024');
      expect(mockservice.find).toHaveBeenCalledWith({
        where: { course: { id: 'fb70c2f5-5061-43b2-954f-23d52687d024' } },
        relations: ['user', 'course'],
      });
    });
    it('should throw the unexpected error', async () => {
      mockservice.find.mockResolvedValue(null);
      await expect(
        service.getEnquriesCourseId('fb70c2f5-5061-43b2-954f-23d52687d024'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateEnquiryByEnquiryID', () => {
    it('should successfully update a course by id ', async () => {
      mockservice.findOne.mockResolvedValue(mockEnquiryEntity);
      mockservice.update.mockResolvedValue({ affected: 1 });
      await service.updateEnquiryByEnquiryID(
        '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0',
        {
          status: 'open',
          response: 'lsjdflie',
        },
      );
      expect(mockservice.update).toHaveBeenCalledWith(
        '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0',
        { status: 'open', response: 'lsjdflie' },
      );
    });
    it('should throw error unexpected error', async () => {
      mockservice.findOne.mockResolvedValue(null);
      await expect(
        service.updateEnquiryByEnquiryID(
          '3cd11941-53bb-4764-a9ba-64fd99c94907',
          { status: 'open', response: 'lsjdflie' },
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteEnquiryById', () => {
    it('successfully delete a enquiry by id ', async () => {
      mockservice.delete.mockResolvedValue({ affected: 1 });
      await service.deleteEnquiryById('3cd11941-53bb-4764-a9ba-64fd99c94907');
      expect(mockservice.delete).toHaveBeenCalledWith(
        '3cd11941-53bb-4764-a9ba-64fd99c94907',
      );
    });
    it('should throw error unexpected error', async () => {
      mockservice.delete.mockResolvedValue({ affected: 0 });
      await expect(
        service.deleteEnquiryById('3cd11941-53bb-4764-a9ba64fd99c94907'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
