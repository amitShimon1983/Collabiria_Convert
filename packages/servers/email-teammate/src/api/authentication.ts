import { Router, Request, Response } from 'express';
import { authenticationService } from '../services';

export default (router: Router) => {
  router.post('/api/graph/auth-return', async (req: Request, res: Response) => {
    const data = await authenticationService.getTokenFromCode(
      req?.body?.code,
      req?.body?.redirectUri,
      req?.body?.userGeography
    );
    if (data.error) {
      res.send({ ...data.error });
    } else {
      authenticationService.setCookie(res, data.token);
      res.send({ isAuthenticate: true, isNewUser: data?.isNewUser, userDetailsToken: data.userDetailsToken });
    }
  });

  router.get('/api/refresh', async (req: Request, res: Response) => {
    const { payload } = await authenticationService.authenticateUser({
      token: req?.cookies?.token?.token,
    });
    if (payload?.cookie) {
      authenticationService.setCookie(res, payload.cookie);
      res.send({ refresh: true, userDetailsToken: payload?.userDetailsToken });
      return;
    }
    res.send({ refresh: false, userDetailsToken: payload?.userDetailsToken });
  });

  router.get('/api/logout', async (req: Request, res: Response) => {
    authenticationService.clearCookie(res);
    res.send({ isAuthenticate: false });
  });
};
