import { Injectable } from '@nestjs/common'
import pdfParse from 'pdf-parse'
import ProcessingDocument from '../contracts/processing-document.interface'
import { ExtractedDocumentProps } from '@/contracts/extracted-document.props'
import { DocumentoConteudoInvalidoException } from '@/errors/document/documento-conteudo-invalido.exception'
import { DocumentoTituloInvalidoException } from '@/errors/document/documento-titulo-invalido.exception'
import { DocumentoPdfInvalidoException } from '@/errors/document/documento-pdf-invalido.exception'

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
