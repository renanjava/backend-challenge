export interface IClientRepository<T> {
  client(where: any): Promise<T | null>
  clients(params: any): Promise<T[]>
  createClient(data: any): Promise<T>
  updateClient(params: any): Promise<T>
  deleteClient(where: any): Promise<T>
}
