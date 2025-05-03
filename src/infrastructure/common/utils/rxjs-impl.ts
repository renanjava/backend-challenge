/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { IObservableToPromise } from '@/application/common/utils/observable-to-promise.interface'
import { Injectable } from '@nestjs/common'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class RxjsImpl implements IObservableToPromise {
  async parse(observable: any): Promise<any> {
    return await lastValueFrom(observable)
  }
}
