import { ExtractedDocumentProps } from '@/application/contracts/extracted-document.props'

export default interface ProcessingDocument {
  extractTitleAndContent(data: any): Promise<ExtractedDocumentProps>
}
