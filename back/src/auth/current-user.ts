import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Publicador } from '~modules/publicador/publicador.entity';

export const GetAuthenticatedUser = createParamDecorator(
  (data, ctx: ExecutionContext): Publicador => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
