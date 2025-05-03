import { DocumentService } from '@/infrastructure/services/document.service'
import { DocumentController } from '@/infrastructure/controllers/document.controller'
import { DocumentRepository } from '@/infrastructure/repositories/document.repository'
import { DatabaseModule } from '@/infrastructure/modules/database.module'
import { ClientModule } from './client.module'
import { PdfProcessingService } from '@/infrastructure/services/pdf-processing.service'
import { WebProcessingService } from '@/infrastructure/services/web-processing.service'
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
    DocumentService,
    DocumentRepository,
    PdfProcessingService,
    WebProcessingService,
  ],
  exports: [DocumentRepository, DocumentService],
})
export class DocumentModule {}
