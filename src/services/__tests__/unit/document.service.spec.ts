import { DatabaseConnection } from '@/config/database/database.connection'
import { DatabaseModule } from '@/config/database/database.module'
import { DocumentRepository } from '@/repositories/document.repository'
import { DocumentService } from '@/services/document.service'
import { Test, TestingModule } from '@nestjs/testing'

describe('DocumentService', () => {
  let service: DocumentService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [DocumentService, DocumentRepository],
    }).compile()

    service = module.get<DocumentService>(DocumentService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
