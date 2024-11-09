import { Test, TestingModule } from '@nestjs/testing';
import { MaterialService } from './material.service';
import { Repository } from 'typeorm';
import { Material_Entity } from '../entity/material.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

const mockservice = {
  findOne: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockMaterialEntity = {
  title: 'Java Full Stack',
  description: 'ldjf',
  url: 'httpt//www.dfo.fdffdjflieecer',
  contentType: 'quize',
  course: 'ffc85d5a-3b08-4d3a-963d-8661e5a776fa',
};

describe('MaterialService', () => {
  let service: MaterialService;
  let repository: Repository<Material_Entity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaterialService,
        {
          provide: getRepositoryToken(Material_Entity),
          useValue: mockservice,
        },
      ],
    }).compile();

    service = module.get<MaterialService>(MaterialService);
    repository = module.get<Repository<Material_Entity>>(
      getRepositoryToken(Material_Entity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMaterial', () => {
    it('should create the new data', async () => {
      const createMaterial = {
        title: 'Java Full Stack',
        description: 'ldjf',
        url: 'httpt//www.dfo.fdffdjflieecer',
        contentType: 'quize',
        course: 'ffc85d5a-3b08-4d3a-963d-8661e5a776fa',
      };
      mockservice.save.mockResolvedValue(mockMaterialEntity);
      await service.createMaterial(createMaterial);
      expect(mockservice.save).toHaveBeenCalledWith(createMaterial);
    });
    it('should throw unexpected error', async () => {
      const createMaterial = {
        title: 'Java Full Stack',
        description: 'ldjf',
        url: 'httpt//www.dfo.fdffdjflieecer',
        contentType: 'quize',
        course: 'ffc85d5a-3b08-4d3a-963d-8661e5a776fa',
      };
      mockservice.save.mockRejectedValue(createMaterial);
      await expect(service.createMaterial(createMaterial)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getAllMaterial', () => {
    it('should show all the material', async () => {
      mockservice.find.mockResolvedValue([mockMaterialEntity]);
      await service.getAllMaterial();
      expect(mockservice.find).toHaveBeenCalled();
    });
  });

  describe('getMaterialById', () => {
    it('should get the material by id ', async () => {
      mockservice.find.mockResolvedValue(mockMaterialEntity);
      await service.getMaterialById('53c37ffc-3f24-4f0f-9fe2-f010e666c0c0');
      expect(mockservice.find).toHaveBeenCalledWith({
        where: { id: '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0' },
      });
    });
    it('should throw error unexpected error', async () => {
      mockservice.find.mockResolvedValue(null);
      await expect(
        service.getMaterialById('3f24-4f0f-9fe2-f010e666c0c0'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getByCourseId', () => {
    it('should show the material by the course Id', async () => {
      const courseId = '96c52131-398a-42ae-886e-5656b0be7f03';
      mockservice.find.mockResolvedValue(mockMaterialEntity);
      await service.getByCourseId(courseId);
      expect(mockservice.find).toHaveBeenCalledWith({
        where: { course: { id: courseId } },
        relations: ['course'],
      });
    });
    it('should throw the unexpected error', async () => {
      mockservice.find.mockResolvedValue(null);
      await expect(
        service.getByCourseId('53c37ffc-3f24-4f0f-9fe2-f010e666c0c0'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateMaterialById', () => {
    it('should successfully update a materia by id ', async () => {
      mockservice.findOne.mockResolvedValue(mockMaterialEntity);
      mockservice.update.mockResolvedValue({ affected: 1 });
      await service.updateMaterialById('53c37ffc-3f24-4f0f-9fe2-f010e666c0c0', {
        title: 'Java Full Stack',
        description: 'ldjf;gjs;df',
        url: 'httpt//www.java',
        contentType: 'video and leacture notes',
      });
      expect(mockservice.update).toHaveBeenCalledWith(
        '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0',
        {
          title: 'Java Full Stack',
          description: 'ldjf;gjs;df',
          url: 'httpt//www.java',
          contentType: 'video and leacture notes',
        },
      );
    });

    it('should throw error unexpected error', async () => {
      mockservice.findOne.mockResolvedValue(null);
      await expect(
        service.updateMaterialById('3cd11941-53bb-4764-a9ba-64fd99c94907', {
          title: 'Java Full Stack',
          description: 'ldjf;gjs;df',
          url: 'httpt//www.java',
          contentType: 'video and leacture notes',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteMaterialById', () => {
    it('successfully delete a material by id ', async () => {
      mockservice.delete.mockResolvedValue({ affected: 1 });
      await service.deleteMaterialById('3cd11941-53bb-4764-a9ba-64fd99c94907');
      expect(mockservice.delete).toHaveBeenCalledWith(
        '3cd11941-53bb-4764-a9ba-64fd99c94907',
      );
    });
    it('should throw error unexpected error', async () => {
      mockservice.delete.mockResolvedValue(null);
      await expect(
        service.deleteMaterialById('3cd11941-53bb-4764-a9ba64fd99c94907'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
