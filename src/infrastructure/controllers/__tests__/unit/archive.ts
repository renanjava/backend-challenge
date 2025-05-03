/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ClientController } from '@/infrastructure/controllers/client.controller'
import { ClientService } from '@/infrastructure/services/client.service'
import { DocumentService } from '@/infrastructure/services/document.service'
import { DocumentRepository } from '@/infrastructure/repositories/document.repository'
import { DatabaseModule } from '@/infrastructure/modules/database.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { ClientUseCasesFactory } from '@/infrastructure/factories/client-use-cases.factory'
import { ClientRepository } from '@/infrastructure/repositories/client.repository'

describe('ClientController', () => {
  let controller: ClientController
  let service: jest.Mocked<ClientService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, ConfigModule, DatabaseModule],
      controllers: [ClientController],
      providers: [
        DocumentService,
        DocumentRepository,
        ClientUseCasesFactory,
        ClientRepository,
        { provide: 'ClientRepositoryImpl', useExisting: ClientRepository },
        {
          provide: ClientService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<ClientController>(ClientController)
    service = module.get<jest.Mocked<ClientService>>(ClientService)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should call service.create and return the result', async () => {
      const dto = {
        email: 'test@example.com',
        name: 'Test',
      } as any
      const createdClient = { id: '1', ...dto }
      service.create.mockResolvedValue(createdClient)

      const result = await controller.create(dto, 'hashedPassword')

      expect(service.create).toHaveBeenCalledWith({
        ...dto,
        password: 'hashedPassword',
      })
      expect(result).toEqual(createdClient)
    })

    it('should throw if service.create fails', async () => {
      service.create.mockRejectedValue(new Error('Create failed'))

      await expect(
        controller.create(
          { email: 'fail@test.com', name: 'Fail' } as any,
          'hashedPassword',
        ),
      ).rejects.toThrow('Create failed')
    })
  })

  describe('findAll', () => {
    it('should call service.findAll and return the result', async () => {
      const clients = [{ id: '1', name: 'Test', email: 'test@example.com' }]
      service.findAll.mockResolvedValue(clients as any)

      const result = await controller.findAll()

      expect(service.findAll).toHaveBeenCalled()
      expect(result).toEqual(clients)
    })
  })

  describe('findOne', () => {
    it('should call service.findOne and return the result', async () => {
      const client = { id: '1', name: 'Test', email: 'test@example.com' }
      service.findOne.mockResolvedValue(client as any)

      const result = await controller.findOne('1')

      expect(service.findOne).toHaveBeenCalledWith('1')
      expect(result).toEqual(client)
    })
  })

  describe('update', () => {
    it('should call service.update and return the result', async () => {
      const dto = { name: 'Updated Name' }
      const updatedClient = {
        id: '1',
        name: 'Updated Name',
        email: 'test@example.com',
      }
      service.update.mockResolvedValue(updatedClient as any)

      const result = await controller.update('1', dto)

      expect(service.update).toHaveBeenCalledWith('1', dto)
      expect(result).toEqual(updatedClient)
    })
  })

  describe('remove', () => {
    it('should call service.remove and return the result', async () => {
      const removedClient = { id: '1', name: 'Test', email: 'test@example.com' }
      service.remove.mockResolvedValue(removedClient as any)

      const result = await controller.remove('1')

      expect(service.remove).toHaveBeenCalledWith('1')
      expect(result).toEqual(removedClient)
    })
  })
})
