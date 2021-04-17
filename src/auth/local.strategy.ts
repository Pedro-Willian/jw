import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'id' });
  }

  async validate(id: string, password: string) {
    console.log(id, password, 'aqui');
    const [congregacaoId, pin] = id.split('#');
    const congregacao = await this.authService.validateCongregacao(
      congregacaoId,
      password,
      pin,
    );
    //console.log(congregacao);
    if (!congregacao) {
      throw new UnauthorizedException();
    }
    return congregacao;
  }
}
