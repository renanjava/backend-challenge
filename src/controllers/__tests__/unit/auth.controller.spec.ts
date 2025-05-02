import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from '../../auth.controller'
import { AuthService } from '@/services/auth.service'
import { ClientModule } from '@/modules/client.module'
import { JwtService } from '@nestjs/jwt'

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
