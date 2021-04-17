import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PublicadorService } from './publicador.service';

@Controller('publicador')
export class PublicadorController {
  constructor(private service: PublicadorService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  list() {
    return this.service.list();
  }
}
