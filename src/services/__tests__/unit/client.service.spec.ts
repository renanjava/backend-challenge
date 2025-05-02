/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing'
import { ClientService } from '../../client.service'
import { ClientRepository } from '../../../repositories/client.repository'
import { ClienteNaoEncontradoException } from '@/errors/client/cliente-nao-encontrado.exception'
import { EmailJaCadastradoException } from '@/errors/client/email-ja-cadastrado.exception'

describe('ClientService', () => {
  let service: ClientService
  let repository: jest.Mocked<ClientRepository>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: ClientRepository,
          useValue: {
            client: jest.fn(),
            clients: jest.fn(),
            createClient: jest.fn(),
            updateClient: jest.fn(),
            deleteClient: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<ClientService>(ClientService)
    repository = module.get(ClientRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create a client successfully', async () => {
      const createClientDto = {
        email: 'test@example.com',
        name: 'Test',
        password: 'password-example',
      }
      repository.client.mockResolvedValue(null)
      repository.createClient.mockResolvedValue(createClientDto as any)

      const result = await service.create(createClientDto)

      expect(repository.client).toHaveBeenCalledWith({
        email: createClientDto.email,
      })
      expect(repository.createClient).toHaveBeenCalledWith(createClientDto)
      expect(result).toEqual(createClientDto)
    })

    it('should throw EmailJaCadastradoException if email already exists', async () => {
      const createClientDto = {
        email: 'test@example.com',
        name: 'Test',
        password: 'password-example',
      }
      repository.client.mockResolvedValue(createClientDto as any)

      await expect(service.create(createClientDto)).rejects.toThrow(
        EmailJaCadastradoException,
      )
      expect(repository.client).toHaveBeenCalledWith({
        email: createClientDto.email,
      })
      expect(repository.createClient).not.toHaveBeenCalled()
    })

    it('should propagate unexpected errors on create', async () => {
      repository.client.mockRejectedValue(new Error('DB failure'))

      await expect(
        service.create({
          email: 'fail@test.com',
          name: 'Fail',
          password: 'password-example',
        }),
      ).rejects.toThrow('DB failure')
    })
  })

  describe('findAll', () => {
    it('should return all clients', async () => {
      const clients = [
        {
          id: '1',
          name: 'Test',
          email: 'test@example.com',
          password: 'password-example',
        },
      ]
      repository.clients.mockResolvedValue(clients as any)

      const result = await service.findAll()

      expect(repository.clients).toHaveBeenCalledWith({})
      expect(result).toEqual(clients)
    })
  })

  describe('findOne', () => {
    it('should return a client by id', async () => {
      const client = {
        id: '1',
        name: 'Test',
        email: 'test@example.com',
        password: 'password-example',
      }
      repository.client.mockResolvedValue(client as any)

      const result = await service.findOne('1')

      expect(repository.client).toHaveBeenCalledWith({ id: '1' })
      expect(result).toEqual(client)
    })

    it('should throw ClienteNaoEncontradoException if client is not found', async () => {
      repository.client.mockResolvedValue(null)

      await expect(service.findOne('1')).rejects.toThrow(
        ClienteNaoEncontradoException,
      )
      expect(repository.client).toHaveBeenCalledWith({ id: '1' })
    })
  })

  describe('update', () => {
    it('should update a client successfully', async () => {
      const updateClientDto = { name: 'Updated Name' }
      const client = {
        id: '1',
        name: 'Test',
        email: 'test@example.com',
        password: 'password-example',
      }
      repository.client.mockResolvedValue(client as any)
      repository.updateClient.mockResolvedValue({
        ...client,
        ...updateClientDto,
      } as any)

      const result = await service.update('1', updateClientDto)

      expect(repository.client).toHaveBeenCalledWith({ id: '1' })
      expect(repository.updateClient).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateClientDto,
      })
      expect(result).toEqual({ ...client, ...updateClientDto })
    })

    it('should throw ClienteNaoEncontradoException if client is not found', async () => {
      repository.client.mockResolvedValue(null)

      await expect(
        service.update('1', { name: 'Updated Name' }),
      ).rejects.toThrow(ClienteNaoEncontradoException)
      expect(repository.client).toHaveBeenCalledWith({ id: '1' })
      expect(repository.updateClient).not.toHaveBeenCalled()
    })
  })

  describe('remove', () => {
    it('should remove a client successfully', async () => {
      const client = {
        id: '1',
        name: 'Test',
        email: 'test@example.com',
        password: 'password-example',
      }
      repository.client.mockResolvedValue(client as any)
      repository.deleteClient.mockResolvedValue(client as any)

      const result = await service.remove('1')

      expect(repository.client).toHaveBeenCalledWith({ id: '1' })
      expect(repository.deleteClient).toHaveBeenCalledWith({ id: '1' })
      expect(result).toEqual(client)
    })

    it('should throw ClienteNaoEncontradoException if client is not found', async () => {
      repository.client.mockResolvedValue(null)

      await expect(service.remove('1')).rejects.toThrow(
        ClienteNaoEncontradoException,
      )
      expect(repository.client).toHaveBeenCalledWith({ id: '1' })
      expect(repository.deleteClient).not.toHaveBeenCalled()
    })
  })
})
