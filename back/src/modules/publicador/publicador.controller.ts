import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '~auth/jwt-auth.guard';
import { PublicadorService } from './publicador.service';

@Controller('publicador')
@UseGuards(JwtAuthGuard)
export class PublicadorController {
  constructor(private service: PublicadorService) {}

  @Get()
  list() {
    return this.service.list();
  }
}
