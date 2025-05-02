/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing'
import { DocumentService } from '../../document.service'
import { DocumentRepository } from '../../../repositories/document.repository'
import { DocumentoNaoEncontradoException } from '../../../errors/document/documento-nao-encontrado.exception'

describe('DocumentService', () => {
  let service: DocumentService
  let repository: jest.Mocked<DocumentRepository>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        {
          provide: DocumentRepository,
          useValue: {
            createDocument: jest.fn(),
            documents: jest.fn(),
            document: jest.fn(),
            updateDocument: jest.fn(),
            deleteDocument: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<DocumentService>(DocumentService)
    repository = module.get(DocumentRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create a document successfully', async () => {
      const createDocumentDto = {
        title: 'Test Document',
        content: 'This is a test document.',
        sourceType: 'PDF',
        clientId: '1',
      } as any
      repository.createDocument.mockResolvedValue(createDocumentDto)

      const result = await service.create(createDocumentDto)
      const { clientId, ...documentoDto } = createDocumentDto

      expect(repository.createDocument).toHaveBeenCalledWith({
        ...documentoDto,
        client: { connect: { id: '1' } },
      })
      expect(result).toEqual(createDocumentDto)
    })
  })

  describe('findAll', () => {
    it('should return all documents', async () => {
      const documents = [{ id: '1', title: 'Test Document' }]
      repository.documents.mockResolvedValue(documents as any)

      const result = await service.findAll()

      expect(repository.documents).toHaveBeenCalledWith({})
      expect(result).toEqual(documents)
    })
  })

  describe('findOne', () => {
    it('should return a document by id', async () => {
      const document = { id: '1', title: 'Test Document' }
      repository.document.mockResolvedValue(document as any)

      const result = await service.findOne('1')

      expect(repository.document).toHaveBeenCalledWith({ id: '1' })
      expect(result).toEqual(document)
    })

    it('should throw DocumentoNaoEncontradoException if document is not found', async () => {
      repository.document.mockResolvedValue(null)

      await expect(service.findOne('1')).rejects.toThrow(
        DocumentoNaoEncontradoException,
      )
      expect(repository.document).toHaveBeenCalledWith({ id: '1' })
    })
  })

  describe('update', () => {
    it('should update a document successfully', async () => {
      const updateDocumentDto = { title: 'Updated Title' }
      const document = { id: '1', title: 'Test Document' }
      repository.document.mockResolvedValue(document as any)
      repository.updateDocument.mockResolvedValue({
        ...document,
        ...updateDocumentDto,
      } as any)

      const result = await service.update('1', updateDocumentDto)

      expect(repository.document).toHaveBeenCalledWith({ id: '1' })
      expect(repository.updateDocument).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateDocumentDto,
      })
      expect(result).toEqual({ ...document, ...updateDocumentDto })
    })
  })

  describe('remove', () => {
    it('should remove a document successfully', async () => {
      const document = { id: '1', title: 'Test Document' }
      repository.document.mockResolvedValue(document as any)
      repository.deleteDocument.mockResolvedValue(document as any)

      const result = await service.remove('1')

      expect(repository.document).toHaveBeenCalledWith({ id: '1' })
      expect(repository.deleteDocument).toHaveBeenCalledWith({ id: '1' })
      expect(result).toEqual(document)
    })
  })
})
