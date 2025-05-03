/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ExtractedDocumentProps } from '@/application/contracts/extracted-document.props'
import ProcessingDocument from '@/application/contracts/processing-document.interface'
import { DocumentoTituloInvalidoException } from '@/infrastructure/errors/document/documento-titulo-invalido.exception'
import { DocumentoConteudoInvalidoException } from '@/infrastructure/errors/document/documento-conteudo-invalido.exception'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { lastValueFrom } from 'rxjs'
import * as cheerio from 'cheerio'

@Injectable()
export class WebProcessingService implements ProcessingDocument {
  constructor(private readonly httpService: HttpService) {}
  async extractTitleAndContent(url: string): Promise<ExtractedDocumentProps> {
    const response = await lastValueFrom(this.httpService.get(url))

    const $ = cheerio.load(response.data)

    const title = $('title').text()
    const content = $('body').text()

    if (!content || content.trim() === '') {
      throw new DocumentoConteudoInvalidoException()
    }

    if (!title || title.trim() === 'Título não encontrado') {
      throw new DocumentoTituloInvalidoException()
    }

    return { title, content }
  }
}
