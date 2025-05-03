import { DocumentRepository } from '@/infrastructure/repositories/document.repository'
import { DatabaseModule } from '@/infrastructure/modules/database.module'
import { Test, TestingModule } from '@nestjs/testing'

describe('DocumentRepository', () => {
  let repository: DocumentRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [DocumentRepository],
    }).compile()

    repository = module.get<DocumentRepository>(DocumentRepository)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })
})
