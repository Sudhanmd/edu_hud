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

    describe('getAllEnquiries',()=>{
      it('should show all the enquiries',async()=>{
        mockservice.find.mockResolvedValue([mockEnquiryEntity]);
        await service.getAllEnquiries();
        expect(mockservice.find).toHaveBeenCalled();
      })
    })
  });
});
