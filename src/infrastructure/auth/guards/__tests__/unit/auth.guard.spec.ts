/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { AuthGuard } from '@/infrastructure/auth/guards/auth.guard'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

describe('AuthGuard', () => {
  let guard: AuthGuard
  let mockJwtService: JwtService
  let mockConfigService: ConfigService

  beforeEach(() => {
    mockJwtService = {
      verify: jest.fn().mockResolvedValue({ id: '1' }),
    } as unknown as JwtService

    mockConfigService = {
      get: jest.fn().mockReturnValue('secret'),
    } as any

    guard = new AuthGuard(mockJwtService, mockConfigService)
  })

  it('should throw an error if authorization header is missing', async () => {
    const mockRequest = {
      headers: {},
    }
    const mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as any

    await expect(guard.canActivate(mockContext)).rejects.toThrow(
      'Token de acesso inválido',
    )
  })
})
