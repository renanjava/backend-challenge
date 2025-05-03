/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClientController } from '@/infrastructure/controllers/client.controller'
import { ClientUseCasesFactory } from '@/infrastructure/factories/client-use-cases.factory'
import { DocumentUseCasesFactory } from '@/infrastructure/factories/document-use-cases.factory'
import { CreateClientDto } from '@/infrastructure/dtos/client/create-client.dto'
import { UpdateClientDto } from '@/infrastructure/dtos/client/update-client.dto'
import { Test, TestingModule } from '@nestjs/testing'
import { ClientRepository } from '@/infrastructure/repositories/client.repository'
import { JwtService } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { BcryptImpl } from '@/infrastructure/common/utils/bcrypt-impl'
import { ClientAdapter } from '@/infrastructure/adapters/client.adapter'

describe('ClientController', () => {
  let controller: ClientController
  let clientUseCasesFactory: jest.Mocked<ClientUseCasesFactory>
  let documentUseCasesFactory: jest.Mocked<DocumentUseCasesFactory>

  let mockClientRepository: jest.Mocked<ClientRepository>

  beforeEach(async () => {
    mockClientRepository = {
      createClient: jest.fn(),
      clients: jest.fn(),
      client: jest.fn(),
      updateClient: jest.fn(),
      deleteClient: jest.fn(),
    } as any

    const mockClientUseCasesFactory: jest.Mocked<ClientUseCasesFactory> = {
      getCreateClientUseCaseInstance: jest.fn(),
      getFindAllClientsUseCaseInstance: jest.fn(),
      getFindOneClientUseCaseInstance: jest.fn(),
      getUpdateClientUseCaseInstance: jest.fn(),
      getRemoveClientUseCaseInstance: jest.fn(),
    } as any

    const mockDocumentUseCasesFactory: jest.Mocked<DocumentUseCasesFactory> = {
      getFindAllDocumentsUseCaseInstance: jest.fn(),
    } as any

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [ClientController],
      providers: [
        JwtService,
        BcryptImpl,
        { provide: 'BcryptImpl', useExisting: BcryptImpl },
        {
          provide: ClientUseCasesFactory,
          useValue: mockClientUseCasesFactory,
        },
        {
          provide: DocumentUseCasesFactory,
          useValue: mockDocumentUseCasesFactory,
        },
      ],
    }).compile()

    controller = module.get<ClientController>(ClientController)
    clientUseCasesFactory = mockClientUseCasesFactory
    documentUseCasesFactory = mockDocumentUseCasesFactory
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should call the create client use case and return the result', async () => {
      const createClientDto: CreateClientDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
      }
      const createClientUseCase = {
        execute: jest.fn().mockResolvedValue({ id: '1', ...createClientDto }),
      }
      clientUseCasesFactory.getCreateClientUseCaseInstance.mockReturnValue(
        createClientUseCase as any,
      )

      const result = await controller.create(createClientDto, 'hashedPassword')

      expect(createClientUseCase.execute).toHaveBeenCalledWith({
        ...createClientDto,
        password: 'hashedPassword',
      })
      expect(result).toEqual({ id: '1', ...createClientDto })
    })
  })

  describe('findAll', () => {
    it('should call the find all clients use case and return the result', async () => {
      const findAllClientsUseCase = {
        execute: jest.fn().mockResolvedValue([{ id: '1', name: 'Test User' }]),
      }
      clientUseCasesFactory.getFindAllClientsUseCaseInstance.mockReturnValue(
        findAllClientsUseCase as any,
      )

      const result = await controller.findAll()

      expect(findAllClientsUseCase.execute).toHaveBeenCalled()
      expect(result).toEqual([{ id: '1', name: 'Test User' }])
    })
  })

  describe('update', () => {
    it('should call the update client use case and return the result', async () => {
      const updateClientDto: UpdateClientDto = { name: 'Updated Name' }
      const updateClientInput = ClientAdapter.updateDtoToInput(updateClientDto)

      const findOneClientUseCase = {
        execute: jest.fn().mockResolvedValue({
          id: '1',
          name: 'Old Name',
          email: 'test@example.com',
        }),
      }
      clientUseCasesFactory.getFindOneClientUseCaseInstance.mockReturnValue(
        findOneClientUseCase as any,
      )

      const updateClientUseCase = {
        execute: jest.fn().mockResolvedValue({
          id: '1',
          name: 'Updated Name',
          email: 'test@example.com',
        }),
      }
      clientUseCasesFactory.getUpdateClientUseCaseInstance.mockReturnValue(
        updateClientUseCase as any,
      )

      const result = await controller.update('1', updateClientInput)

      expect(findOneClientUseCase.execute).toHaveBeenCalledWith('1')
      expect(updateClientUseCase.execute).toHaveBeenCalledWith(
        '1',
        updateClientInput,
      )
      expect(result).toEqual({
        id: '1',
        name: 'Updated Name',
        email: 'test@example.com',
      })
    })
  })
})
