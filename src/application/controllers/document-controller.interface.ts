export interface IDocumentController<T, U, R> {
  createPdfDocument(file: any, request: any): Promise<R>
  createWebDocument(createDto: T, request: any): Promise<R>
  findAll(): Promise<R[]>
  findOne(id: string): Promise<R>
  update(id: string, updateDto: U): Promise<R>
  remove(id: string): Promise<R>
}
