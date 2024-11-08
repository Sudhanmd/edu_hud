import { Test, TestingModule } from '@nestjs/testing';
import { EnquiryService } from './enquiry.service';
import { Repository } from 'typeorm';
import { Enquiry_entity } from 'src/entity/enquiry.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

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
});
