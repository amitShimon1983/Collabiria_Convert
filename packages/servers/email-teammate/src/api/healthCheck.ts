import { Router, Request, Response } from 'express';

export default (router: Router) => {
  router.get('/health-check', async (req: Request, res: Response) => {
    res.status(200).send();
  });
};
