import { ClientEntity } from '@/domain/entities/client.entity'

export class UpdateClientInput implements Partial<ClientEntity> {
  constructor(
    public name?: string,
    public email?: string,
    public password?: string,
  ) {}
}
