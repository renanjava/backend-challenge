import { Test, TestingModule } from '@nestjs/testing'
import { DocumentController } from '../../document.controller'
import { DocumentService } from '../../../services/document.service'
import { DocumentRepository } from '@/repositories/document.repository'
import { DatabaseModule } from '@/config/database/database.module'

describe('DocumentController', () => {
  let controller: DocumentController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [DocumentController],
      providers: [DocumentService, DocumentRepository],
    }).compile()

    controller = module.get<DocumentController>(DocumentController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
