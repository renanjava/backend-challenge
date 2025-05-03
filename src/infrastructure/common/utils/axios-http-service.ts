import { IHttpService } from '@/application/common/utils/http-service.interface'
import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class AxiosHttpService implements IHttpService {
  constructor(private readonly httpService: HttpService) {}
  public get(url: string) {
    return this.httpService.get(url)
  }
}
