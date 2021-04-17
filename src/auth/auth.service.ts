import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Congregacao } from 'src/congregacao/congregacao.entity';
import { CongregacaoRepository } from 'src/congregacao/congregacao.repository';
import { PublicadorRepository } from 'src/publicador/publicador.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(CongregacaoRepository)
    private congregacaoRepository: CongregacaoRepository,
    private publicadorRepository: PublicadorRepository,
    private jwtService: JwtService,
  ) {}

  async validateCongregacao(id: string, pass: string, pin: string) {
    console.log(id, pass, pin);
    const congregacao = await this.congregacaoRepository.findOne(id);
    const user = await this.publicadorRepository.findByCongregacaoAndPin(
      congregacao.id,
      pin,
    );
    console.log(user);
    if (congregacao && congregacao.senha === pass && user) return congregacao;
    return null;
  }

  async login(congregacao: Congregacao) {
    const payload = { username: congregacao.id, sub: congregacao.nome };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
