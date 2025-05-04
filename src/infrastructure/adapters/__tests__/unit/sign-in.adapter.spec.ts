import { SignInAdapter } from '@/infrastructure/adapters/sign-in.adapter'
import { SignInDto } from '@/infrastructure/dtos/auth/sign-in.dto'

describe('SignInAdapter', () => {
  it('should convert SignInDto to SignInInput', () => {
    const dto: SignInDto = {
      email: 'test@example.com',
      password: 'password123',
    }

    const input = SignInAdapter.dtoToInput(dto)

    expect(input.email).toBe(dto.email)
    expect(input.password).toBe(dto.password)
  })
})
