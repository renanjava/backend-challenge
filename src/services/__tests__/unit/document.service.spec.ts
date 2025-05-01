import { DocumentService } from '@/services/document.service'
import { Test, TestingModule } from '@nestjs/testing'

describe('DocumentService', () => {
  let service: DocumentService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentService],
    }).compile()

    service = module.get<DocumentService>(DocumentService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
