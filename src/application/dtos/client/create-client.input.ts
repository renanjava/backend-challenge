import { ClientEntity } from '@/domain/entities/client.entity'

export class CreateClientInput implements ClientEntity {
  constructor(
    public email: string,
    public name: string,
    public password: string,
  ) {}
}
