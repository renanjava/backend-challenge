/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { UpdateClientUseCase } from '@/application/usecases/client/update-client.use-case'

describe('UpdateClientUseCase', () => {
  let useCase: UpdateClientUseCase
  let mockClientRepository: any

  beforeEach(() => {
    mockClientRepository = {
      updateClient: jest.fn(),
    }
    useCase = new UpdateClientUseCase(mockClientRepository)
  })

  it('should update a client', async () => {
    const clientId = '1'
    const updateData = { name: 'Updated Name' }
    const updatedClient = { id: '1', name: 'Updated Name' }
    mockClientRepository.updateClient.mockResolvedValue(updatedClient)

    const result = await useCase.execute(clientId, updateData)

    expect(mockClientRepository.updateClient).toHaveBeenCalledWith({
      where: { id: clientId },
      data: updateData,
    })
    expect(result).toEqual(updatedClient)
  })
})
