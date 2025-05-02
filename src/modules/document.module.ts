import { Module } from '@nestjs/common'
import { DocumentService } from '@/services/document.service'
import { DocumentController } from '@/controllers/document.controller'
import { DocumentRepository } from '@/repositories/document.repository'
import { DatabaseModule } from '@/modules/database.module'
import { ClientModule } from './client.module'
import { PdfProcessingService } from '@/services/pdf-processing.service'
import { HttpModule } from '@nestjs/axios'
import { WebProcessingService } from '@/services/web-processing.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [DatabaseModule, ClientModule, HttpModule, JwtModule, ConfigModule],
  controllers: [DocumentController],
  providers: [
    DocumentService,
    DocumentRepository,
    PdfProcessingService,
    WebProcessingService,
  ],
  exports: [DocumentRepository],
})
export class DocumentModule {}
