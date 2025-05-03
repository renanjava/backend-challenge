import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { ClienteNaoEncontradoError } from '@/application/errors/client/cliente-nao-encontrado.error'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Erro interno no servidor'

    if (exception instanceof ClienteNaoEncontradoError) {
      status = HttpStatus.NOT_FOUND
      message = exception.message
    }

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const responseBody = exception.getResponse()
      message =
        typeof responseBody === 'string'
          ? responseBody
          : (responseBody as any).message || message
    }

    response.status(status).json({
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
