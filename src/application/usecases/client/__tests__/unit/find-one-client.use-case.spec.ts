/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FindOneClientUseCase } from '@/application/usecases/client/find-one-client.use-case'

describe('FindOneClientUseCase', () => {
  let useCase: FindOneClientUseCase
  let mockClientRepository: any

  beforeEach(() => {
    mockClientRepository = {
      client: jest.fn(),
    }
    useCase = new FindOneClientUseCase(mockClientRepository)
  })

  it('should return a client if found', async () => {
    const client = { id: '1', name: 'Client 1' }
    mockClientRepository.client.mockResolvedValue(client)

    const result = await useCase.execute('1')

    expect(mockClientRepository.client).toHaveBeenCalledWith({ id: '1' })
    expect(result).toEqual(client)
  })
})
