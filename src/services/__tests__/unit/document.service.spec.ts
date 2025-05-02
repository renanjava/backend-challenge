import { DatabaseModule } from '@/config/database/database.module'
import { ClientModule } from '@/modules/client.module'
import { DocumentRepository } from '@/repositories/document.repository'
import { DocumentService } from '@/services/document.service'
import { PdfProcessingService } from '@/services/pdf-processing.service'
import { Test, TestingModule } from '@nestjs/testing'

describe('DocumentService', () => {
  let service: DocumentService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ClientModule],
      providers: [DocumentService, DocumentRepository, PdfProcessingService],
    }).compile()

    service = module.get<DocumentService>(DocumentService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
