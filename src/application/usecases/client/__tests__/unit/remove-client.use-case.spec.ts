/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { RemoveClientUseCase } from '@/application/usecases/client/remove-client.use-case'

describe('RemoveClientUseCase', () => {
  let useCase: RemoveClientUseCase
  let mockClientRepository: any

  beforeEach(() => {
    mockClientRepository = {
      deleteClient: jest.fn(),
    }
    useCase = new RemoveClientUseCase(mockClientRepository)
  })

  it('should remove a client', async () => {
    const clientId = '1'
    const deletedClient = { id: '1' }
    mockClientRepository.deleteClient.mockResolvedValue(deletedClient)

    const result = await useCase.execute(clientId)

    expect(mockClientRepository.deleteClient).toHaveBeenCalledWith({
      id: clientId,
    })
    expect(result).toEqual(deletedClient)
  })
})
