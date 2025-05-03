import ProcessingDocument from '@/application/services/processing-document.interface'
import { ExtractedDocumentProps } from '@/application/services/extracted-document.props'
import { DocumentoConteudoInvalidoException } from '@/infrastructure/errors/document/documento-conteudo-invalido.exception'
import { DocumentoTituloInvalidoException } from '@/infrastructure/errors/document/documento-titulo-invalido.exception'
import { DocumentoPdfInvalidoException } from '@/infrastructure/errors/document/documento-pdf-invalido.exception'
import { Injectable } from '@nestjs/common'
import pdfParse from 'pdf-parse'

@Injectable()
export class PdfProcessingService implements ProcessingDocument {
  async extractTitleAndContent(
    file: Express.Multer.File,
  ): Promise<ExtractedDocumentProps> {
    if (!file.mimetype || file.mimetype !== 'application/pdf') {
      throw new DocumentoPdfInvalidoException(file.mimetype)
    }

    const data = await pdfParse(file.buffer)
    const title = data.info.Title || 'Título não encontrado'
    const content = data.text

    if (!content || content.trim() === '') {
      throw new DocumentoConteudoInvalidoException()
    }

    if (!title || title.trim() === 'Título não encontrado') {
      throw new DocumentoTituloInvalidoException()
    }

    return { title, content } as ExtractedDocumentProps
  }
}
