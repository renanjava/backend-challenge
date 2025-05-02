import { ExtractedDocumentProps } from './extracted-document.props'

export default interface ProcessingDocument {
  extractTitleAndContent(data: any): Promise<ExtractedDocumentProps>
}
