import { IPdfProcessing } from '@/application/common/utils/pdf-processing.interface'
import { DocumentoConteudoInvalidoError } from '@/application/errors/documents/documento-conteudo-invalido.error'
import { DocumentoPdfInvalidoError } from '@/application/errors/documents/documento-pdf-invalido.error'
import { DocumentoTituloInvalidoError } from '@/application/errors/documents/documento-titulo-invalido.error'
import { ExtractedDocumentProps } from '@/application/services/extracted-document.props'
import { IUseCase } from '@/application/usecases/use-case.interface'

export class PdfProcessingUseCase implements IUseCase {
  constructor(private readonly pdfProcessing: IPdfProcessing) {}
  async execute(file: Express.Multer.File): Promise<ExtractedDocumentProps> {
    if (!file.mimetype || file.mimetype !== 'application/pdf') {
      throw new DocumentoPdfInvalidoError(file.mimetype)
    }

    const data = await this.pdfProcessing.parse(file.buffer)
    const title = data.info.Title || 'Título não encontrado'
    const content = data.text

    if (!content || content.trim() === '') {
      throw new DocumentoConteudoInvalidoError()
    }

    if (!title || title.trim() === 'Título não encontrado') {
      throw new DocumentoTituloInvalidoError()
    }

    return { title, content } as ExtractedDocumentProps
  }
}
