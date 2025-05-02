import { Test, TestingModule } from '@nestjs/testing'
import { DocumentRepository } from '../../document.repository'
import { DatabaseModule } from '@/modules/database.module'

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
