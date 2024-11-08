import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User_entity } from '../entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDto } from './user.dto';
import { BadRequestException } from '@nestjs/common';

const mockUserEntity = {
  id: '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0',
  name: 'John Doe',
  password: 'password123',
  role: 'EDUCATOR',
  email: 'john.doe@example.com',
  mobileNumber: '+1234567890',
  image: 'image.png',
};

const mockservice = {
  findOne: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let UserRepository: Repository<User_entity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User_entity),
          useValue: mockservice,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    UserRepository = module.get<Repository<User_entity>>(
      getRepositoryToken(User_entity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const userDto: UserDto = {
        name: 'Jane Doe',
        password: 'password123',
        role: 'EDUCATOR',
        email: 'jane.doe@example.com',
        mobileNumber: '+1234567890',
        image: 'image.png',
      };

      mockservice.findOne.mockResolvedValue(null);
      mockservice.save.mockResolvedValue(mockUserEntity);
      await service.createUser(userDto);
      expect(mockservice.findOne).toHaveBeenCalledWith({
        where: [{ email: userDto.email }],
      });
      expect(mockservice.save).toHaveBeenCalledWith(userDto);
    });

    it('should throw error unexpected error ', async () => {
      const userDto: UserDto = {
        name: 'Jane Doe',
        password: 'password123',
        role: 'EDUCATOR',
        email: 'jane.doe@e.com',
        mobileNumber: '+1234567890',
        image: 'image.png',
      };
      mockservice.findOne.mockResolvedValue(mockUserEntity);
      await expect(service.createUser(userDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      mockservice.find.mockResolvedValue([mockUserEntity]);
      const result = await service.getAllUsers();
      expect(mockservice.find).toHaveBeenCalled();
      expect(result).toEqual({ success: true, message: [mockUserEntity] });
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      mockservice.findOne.mockResolvedValue(mockUserEntity);

      const result = await service.getUserById(
        '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0',
      );

      expect(mockservice.findOne).toHaveBeenCalledWith({
        where: { id: '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0' },
      });
      expect(result).toEqual({ success: true, message: mockUserEntity });
    });

    it('should throw error unexpected error', async () => {
      mockservice.findOne.mockResolvedValue(null);

      await expect(
        service.getUserById('3f24-4f0f-9fe2-f010e666c0c0'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('searchUsers', () => {
    it('should return users by name search', async () => {
      mockservice.find.mockResolvedValue([mockUserEntity]);
      await service.searchUsers('John');
      expect(mockservice.find).toHaveBeenCalledWith({
        where: { name: expect.any(Object) },
      });
    });

    it('should throw error unexpected error', async () => {
      mockservice.find.mockResolvedValue([]);
      await expect(service.searchUsers('safdfasf')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('updateUserById', () => {
    it('should update a user by id successfully', async () => {
      mockservice.findOne.mockResolvedValue(mockUserEntity);
      mockservice.update.mockResolvedValue({ affected: 1 });
      const result = await service.updateUserById(
        '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0',
        { name: 'Updated Name' },
      );

      expect(mockservice.findOne).toHaveBeenCalledWith({
        where: { id: '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0' },
      });
      expect(mockservice.update).toHaveBeenCalledWith(
        '53c37ffc-3f24-4f0f-9fe2-f010e666c0c0',
        { name: 'Updated Name' },
      );
      expect(result).toEqual({ success: true, message: { affected: 1 } });
    });
    it('should throw error unexpected error', async () => {
      mockservice.findOne.mockResolvedValue(null);
      await expect(
        service.updateUserById('3cd11941-53bb-4764-a9ba-64fd99c94907', {
          name: 'New Name',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by id successfully', async () => {
      mockservice.delete.mockResolvedValue({ affected: 1 });
      await service.deleteUser('3cd11941-53bb-4764-a9ba-64fd99c94907');
      expect(mockservice.delete).toHaveBeenCalledWith(
        '3cd11941-53bb-4764-a9ba-64fd99c94907',
      );
    });

    it('should throw error unexpected error', async () => {
      mockservice.delete.mockResolvedValue({ affected: 0 });

      await expect(
        service.deleteUser('3cd11941-53bb-4764-a9ba-64fd99c94907'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
