import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '~auth/jwt-auth.guard';
import { AuthService } from '~auth/auth.service';
import { LocalAuthGuard } from '~auth/local-auth.guard';
import { GetAuthenticatedUser } from '~auth/current-user';
import { PublicadorRepository } from '~modules/publicador/publicador.repository';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private publicadorRepository: PublicadorRepository,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/validate')
  async validate(@GetAuthenticatedUser() user) {
    return this.publicadorRepository.findById(user.userId);
  }
}
