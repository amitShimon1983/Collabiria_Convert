import { AuthenticationError } from 'apollo-server-errors';
import { authenticationService } from '../services';

export const initContext =
  async () =>
  async ({ req, res, event }: { req: any; res: any; event: any }): Promise<any> => {
    if (!req?.cookies?.token?.token) {
      throw new AuthenticationError('consent_required');
    }
    const data: any = await authenticationService.authenticateUser({
      token: req?.cookies?.token?.token,
    });
    if (data?.payload?.cookie) {
      authenticationService.setCookie(res, data.payload.cookie);
      delete data.payload.cookie;
    }
    return {
      event,
      user: data.payload,
      token: data.payload.token,
      req,
      res,
    };
  };
