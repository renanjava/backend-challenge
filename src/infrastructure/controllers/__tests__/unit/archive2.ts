/*
import { DocumentController } from '@/infrastructure/controllers/document.controller'
import { Test, TestingModule } from '@nestjs/testing'
import { HttpModule } from '@nestjs/axios'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { DocumentModule } from '@/infrastructure/modules/document.module'
import { ClientModule } from '@/infrastructure/modules/client.module'

describe('DocumentController', () => {
  let controller: DocumentController
  let documentService: jest.Mocked<DocumentService>
  let pdfProcessingService: jest.Mocked<PdfProcessingService>
  let clientService: jest.Mocked<ClientService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        JwtModule,
        ConfigModule,
        DocumentModule,
        ClientModule,
      ],
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
*/
