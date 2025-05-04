import { HttpExceptionFilter } from '@/infrastructure/common/filters/global-exception.filter'
import { HttpException, HttpStatus } from '@nestjs/common'
import { ArgumentsHost } from '@nestjs/common/interfaces'

describe('GlobalExceptionFilter', () => {
  let filter: HttpExceptionFilter

  beforeEach(() => {
    filter = new HttpExceptionFilter()
  })

  it('should handle HttpException and return proper response', () => {
    const mockException = new HttpException('Forbidden', HttpStatus.FORBIDDEN)

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    const mockRequest = { url: '/test' }
    const mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue(mockResponse),
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ArgumentsHost

    filter.catch(mockException, mockHost)

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.FORBIDDEN)
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Forbidden',
        path: '/test',
        timestamp: expect.any(String),
      }),
    )
  })

  it('should handle non-HttpException and return internal server error', () => {
    const mockException = new Error('Unexpected error')

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    const mockRequest = { url: '/test' }
    const mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue(mockResponse),
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ArgumentsHost

    filter.catch(mockException, mockHost)

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    )
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Erro interno no servidor',
        path: '/test',
        timestamp: expect.any(String),
      }),
    )
  })
})
