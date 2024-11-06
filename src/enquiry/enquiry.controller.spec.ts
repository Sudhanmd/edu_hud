import { Test, TestingModule } from '@nestjs/testing';
import { EnquiryController } from './enquiry.controller';
import { EnquiryService } from './enquiry.service';

const mockservice = {
  createEnquiry: jest.fn(),
  getAllEnquiries: jest.fn(),
  getEnquriesUserId: jest.fn(),
  updateAllEnquriesById: jest.fn(),
  deleteEnquiryById: jest.fn(),
};

describe('EnquiryController', () => {
  let controller: EnquiryController;
  let service: EnquiryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnquiryController],
      providers: [{provide:EnquiryService, useValue:mockservice}],
    }).compile();

    controller = module.get<EnquiryController>(EnquiryController);
    service = module.get<EnquiryService>(EnquiryService);
  });

  afterEach(async()=>{
    clear
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createEnquiry',()=> {it('should create the  new data', async() => {
    const createEnquiry = {
      
    }
    await 
  })} )
});
