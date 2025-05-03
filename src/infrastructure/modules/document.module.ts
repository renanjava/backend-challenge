import { DocumentController } from '@/infrastructure/controllers/document.controller'
import { DocumentRepository } from '@/infrastructure/repositories/document.repository'
import { DatabaseModule } from '@/infrastructure/modules/database.module'
import { ClientModule } from '@/infrastructure/modules/client.module'
import { PdfParseImpl } from '@/infrastructure/common/utils/pdf-parse-impl'
import { DocumentUseCasesFactory } from '@/infrastructure/factories/document-use-cases.factory'
import { RxjsImpl } from '@/infrastructure/common/utils/rxjs-impl'
import { AxiosImpl } from '@/infrastructure/common/utils/axios-impl'
import { CheerioImpl } from '@/infrastructure/common/utils/cheerio-impl'
import { HttpModule } from '@nestjs/axios'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { forwardRef, Module } from '@nestjs/common'

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
    DocumentRepository,
    DocumentUseCasesFactory,
    PdfParseImpl,
    { provide: 'PdfParseImpl', useExisting: PdfParseImpl },
    { provide: 'RxjsImpl', useClass: RxjsImpl },
    { provide: 'AxiosImpl', useClass: AxiosImpl },
    { provide: 'CheerioImpl', useClass: CheerioImpl },
    { provide: 'DocumentRepositoryImpl', useExisting: DocumentRepository },
  ],
  exports: [DocumentRepository, DocumentUseCasesFactory, PdfParseImpl],
})
export class DocumentModule {}
