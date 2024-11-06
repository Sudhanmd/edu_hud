import { Test, TestingModule } from '@nestjs/testing';
import { EnquiryController } from './enquiry.controller';
import { EnquiryService } from './enquiry.service';

const mockservice = {
  createEnquiry: jest.fn(),
  getAllEnquiries: jest.fn(),
  getEnquiryByEnquiryID: jest.fn(),
  getEnquriesByUserId: jest.fn(),
  getEnquriesCourseId: jest.fn(),
  updateEnquiryByEnquiryID: jest.fn(),
  deleteEnquiryById: jest.fn(),
};

describe('EnquiryController', () => {
  let controller: EnquiryController;
  let service: EnquiryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnquiryController],
      providers: [{ provide: EnquiryService, useValue: mockservice }],
    }).compile();

    controller = module.get<EnquiryController>(EnquiryController);
    service = module.get<EnquiryService>(EnquiryService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createEnquiry', () => {
    it('should create the  new data', async () => {
      const createEnquiry = {
        user: '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0',
        course: 'ffc85d5a-3b08-4d3a-963d-8661e5a776fa',
        subject: 'conditions',
        message: 'i want to know deep knowledge in to it',
        status: 'inprocesses',
        response: 'lsjdflie',
      };
      await controller.createEnquiry(createEnquiry);
      expect(service.createEnquiry).toHaveBeenCalledWith(createEnquiry);
    });
  });

  describe('getAllEnquiries', () => {
    it('should get all the Enquiry data', async () => {
      await controller.getAllEnquiries();
      expect(service.getAllEnquiries).toHaveBeenCalledWith();
    });
  });

  describe('getEnquiryByEnquiryID', () => {
    it('should get the enquiry by using the enquiry-Id', async () => {
      const GetEnquiryByEnquiryID = ' 3cd11941-53bb-4764-a9ba-64fd99c94907';
      await controller.getEnquiryByEnquiryID({ id: GetEnquiryByEnquiryID });
      expect(service.getEnquiryByEnquiryID).toHaveBeenCalledWith(
        GetEnquiryByEnquiryID,
      );
    });
  });

  describe('getEnquriesUserId', () => {
    it('should get the enquiry by using the user-Id', async () => {
      const GetEnquiryByUserId = '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0';
      await controller.getEnquriesByUserId({ id: GetEnquiryByUserId });
      expect(service.getEnquriesByUserId).toHaveBeenCalledWith(
        GetEnquiryByUserId,
      );
    });
  });

  describe('getEnquiryByCourseId', () => {
    it('should get the enquiry by using the course-Id', async () => {
      const GetEnquiryByCourseId = 'ffc85d5a-3b08-4d3a-963d-8661e5a776fa';
      await controller.getEnquriesCourseId(GetEnquiryByCourseId);
      expect(service.getEnquriesCourseId).toHaveBeenCalledWith(
        GetEnquiryByCourseId,
      );
    });
  });

  describe('updateEnquiryByEnquiryID', () => {
    it('should update the enquiry by using the enquiry-Id', async () => {
      const id = '3cd11941-53bb-4764-a9ba-64fd99c94907';
      const updateData = {
        subject: 'conditdfions',
        message: 'i want to knofsdfsdfffsfsdfw deep knowledge in to it',
        status: 'close',
        response: 'lsfsdfdfsjdflie',
      };
      await controller.updateEnquiryByEnquiryID(id, updateData);
      expect(service.updateEnquiryByEnquiryID).toHaveBeenCalledWith(
        id,
        updateData,
      );
    });

    describe('deleteEnquiryById', () => {
      it('should delete the enrollement by the enrollementID', async () => {
        var DeleteEnquiryById = '8c89d89a-5167-4072-a70c-3fa006efc242';
        await controller.deleteEnquiryById(DeleteEnquiryById);
        expect(service.deleteEnquiryById).toHaveBeenCalledWith(DeleteEnquiryById)});
  });
});
});
