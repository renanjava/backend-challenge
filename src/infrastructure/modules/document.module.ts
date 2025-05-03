import { DocumentService } from '@/infrastructure/services/document.service'
import { DocumentController } from '@/infrastructure/controllers/document.controller'
import { DocumentRepository } from '@/infrastructure/repositories/document.repository'
import { DatabaseModule } from '@/infrastructure/modules/database.module'
import { ClientModule } from '@/infrastructure/modules/client.module'
import { PdfProcessingService } from '@/infrastructure/services/pdf-processing.service'
import { WebProcessingService } from '@/infrastructure/services/web-processing.service'
import { PdfParseImpl } from '@/infrastructure/common/utils/pdf-parse-impl'
import { DocumentUseCasesFactory } from '@/infrastructure/factories/documents/document-use-cases.factory'
import { HttpModule } from '@nestjs/axios'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { forwardRef, Module } from '@nestjs/common'
import { RxjsImpl } from '@/infrastructure/common/utils/rxjs-impl'
import { AxiosImpl } from '@/infrastructure/common/utils/axios-impl'
import { CheerioImpl } from '@/infrastructure/common/utils/cheerio-impl'

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => ClientModule),
    HttpModule,
    JwtModule,
    ConfigModule,
  ],
  controllers: [DocumentController],
  providers: [
    DocumentService,
    DocumentRepository,
    PdfProcessingService,
    WebProcessingService,
    DocumentUseCasesFactory,
    PdfParseImpl,
    { provide: 'PdfParseImpl', useExisting: PdfParseImpl },
    { provide: 'RxjsImpl', useClass: RxjsImpl },
    { provide: 'AxiosImpl', useClass: AxiosImpl },
    { provide: 'CheerioImpl', useClass: CheerioImpl },
  ],
  exports: [
    DocumentRepository,
    DocumentService,
    DocumentUseCasesFactory,
    PdfParseImpl,
  ],
})
export class DocumentModule {}
