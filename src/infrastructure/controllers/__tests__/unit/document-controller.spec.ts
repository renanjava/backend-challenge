/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { WebDocumentDto } from '@/infrastructure/dtos/document/web-document.dto'
import { DocumentController } from '@/infrastructure/controllers/document.controller'
import { DocumentUseCasesFactory } from '@/infrastructure/factories/document-use-cases.factory'
import { ClientUseCasesFactory } from '@/infrastructure/factories/client-use-cases.factory'
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

describe('DocumentController', () => {
  let controller: DocumentController
  let documentUseCasesFactory: jest.Mocked<DocumentUseCasesFactory>
  let clientUseCasesFactory: jest.Mocked<ClientUseCasesFactory>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [DocumentController],
      providers: [
        JwtService,
        {
          provide: DocumentUseCasesFactory,
          useValue: {
            getPdfProcessingUseCaseInstance: jest.fn(),
            getWebProcessingUseCaseInstance: jest.fn(),
            getCreateDocumentUseCaseInstance: jest.fn(),
            getFindAllDocumentsUseCaseInstance: jest.fn(),
            getFindOneDocumentUseCaseInstance: jest.fn(),
            getUpdateDocumentUseCaseInstance: jest.fn(),
            getRemoveDocumentUseCaseInstance: jest.fn(),
          },
        },
        {
          provide: ClientUseCasesFactory,
          useValue: {
            getFindOneClientUseCaseInstance: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<DocumentController>(DocumentController)
    documentUseCasesFactory = module.get(DocumentUseCasesFactory)
    clientUseCasesFactory = module.get(ClientUseCasesFactory)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('createPdfDocument', () => {
    it('should process a PDF and create a document', async () => {
      const file = { buffer: Buffer.from('test') } as Express.Multer.File
      const request = { user: { sub: '1' } } as any
      const pdfProcessingUseCase = {
        execute: jest
          .fn()
          .mockResolvedValue({ title: 'Test PDF', content: 'PDF Content' }),
      }
      const createDocumentUseCase = {
        execute: jest.fn().mockResolvedValue({
          id: '1',
          title: 'Test PDF',
          content: 'PDF Content',
        }),
      }
      const findOneClientUseCase = { execute: jest.fn() }

      documentUseCasesFactory.getPdfProcessingUseCaseInstance.mockReturnValue(
        pdfProcessingUseCase as any,
      )
      documentUseCasesFactory.getCreateDocumentUseCaseInstance.mockReturnValue(
        createDocumentUseCase as any,
      )
      clientUseCasesFactory.getFindOneClientUseCaseInstance.mockReturnValue(
        findOneClientUseCase as any,
      )

      const result = await controller.createPdfDocument(file, request)

      expect(pdfProcessingUseCase.execute).toHaveBeenCalledWith(file)
      expect(findOneClientUseCase.execute).toHaveBeenCalledWith('1')
      expect(createDocumentUseCase.execute).toHaveBeenCalledWith({
        title: 'Test PDF',
        content: 'PDF Content',
        sourceType: 'WEB',
        clientId: '1',
      })
      expect(result).toEqual({
        id: '1',
        title: 'Test PDF',
        content: 'PDF Content',
      })
    })

    it('should throw an error if PDF processing fails', async () => {
      const file = { buffer: Buffer.from('test') } as Express.Multer.File
      const request = { user: { sub: '1' } } as any
      const pdfProcessingUseCase = {
        execute: jest
          .fn()
          .mockRejectedValue(new Error('PDF processing failed')),
      }

      documentUseCasesFactory.getPdfProcessingUseCaseInstance.mockReturnValue(
        pdfProcessingUseCase as any,
      )

      await expect(controller.createPdfDocument(file, request)).rejects.toThrow(
        'PDF processing failed',
      )
      expect(pdfProcessingUseCase.execute).toHaveBeenCalledWith(file)
    })
  })

  describe('createWebDocument', () => {
    it('should process a web document and create a document', async () => {
      const webDocumentDto = { url: 'http://example.com' } as WebDocumentDto
      const request = { user: { sub: '1' } } as any
      const webProcessingUseCase = {
        execute: jest
          .fn()
          .mockResolvedValue({ title: 'Test Web', content: 'Web Content' }),
      }
      const createDocumentUseCase = {
        execute: jest.fn().mockResolvedValue({
          id: '1',
          title: 'Test Web',
          content: 'Web Content',
        }),
      }
      const findOneClientUseCase = { execute: jest.fn() }

      documentUseCasesFactory.getWebProcessingUseCaseInstance.mockReturnValue(
        webProcessingUseCase as any,
      )
      documentUseCasesFactory.getCreateDocumentUseCaseInstance.mockReturnValue(
        createDocumentUseCase as any,
      )
      clientUseCasesFactory.getFindOneClientUseCaseInstance.mockReturnValue(
        findOneClientUseCase as any,
      )

      const result = await controller.createWebDocument(webDocumentDto, request)

      expect(webProcessingUseCase.execute).toHaveBeenCalledWith(
        webDocumentDto.url,
      )
      expect(findOneClientUseCase.execute).toHaveBeenCalledWith('1')
      expect(createDocumentUseCase.execute).toHaveBeenCalledWith({
        title: 'Test Web',
        content: 'Web Content',
        sourceType: 'PDF',
        clientId: '1',
      })
      expect(result).toEqual({
        id: '1',
        title: 'Test Web',
        content: 'Web Content',
      })
    })

    it('should throw an error if web processing fails', async () => {
      const webDocumentDto = { url: 'http://example.com' } as WebDocumentDto
      const request = { user: { sub: '1' } } as any
      const webProcessingUseCase = {
        execute: jest
          .fn()
          .mockRejectedValue(new Error('Web processing failed')),
      }

      documentUseCasesFactory.getWebProcessingUseCaseInstance.mockReturnValue(
        webProcessingUseCase as any,
      )

      await expect(
        controller.createWebDocument(webDocumentDto, request),
      ).rejects.toThrow('Web processing failed')
      expect(webProcessingUseCase.execute).toHaveBeenCalledWith(
        webDocumentDto.url,
      )
    })
  })

  describe('findAll', () => {
    it('should return all documents', async () => {
      const findAllDocumentsUseCase = {
        execute: jest.fn().mockResolvedValue([
          { id: '1', title: 'Doc 1' },
          { id: '2', title: 'Doc 2' },
        ]),
      }

      documentUseCasesFactory.getFindAllDocumentsUseCaseInstance.mockReturnValue(
        findAllDocumentsUseCase as any,
      )

      const result = await controller.findAll()

      expect(findAllDocumentsUseCase.execute).toHaveBeenCalledWith({})
      expect(result).toEqual([
        { id: '1', title: 'Doc 1' },
        { id: '2', title: 'Doc 2' },
      ])
    })
  })

  describe('findOne', () => {
    it('should return a single document', async () => {
      const findOneDocumentUseCase = {
        execute: jest.fn().mockResolvedValue({ id: '1', title: 'Doc 1' }),
      }

      documentUseCasesFactory.getFindOneDocumentUseCaseInstance.mockReturnValue(
        findOneDocumentUseCase as any,
      )

      const result = await controller.findOne('1')

      expect(findOneDocumentUseCase.execute).toHaveBeenCalledWith('1')
      expect(result).toEqual({ id: '1', title: 'Doc 1' })
    })
  })

  describe('update', () => {
    it('should update a document', async () => {
      const findOneDocumentUseCase = {
        execute: jest.fn().mockResolvedValue({
          id: '1',
          title: 'Old Title',
          content: 'Old Content',
        }),
      }
      documentUseCasesFactory.getFindOneDocumentUseCaseInstance.mockReturnValue(
        findOneDocumentUseCase as any,
      )

      const updateDocumentUseCase = {
        execute: jest.fn().mockResolvedValue({
          id: '1',
          title: 'Updated Title',
          content: 'Updated Content',
        }),
      }
      documentUseCasesFactory.getUpdateDocumentUseCaseInstance.mockReturnValue(
        updateDocumentUseCase as any,
      )

      const result = await controller.update('1', { title: 'Updated Title' })

      expect(findOneDocumentUseCase.execute).toHaveBeenCalledWith('1')
      expect(updateDocumentUseCase.execute).toHaveBeenCalledWith('1', {
        title: 'Updated Title',
      })
      expect(result).toEqual({
        id: '1',
        title: 'Updated Title',
        content: 'Updated Content',
      })
    })
  })

  describe('remove', () => {
    it('should remove a document', async () => {
      const findOneDocumentUseCase = {
        execute: jest.fn().mockResolvedValue({ id: '1', title: 'fake' }),
      }
      documentUseCasesFactory.getFindOneDocumentUseCaseInstance.mockReturnValue(
        findOneDocumentUseCase as any,
      )

      const removeDocumentUseCase = {
        execute: jest.fn().mockResolvedValue({ id: '1' }),
      }
      documentUseCasesFactory.getRemoveDocumentUseCaseInstance.mockReturnValue(
        removeDocumentUseCase as any,
      )

      const result = await controller.remove('1')

      expect(findOneDocumentUseCase.execute).toHaveBeenCalledWith('1')
      expect(removeDocumentUseCase.execute).toHaveBeenCalledWith('1')
      expect(result).toEqual({ id: '1' })
    })
  })
})
