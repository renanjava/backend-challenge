import { Test, TestingModule } from '@nestjs/testing'
import { PdfProcessingService } from '../../pdf-processing.service'
import * as pdfParse from 'pdf-parse'
import { DocumentModule } from '@/modules/document.module'
import { ClientModule } from '@/modules/client.module'
import { DocumentoPdfInvalidoException } from '@/errors/document/documento-pdf-invalido.exception'
import { DocumentoConteudoInvalidoException } from '@/errors/document/documento-conteudo-invalido.exception'
import { ConfigModule } from '@nestjs/config'

jest.mock('pdf-parse', () => ({
  __esModule: true,
  default: jest.fn(),
}))

const mockPdfParse = resolvedValue => {
  ;(pdfParse.default as jest.Mock).mockResolvedValue(resolvedValue)
}

describe('PdfProcessingService', () => {
  let service: PdfProcessingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DocumentModule, ClientModule, ConfigModule],
      providers: [PdfProcessingService],
    }).compile()

    service = module.get<PdfProcessingService>(PdfProcessingService)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('extractTitleAndContent', () => {
    it('should extract title and content from a valid PDF', async () => {
      const file = {
        mimetype: 'application/pdf',
        buffer: Buffer.from(''),
      } as Express.Multer.File
      const pdfData = {
        info: { Title: 'Test Title' },
        text: 'This is the content of the PDF.',
      }
      mockPdfParse(pdfData)

      const result = await service.extractTitleAndContent(file)

      expect(result).toEqual({
        title: 'Test Title',
        content: 'This is the content of the PDF.',
      })
    })

    it('should throw BadRequestException if file is not a PDF', async () => {
      const file = {
        mimetype: 'text/plain',
        buffer: Buffer.from(''),
      } as Express.Multer.File

      await expect(service.extractTitleAndContent(file)).rejects.toThrow(
        DocumentoPdfInvalidoException,
      )
    })

    it('should throw BadRequestException if PDF has no content', async () => {
      const file = {
        mimetype: 'application/pdf',
        buffer: Buffer.from(''),
      } as Express.Multer.File
      const pdfData = {
        info: { Title: 'Test Title' },
        text: '',
      }
      mockPdfParse(pdfData)

      await expect(service.extractTitleAndContent(file)).rejects.toThrow(
        DocumentoConteudoInvalidoException,
      )
    })
  })
})
