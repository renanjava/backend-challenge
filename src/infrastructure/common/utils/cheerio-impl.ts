/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { IWebProcessing } from '@/application/common/utils/web-processing.interface'
import { Injectable } from '@nestjs/common'
import { load } from 'cheerio'

@Injectable()
export class CheerioImpl implements IWebProcessing {
  load(responseData: any) {
    return load(responseData)
  }
}
