import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Congregacao } from '~modules/congregacao/congregacao.entity';
import { CongregacaoRepository } from '~modules/congregacao/congregacao.repository';
import { PublicadorRepository } from '~modules/publicador/publicador.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(CongregacaoRepository)
    private congregacaoRepository: CongregacaoRepository,
    private publicadorRepository: PublicadorRepository,
    private jwtService: JwtService,
  ) {}

  async validateCongregacao(id: string, pass: string, pin: string) {
    const congregacao = await this.congregacaoRepository.findOne(id);
    if (!congregacao) return null;
    const user = await this.publicadorRepository.findByCongregacaoAndPin(
      congregacao.id,
      pin,
    );
    if (congregacao.senha === pass && user) return congregacao;
    return null;
  }

  async login(congregacao: Congregacao) {
    const payload = { username: congregacao.id, sub: congregacao.nome };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
