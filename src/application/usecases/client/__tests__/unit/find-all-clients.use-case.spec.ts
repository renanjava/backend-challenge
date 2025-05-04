/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FindAllClientsUseCase } from '@/application/usecases/client/find-all-clients.use-case'

describe('FindAllClientsUseCase', () => {
  let useCase: FindAllClientsUseCase
  let mockClientRepository: any

  beforeEach(() => {
    mockClientRepository = {
      clients: jest.fn(),
    }
    useCase = new FindAllClientsUseCase(mockClientRepository)
  })

  it('should return all clients', async () => {
    const clients = [
      { id: '1', name: 'Client 1' },
      { id: '2', name: 'Client 2' },
    ]
    mockClientRepository.clients.mockResolvedValue(clients)

    const result = await useCase.execute()

    expect(mockClientRepository.clients).toHaveBeenCalledWith({})
    expect(result).toEqual(clients)
  })
})
