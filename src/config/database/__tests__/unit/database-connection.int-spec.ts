import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseModule } from '@/config/database/database.module'
import { ClientRepository } from '@/client/client.repository'

describe('Database Connection', () => {
  let repository: ClientRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [ClientRepository],
    }).compile()

    repository = module.get<ClientRepository>(ClientRepository)
  })

  afterEach(async () => {
    await repository.deleteClient({ id: '1' })
  })

  it('should connect to the database and perform a query', async () => {
    const mockClient = { id: '1', email: 'test@example.com', name: 'Test' }

    const result = await repository.createClient(mockClient)

    expect(result).toHaveProperty('created_at')
    expect(result.email).toBe(mockClient.email)
    expect(result.name).toBe(mockClient.name)
    expect(result.id).toBeTruthy()
  })
})
