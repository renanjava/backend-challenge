/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { SignInUseCase } from '@/application/usecases/auth/sign-in.use-case'
import { ClienteNaoEncontradoError } from '@/application/errors/client/cliente-nao-encontrado.error'
import { SenhaInvalidaError } from '@/application/errors/auth/senha-invalida.error'
import { SignInInput } from '@/application/dtos/auth/sign-in.input'

describe('SignInUseCase', () => {
  let useCase: SignInUseCase
  let mockClientRepository: any
  let mockJwtService: any
  let mockPasswordHashing: any

  beforeEach(() => {
    mockClientRepository = {
      client: jest.fn(),
    }
    mockJwtService = {
      signAsync: jest.fn(),
    }
    mockPasswordHashing = {
      compare: jest.fn(),
    }
    useCase = new SignInUseCase(
      mockClientRepository,
      mockJwtService,
      mockPasswordHashing,
    )
  })

  it('should sign in a user and return a token', async () => {
    const credentials = new SignInInput('test@example.com', 'password')
    const client = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed-password',
    }
    const token = 'jwt-token'

    mockClientRepository.client.mockResolvedValue(client)
    mockPasswordHashing.compare.mockResolvedValue(true)
    mockJwtService.signAsync.mockResolvedValue(token)

    const result = await useCase.execute(credentials)

    expect(mockClientRepository.client).toHaveBeenCalledWith({
      email: credentials.email,
    })
    expect(mockPasswordHashing.compare).toHaveBeenCalledWith(
      credentials.password,
      client.password,
    )
    expect(mockJwtService.signAsync).toHaveBeenCalledWith({
      sub: client.id,
      username: client.name,
    })
    expect(result).toEqual({ access_token: token })
  })

  it('should throw ClienteNaoEncontradoError if client is not found', async () => {
    const credentials = new SignInInput('test@example.com', 'password')

    mockClientRepository.client.mockResolvedValue(null)

    await expect(useCase.execute(credentials)).rejects.toThrow(
      ClienteNaoEncontradoError,
    )
    expect(mockClientRepository.client).toHaveBeenCalledWith({
      email: credentials.email,
    })
  })

  it('should throw SenhaInvalidaError if password is invalid', async () => {
    const credentials = new SignInInput('test@example.com', 'password')
    const client = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed-password',
    }

    mockClientRepository.client.mockResolvedValue(client)
    mockPasswordHashing.compare.mockResolvedValue(false)

    await expect(useCase.execute(credentials)).rejects.toThrow(
      SenhaInvalidaError,
    )
    expect(mockClientRepository.client).toHaveBeenCalledWith({
      email: credentials.email,
    })
    expect(mockPasswordHashing.compare).toHaveBeenCalledWith(
      credentials.password,
      client.password,
    )
  })
})
