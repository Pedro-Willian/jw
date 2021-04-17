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
    const [congregacaoId, pin] = id.split('#');
    if (!congregacaoId || !pin) throw new UnauthorizedException();

    const congregacao = await this.authService.validateCongregacao(
      congregacaoId,
      password,
      pin,
    );
    if (!congregacao) throw new UnauthorizedException();

    return congregacao;
  }
}
