import { Module } from '@nestjs/common'
import { DocumentService } from '@/services/document.service'
import { DocumentController } from '@/controllers/document.controller'
import { DocumentRepository } from '@/repositories/document.repository'
import { DatabaseModule } from '@/config/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [DocumentController],
  providers: [DocumentService, DocumentRepository],
})
export class DocumentModule {}
