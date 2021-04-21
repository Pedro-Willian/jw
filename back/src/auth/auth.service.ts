import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CongregacaoRepository } from '~modules/congregacao/congregacao.repository';
import { Publicador } from '~modules/publicador/publicador.entity';
import { PublicadorRepository } from '~modules/publicador/publicador.repository';

@Injectable()
export class AuthService {
  constructor(
    private congregacaoRepository: CongregacaoRepository,
    private publicadorRepository: PublicadorRepository,
    private jwtService: JwtService,
  ) {}

  async validateCongregacaoPublicador(id: string, pass: string, pin: string) {
    const congregacao = await this.congregacaoRepository.findOne(id);
    if (!congregacao) return null;
    const user = await this.publicadorRepository.findByCongregacaoAndPin(
      congregacao.id,
      pin,
    );
    if (congregacao.senha === pass && user) return user;
    return null;
  }

  async login(publicador: Publicador) {
    const payload = { id: publicador.id, pin: publicador.pin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
