import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const mockservice = {
  createUser: jest.fn(),
  getAllUsers: jest.fn(),
  searchUsers: jest.fn(),
  getUserById: jest.fn(),
  updateUserById: jest.fn(),
  deleteUser: jest.fn(),
};

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockservice,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('createUser', () => {
    it('should create new data', async () => {
      const mockUser = {
        name: 'jflsauf',
        password: 'sudan@123',
        role: 'EDUCATOR',
        email: 'sudan@gmail.com',
        mobileNumber: '+919842818270',
        image: 'img1.png',
      } as any;
      await userController.createUser(mockUser);
      expect(userService.createUser).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('getAllUsers', () => {
    it('should get all data', async () => {
      const getAllUser = [] as any;
      await userController.getAllUsers();
      expect(userService.getAllUsers).toHaveBeenCalledWith();
    });
  });

  describe('searchUsers', () => {
    it('should get users by their name', async () => {
      const searchQuery = { name: 'suda' };
      await userController.searchUsers(searchQuery);
      expect(userService.searchUsers).toHaveBeenCalledWith(searchQuery.name);
    });
  });

  describe('getUserById', () => {
    it('should get the  user by their unique Id', async () => {
      const getById = 'd249692d-6a78-4ff2-95a5-bf3665e02ecc';
      await userController.getUserById(getById);
      expect(userService.getUserById).toHaveBeenCalledWith(getById);
    });
  });

  describe('updateUserById', () => {
    it('should update the users data by the Id', async () => {
      const updateId = 'd249692d-6a78-4ff2-95a5-bf3665e02ecc';
      const updateUser = {
        name: 'jfdulf',
        mobileNumber: '+919842818272',
        image: 'imge.png',
      };
      await userController.updateUserById(updateId, updateUser);
      expect(userService.updateUserById).toHaveBeenCalledWith(
        updateId,
        updateUser,
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete the user by the user-Id', async () => {
      const deleteUser = 'd249692d-6a78-4ff2-95a5-bf3665e02ecc';
      await userController.deleteUser(deleteUser);
      expect(userService.deleteUser).toHaveBeenCalledWith(deleteUser);
    });
  });
});
