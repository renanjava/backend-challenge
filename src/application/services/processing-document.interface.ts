import { ExtractedDocumentProps } from '@/application/services/extracted-document.props'

export default interface ProcessingDocument {
  extractTitleAndContent(data: any): Promise<ExtractedDocumentProps>
}
