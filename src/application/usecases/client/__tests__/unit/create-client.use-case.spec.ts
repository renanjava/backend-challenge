/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { CreateClientUseCase } from '@/application/usecases/client/create-client.use-case'
import { EmailJaCadastradoError } from '@/application/errors/client/email-ja-cadastrado.error'

describe('CreateClientUseCase', () => {
  let useCase: CreateClientUseCase
  let mockClientRepository: any

  beforeEach(() => {
    mockClientRepository = {
      client: jest.fn(),
      createClient: jest.fn(),
    }
    useCase = new CreateClientUseCase(mockClientRepository)
  })

  it('should create a client if email is not registered', async () => {
    const clientData = { name: 'Test User', email: 'test@example.com' }
    mockClientRepository.client.mockResolvedValue(null)
    mockClientRepository.createClient.mockResolvedValue({
      id: '1',
      ...clientData,
    })

    const result = await useCase.execute(clientData as any)

    expect(mockClientRepository.client).toHaveBeenCalledWith({
      email: 'test@example.com',
    })
    expect(mockClientRepository.createClient).toHaveBeenCalledWith(clientData)
    expect(result).toEqual({ id: '1', ...clientData })
  })

  it('should throw EmailJaCadastradoError if email is already registered', async () => {
    const clientData = { name: 'Test User', email: 'test@example.com' }
    mockClientRepository.client.mockResolvedValue({ id: '1', ...clientData })

    await expect(useCase.execute(clientData as any)).rejects.toThrow(
      EmailJaCadastradoError,
    )
    expect(mockClientRepository.client).toHaveBeenCalledWith({
      email: 'test@example.com',
    })
  })
})
