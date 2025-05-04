/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { PdfProcessingUseCase } from '@/application/usecases/documents/pdf-processing.use-case'
import { DocumentoPdfInvalidoError } from '@/application/errors/documents/documento-pdf-invalido.error'
import { DocumentoConteudoInvalidoError } from '@/application/errors/documents/documento-conteudo-invalido.error'

describe('PdfProcessingUseCase', () => {
  let useCase: PdfProcessingUseCase
  let mockPdfProcessing: any

  beforeEach(() => {
    mockPdfProcessing = {
      parse: jest.fn(),
    }
    useCase = new PdfProcessingUseCase(mockPdfProcessing)
  })

  it('should process a valid PDF and return extracted data', async () => {
    const file = { mimetype: 'application/pdf', buffer: Buffer.from('test') }
    const parsedData = { info: { Title: 'Test PDF' }, text: 'PDF Content' }
    mockPdfProcessing.parse.mockResolvedValue(parsedData)

    const result = await useCase.execute(file as any)

    expect(mockPdfProcessing.parse).toHaveBeenCalledWith(file.buffer)
    expect(result).toEqual({ title: 'Test PDF', content: 'PDF Content' })
  })

  it('should throw DocumentoPdfInvalidoError if file is not a PDF', async () => {
    const file = { mimetype: 'text/plain', buffer: Buffer.from('test') }

    await expect(useCase.execute(file as any)).rejects.toThrow(
      DocumentoPdfInvalidoError,
    )
  })

  it('should throw DocumentoConteudoInvalidoError if PDF content is invalid', async () => {
    const file = { mimetype: 'application/pdf', buffer: Buffer.from('test') }
    const parsedData = { info: { Title: 'Test PDF' }, text: '' }
    mockPdfProcessing.parse.mockResolvedValue(parsedData)

    await expect(useCase.execute(file as any)).rejects.toThrow(
      DocumentoConteudoInvalidoError,
    )
  })
})
