import { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

export type CorsMiddlewareOptions = {
  allowedOrigins: string[];
  xFrameOption: string;
};

const corsOptions = (whiteList: string[]) => {
  return (req: any, callback: any) => {
    const getOriginValue = () => {
      return whiteList.find(origin => origin === req.header('origin'));
    };
    const corsOptions = {
      origin: getOriginValue(),
      credentials: true,
    };
    callback(null, corsOptions);
  };
};

export default (app: Application, options: CorsMiddlewareOptions) => {
  const { allowedOrigins, xFrameOption } = options;
  if (allowedOrigins && allowedOrigins.length) {
    app.use('*', cors(corsOptions(allowedOrigins)));
    app.options('*', cors(corsOptions(allowedOrigins)));
  }

  return (req: Request, res: Response, next: NextFunction) => {
    res.setHeader(
      'X-Frame-Options',
      `ALLOW-FROM teams.microsoft.com, login.microsoftonline.com, ${xFrameOption}, localhost:3978`
    );
    res.setHeader(
      'Content-Security-Policy',
      `frame-ancestors teams.microsoft.com *.teams.microsoft.com *.skype.com ${xFrameOption} localhost:3978`
    );
    if (req.headers.origin && allowedOrigins?.includes(req.headers.origin)) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin as string);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, *');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Cache-Control', 'no-store,no-cache,must-revalidate');
    res.header('Vary', 'Origin');
    return next();
  };
};
