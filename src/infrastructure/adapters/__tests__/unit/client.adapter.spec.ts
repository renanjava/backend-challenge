import { ClientAdapter } from '@/infrastructure/adapters/client.adapter'
import { CreateClientDto } from '@/infrastructure/dtos/client/create-client.dto'
import { UpdateClientDto } from '@/infrastructure/dtos/client/update-client.dto'

describe('ClientAdapter', () => {
  it('should convert CreateClientDto to CreateClientInput', () => {
    const dto: CreateClientDto = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    }

    const input = ClientAdapter.createDtoToInput(dto)

    expect(input.email).toBe(dto.email)
    expect(input.name).toBe(dto.name)
    expect(input.password).toBe(dto.password)
  })

  it('should convert UpdateClientDto to UpdateClientInput', () => {
    const dto: UpdateClientDto = {
      email: 'updated@example.com',
      name: 'Updated User',
      password: 'newpassword123',
    }

    const input = ClientAdapter.updateDtoToInput(dto)

    expect(input.email).toBe(dto.email)
    expect(input.name).toBe(dto.name)
    expect(input.password).toBe(dto.password)
  })
})
