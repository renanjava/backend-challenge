/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { IRxjs } from '@/application/common/utils/rxjs.interface'
import { Injectable } from '@nestjs/common'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class RxjsImpl implements IRxjs {
  async lastValueFrom(axiosResponseUrl: any): Promise<unknown> {
    return await lastValueFrom(axiosResponseUrl)
  }
}
