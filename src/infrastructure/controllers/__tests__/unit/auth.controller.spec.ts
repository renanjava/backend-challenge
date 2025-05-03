import { AuthController } from '@/infrastructure/controllers/auth.controller'
import { AuthService } from '@/infrastructure/services/auth.service'
import { ClientModule } from '@/infrastructure/modules/client.module'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientModule],
      controllers: [AuthController],
      providers: [AuthService, JwtService],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
