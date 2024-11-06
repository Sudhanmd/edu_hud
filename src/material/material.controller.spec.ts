import { Test, TestingModule } from '@nestjs/testing';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';

const mockMaterial = {
  createMaterial: jest.fn(),
  getAllMaterial: jest.fn(),
  getMaterialById: jest.fn(),
  getByCourseId: jest.fn(),
  updateMaterialById: jest.fn(),
  deleteMaterialById: jest.fn(),
};

describe('MaterialController', () => {
  let controller: MaterialController;
  let service: MaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialController],
      providers: [{ provide: MaterialService, useValue: mockMaterial }],
    }).compile();

    controller = module.get<MaterialController>(MaterialController);
    service = module.get<MaterialService>(MaterialService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createMaterial', () => {
    it('should create the new data', async () => {
      const CreateMaterial = {
        title: 'python Full Stack',
        description: 'ldjf',
        url: 'httpt//www.python.info',
        contentType: 'leacture slides',
        course: '24393a6b-bda4-4149-b3e7-864e4f36bcd0',
      } as any;
      await controller.createMaterial(CreateMaterial);
      expect(service.createMaterial).toHaveBeenCalledWith(CreateMaterial);
    });
  });

  describe('getAllMaterial', () => {
    it('should get all the material data', async () => {
      await controller.getAllMaterial();
      expect(service.getAllMaterial).toHaveBeenCalledWith();
    });
  });

  describe('getMaterialById', () => {
    it('should get all the material by the material-Id', async () => {
      const getmaterialbyid = '24393a6b-bda4-4149-b3e7-864e4f36bcd0';
      await controller.getMaterialById(getmaterialbyid);
      expect(service.getMaterialById).toHaveBeenCalledWith(getmaterialbyid);
    });
  });

  describe('getByCourseId', () => {
    it('should get material by material-Id', async () => {
      const getbycourseid = '799ef181-f5f8-4821-b6ee-93f0a659c2b0';
      await controller.getByCourseId(getbycourseid);
      expect(service.getByCourseId).toHaveBeenCalledWith(getbycourseid);
    });
  });

  describe('updateMaterialById', () => {
    it('should update the material by the material-Id', async () => {
      const updateId = '24393a6b-bda4-4149-b3e7-864e4f36bcd0';
      const updateMaterial = {
        title: 'Java Full Stack',
        description: 'ldjf;gjs;df',
        url: 'httpt//www.java',
        contentType: 'video and leacture notes',
        course: '24393a6b-bda4-4149-b3e7-864e4f36bcd0',
      };
      await controller.updateMaterialById(updateId, updateMaterial);
      expect(service.updateMaterialById).toHaveBeenCalledWith(
        updateId,
        updateMaterial,
      );
    });
  });
  describe('deleteMaterialById', () => {
    it('should delete the course by the course-Id', async () => {
      const deletematerialbyid = '24393a6b-bda4-4149-b3e7-864e4f36bcd0';
      await controller.deleteMaterialById(deletematerialbyid);
      expect(service.deleteMaterialById).toHaveBeenCalledWith(
        deletematerialbyid,
      );
    });
  });
});
