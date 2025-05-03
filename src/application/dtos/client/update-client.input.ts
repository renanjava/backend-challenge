import { ClientEntity } from '@/domain/entities/client.entity'

export class UpdateClientInput implements Partial<ClientEntity> {
  name?: string
  email?: string
  password?: string
}
