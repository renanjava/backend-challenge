import { IHttpService } from '@/application/common/utils/http-service.interface'
import { IPdfProcessing } from '@/application/common/utils/pdf-processing.interface'
import { IObservableToPromise } from '@/application/common/utils/observable-to-promise.interface'
import { IWebProcessing } from '@/application/common/utils/web-processing.interface'
import { PdfProcessingUseCase } from '@/application/usecases/documents/pdf-processing.use-case'
import { WebProcessingUseCase } from '@/application/usecases/documents/web-processing.use-case'
import { Inject, Injectable } from '@nestjs/common'
import { CreateDocumentUseCase } from '@/application/usecases/documents/create-document.use-case'
import { DocumentEntity } from '@/domain/entities/document.entity'
import { IDocumentRepository } from '@/domain/repositories/document.repository'
import { UpdateDocumentUseCase } from '@/application/usecases/documents/update-document.use-case'
import { FindAllDocumentsUseCase } from '@/application/usecases/documents/find-all-documents.use-case'
import { FindOneDocumentUseCase } from '@/application/usecases/documents/find-one-document.use-case'
import { RemoveDocumentUseCase } from '@/application/usecases/documents/remove-document.use-case'

@Injectable()
export class DocumentUseCasesFactory {
  constructor(
    @Inject('PdfParseImpl')
    private readonly pdfProcessing: IPdfProcessing,
    @Inject('CheerioImpl')
    private readonly webProcessing: IWebProcessing,
    @Inject('AxiosImpl')
    private readonly httpService: IHttpService,
    @Inject('RxjsImpl')
    private readonly observableToPromise: IObservableToPromise,
    @Inject('DocumentRepositoryImpl')
    private readonly documentRepository: IDocumentRepository<DocumentEntity>,
  ) {}

  getPdfProcessingUseCaseInstance(): PdfProcessingUseCase {
    return new PdfProcessingUseCase(this.pdfProcessing)
  }

  getWebProcessingUseCaseInstance(): WebProcessingUseCase {
    return new WebProcessingUseCase(
      this.webProcessing,
      this.httpService,
      this.observableToPromise,
    )
  }

  getCreateDocumentUseCaseInstance(): CreateDocumentUseCase {
    return new CreateDocumentUseCase(this.documentRepository)
  }

  getFindOneDocumentUseCaseInstance(): FindOneDocumentUseCase {
    return new FindOneDocumentUseCase(this.documentRepository)
  }

  getFindAllDocumentsUseCaseInstance(): FindAllDocumentsUseCase {
    return new FindAllDocumentsUseCase(this.documentRepository)
  }

  getUpdateDocumentUseCaseInstance(): UpdateDocumentUseCase {
    return new UpdateDocumentUseCase(this.documentRepository)
  }

  getRemoveDocumentUseCaseInstance(): RemoveDocumentUseCase {
    return new RemoveDocumentUseCase(this.documentRepository)
  }
}
