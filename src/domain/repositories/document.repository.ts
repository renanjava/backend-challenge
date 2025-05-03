export interface IDocumentRepository<T> {
  document(where: any): Promise<T | null>
  documents(params: any): Promise<T[]>
  createDocument(data: any): Promise<T>
  updateDocument(params: any): Promise<T>
  deleteDocument(where: any): Promise<T>
}
