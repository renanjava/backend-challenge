import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseModule } from '@/modules/database.module'
import { ClientRepository } from '@/repositories/client.repository'
import { execSync } from 'child_process'
import { ClientModule } from '@/modules/client.module'
import { ConfigModule } from '@nestjs/config'
import { forwardRef } from '@nestjs/common'

describe('Database Connection', () => {
  let repository: ClientRepository

  beforeEach(async () => {
    execSync('npx prisma migrate deploy')
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, forwardRef(() => ClientModule), ConfigModule],
    }).compile()

    repository = module.get<ClientRepository>(ClientRepository)
  })

  afterEach(async () => {
    await repository.deleteClient({ id: '1' })
  })

  it('should connect to the database and perform a query', async () => {
    const mockClient = {
      id: '1',
      email: 'test@example.com',
      name: 'Test',
      password: 'Password',
    }

    const result = await repository.createClient(mockClient)

    expect(result).toHaveProperty('createdAt')
    expect(result.email).toBe(mockClient.email)
    expect(result.name).toBe(mockClient.name)
    expect(result.id).toBeTruthy()
  })
})
