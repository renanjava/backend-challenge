import { AuthController } from '@/infrastructure/controllers/auth.controller'
import { ClientModule } from '@/infrastructure/modules/client.module'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthModule } from '@/infrastructure/modules/auth.module'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientModule, AuthModule],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
