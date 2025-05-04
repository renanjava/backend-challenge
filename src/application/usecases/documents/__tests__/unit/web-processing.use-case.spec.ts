/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { DocumentoConteudoInvalidoError } from '@/application/errors/documents/documento-conteudo-invalido.error'
import { WebProcessingUseCase } from '@/application/usecases/documents/web-processing.use-case'

describe('WebProcessingUseCase', () => {
  let useCase: WebProcessingUseCase
  let mockWebProcessing: any
  let mockHttpService: any
  let mockObservableToPromise: any

  beforeEach(() => {
    mockWebProcessing = { load: jest.fn() }
    mockHttpService = { get: jest.fn() }
    mockObservableToPromise = { parse: jest.fn() }
    useCase = new WebProcessingUseCase(
      mockWebProcessing,
      mockHttpService,
      mockObservableToPromise,
    )
  })

  it('should process a web document and return extracted data', async () => {
    const url = 'http://example.com'
    const response = {
      data: '<html><title>Test</title><body>Content</body></html>',
    }

    const $ = jest.fn().mockImplementation((selector: string) => {
      if (selector === 'title') {
        return { text: () => 'Test' }
      }
      if (selector === 'body') {
        return { text: () => 'Content' }
      }
      return { text: () => '' }
    })

    mockHttpService.get.mockReturnValue(response)
    mockObservableToPromise.parse.mockResolvedValue(response)
    mockWebProcessing.load.mockReturnValue($)

    const result = await useCase.execute(url)

    expect(mockHttpService.get).toHaveBeenCalledWith(url)
    expect(result).toEqual({ title: 'Test', content: 'Content' })
  })

  it('should throw DocumentoConteudoInvalidoError if content is invalid', async () => {
    const url = 'http://example.com'
    const response = { data: '<html><title>Test</title><body></body></html>' }

    const $ = jest.fn().mockImplementation((selector: string) => {
      if (selector === 'title') {
        return { text: () => 'Test' }
      }
      if (selector === 'body') {
        return { text: () => '' }
      }
      return { text: () => '' }
    })

    mockHttpService.get.mockReturnValue(response)
    mockObservableToPromise.parse.mockResolvedValue(response)
    mockWebProcessing.load.mockReturnValue($)

    await expect(useCase.execute(url)).rejects.toThrow(
      DocumentoConteudoInvalidoError,
    )
  })
})
