import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '@/services/auth.service'
import { ClientModule } from '@/modules/client.module'
import { JwtService } from '@nestjs/jwt'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientModule],
      providers: [AuthService, JwtService],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
