import { IHttpService } from '@/application/common/utils/http-service.interface'
import { IPdfProcessing } from '@/application/common/utils/pdf-processing.interface'
import { IRxjs } from '@/application/common/utils/rxjs.interface'
import { IWebProcessing } from '@/application/common/utils/web-processing.interface'
import { PdfProcessingUseCase } from '@/application/usecases/documents/pdf-processing.use-case'
import { WebProcessingUseCase } from '@/application/usecases/documents/web-processing.use-case'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class DocumentUseCasesFactory {
  constructor(
    @Inject('PdfParse')
    private readonly pdfProcessing: IPdfProcessing,
    @Inject('CheerioImpl')
    private readonly webProcessing: IWebProcessing,
    @Inject('AxiosHttpService')
    private readonly httpService: IHttpService,
    @Inject('RxjsImpl')
    private readonly rxjs: IRxjs,
  ) {}

  getPdfProcessingUseCaseInstance(): PdfProcessingUseCase {
    return new PdfProcessingUseCase(this.pdfProcessing)
  }

  getWebProcessingUseCaseInstance(): WebProcessingUseCase {
    return new WebProcessingUseCase(
      this.webProcessing,
      this.httpService,
      this.rxjs,
    )
  }
}
