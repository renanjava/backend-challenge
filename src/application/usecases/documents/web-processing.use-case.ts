import { IHttpService } from '@/application/common/utils/http-service.interface'
import { IRxjs } from '@/application/common/utils/rxjs.interface'
import { IWebProcessing } from '@/application/common/utils/web-processing.interface'
import { DocumentoConteudoInvalidoError } from '@/application/errors/documents/documento-conteudo-invalido.error'
import { DocumentoTituloInvalidoError } from '@/application/errors/documents/documento-titulo-invalido.error'
import { ExtractedDocumentProps } from '@/application/services/extracted-document.props'
import { IUseCase } from '@/application/usecases/use-case.interface'

export class WebProcessingUseCase implements IUseCase {
  constructor(
    private readonly webProcessing: IWebProcessing,
    private readonly httpService: IHttpService,
    private readonly rxjs: IRxjs,
  ) {}
  async execute(url: string): Promise<ExtractedDocumentProps> {
    const response = await this.rxjs.lastValueFrom(this.httpService.get(url))

    const $ = this.webProcessing.load(response.data)

    const title = $('title').text()
    const content = $('body').text()

    if (!content || content.trim() === '') {
      throw new DocumentoConteudoInvalidoError()
    }

    if (!title || title.trim() === 'Título não encontrado') {
      throw new DocumentoTituloInvalidoError()
    }

    return { title, content }
  }
}
