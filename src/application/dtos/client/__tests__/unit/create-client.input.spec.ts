import { CreateClientInput } from '@/application/dtos/client/create-client.input'

describe('CreateClientInput', () => {
  it('should create a valid CreateClientInput instance', () => {
    const input = new CreateClientInput(
      'test@example.com',
      'Test User',
      'password123',
    )

    expect(input.email).toBe('test@example.com')
    expect(input.name).toBe('Test User')
    expect(input.password).toBe('password123')
  })
})
