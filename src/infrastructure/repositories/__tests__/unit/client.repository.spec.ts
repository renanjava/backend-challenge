/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ClientRepository } from '@/infrastructure/repositories/client.repository'
import { DatabaseModule } from '@/infrastructure/modules/database.module'
import { Test, TestingModule } from '@nestjs/testing'

describe('ClientRepository', () => {
  let repository: ClientRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [ClientRepository],
    }).compile()

    repository = module.get<ClientRepository>(ClientRepository)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  describe('client', () => {
    it('should find a client by criteria', async () => {
      const mockClient = {
        id: '1',
        email: 'test@example.com',
        name: 'Test',
        password: 'Password',
      }
      jest.spyOn(repository, 'client').mockResolvedValue(mockClient as any)

      const result = await repository.client({ email: 'test@example.com' })

      expect(result).toEqual(mockClient)
    })

    it('should return null if client not found', async () => {
      jest.spyOn(repository, 'client').mockResolvedValue(null)

      const result = await repository.client({ email: 'notfound@example.com' })

      expect(result).toBeNull()
    })
  })

  describe('clients', () => {
    it('should return all clients', async () => {
      const mockClients = [
        {
          id: '1',
          email: 'test@example.com',
          name: 'Test',
          password: 'Password',
        },
      ]
      jest.spyOn(repository, 'clients').mockResolvedValue(mockClients as any)

      const result = await repository.clients({})

      expect(result).toEqual(mockClients)
    })

    it('should throw an error if clients retrieval fails', async () => {
      jest
        .spyOn(repository, 'clients')
        .mockRejectedValue(new Error('DB fetch failed'))

      await expect(repository.clients({})).rejects.toThrow('DB fetch failed')
    })
  })

  describe('createClient', () => {
    it('should create a new client', async () => {
      const mockClient = {
        id: '1',
        email: 'test@example.com',
        name: 'Test',
        password: 'Password',
      }
      jest
        .spyOn(repository, 'createClient')
        .mockResolvedValue(mockClient as any)

      const result = await repository.createClient(mockClient)

      expect(result).toEqual(mockClient)
    })

    it('should throw an error if createClient fails', async () => {
      jest
        .spyOn(repository, 'createClient')
        .mockRejectedValue(new Error('DB error'))

      await expect(
        repository.createClient({
          name: 'Test',
          email: 'fail@example.com',
          password: 'Password',
        }),
      ).rejects.toThrow('DB error')
    })
  })

  describe('updateClient', () => {
    it('should update a client', async () => {
      const updatedClient = {
        id: '1',
        email: 'test@example.com',
        name: 'Updated Name',
        password: 'Password',
      }
      jest
        .spyOn(repository, 'updateClient')
        .mockResolvedValue(updatedClient as any)

      const result = await repository.updateClient({
        where: { id: '1' },
        data: { name: 'Updated Name' },
      })

      expect(result).toEqual(updatedClient)
    })

    it('should throw an error if updateClient fails', async () => {
      jest
        .spyOn(repository, 'updateClient')
        .mockRejectedValue(new Error('Update failed'))

      await expect(
        repository.updateClient({ where: { id: '1' }, data: { name: 'New' } }),
      ).rejects.toThrow('Update failed')
    })
  })

  describe('deleteClient', () => {
    it('should delete a client', async () => {
      const deletedClient = {
        id: '1',
        email: 'test@example.com',
        name: 'Test',
        password: 'Password',
      }
      jest
        .spyOn(repository, 'deleteClient')
        .mockResolvedValue(deletedClient as any)

      const result = await repository.deleteClient({ id: '1' })

      expect(result).toEqual(deletedClient)
    })

    it('should throw an error if deleteClient fails', async () => {
      jest
        .spyOn(repository, 'deleteClient')
        .mockRejectedValue(new Error('Delete failed'))

      await expect(repository.deleteClient({ id: '1' })).rejects.toThrow(
        'Delete failed',
      )
    })
  })
})
