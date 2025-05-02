import { Injectable, PipeTransform } from '@nestjs/common'
import { Password } from '@/common/utils/Password'

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(password: string) {
    return await Password.hash(password, 10)
  }
}
