export interface IClientController<E, T, R> {
  create(createDto: E, pipe: any): Promise<R>
  findAllDocumentsByClient(request: any): Promise<any[]>
  findOneDocumentByClient(id: string, request: any): Promise<any[]>
  findAll(): Promise<R[]>
  findOne(id: string): Promise<R>
  update(id: string, updateDto: T): Promise<R>
  remove(id: string): Promise<R>
}
