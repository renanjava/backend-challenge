/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing'
import { DocumentController } from '../../document.controller'
import { DocumentService } from '../../../services/document.service'
import { PdfProcessingService } from '../../../services/pdf-processing.service'
import { ClientService } from '../../../services/client.service'
import { WebProcessingService } from '@/services/web-processing.service'
import { HttpModule } from '@nestjs/axios'

describe('DocumentController', () => {
  let controller: DocumentController
  let documentService: jest.Mocked<DocumentService>
  let pdfProcessingService: jest.Mocked<PdfProcessingService>
  let clientService: jest.Mocked<ClientService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [DocumentController],
      providers: [
        WebProcessingService,
        {
          provide: DocumentService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            createPdfDocument: jest.fn(),
          },
        },
        {
          provide: PdfProcessingService,
          useValue: {
            extractTitleAndContent: jest.fn(),
          },
        },
        {
          provide: ClientService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<DocumentController>(DocumentController)
    documentService = module.get(DocumentService)
    pdfProcessingService = module.get(PdfProcessingService)
    clientService = module.get(ClientService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should call service.create and return the result', async () => {
      const dto = { title: 'Test', content: 'Content', clientId: '1' } as any
      const createdDocument = { id: '1', ...dto }
      documentService.create.mockResolvedValue(createdDocument)

      const result = await controller.create(dto)

      expect(documentService.create).toHaveBeenCalledWith(dto)
      expect(result).toEqual(createdDocument)
    })
  })
})
