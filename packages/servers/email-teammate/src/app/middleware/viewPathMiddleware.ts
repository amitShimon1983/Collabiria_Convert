import path from 'path';
import express, { Application, NextFunction, Request, Response } from 'express';
export type ViewPathMiddlewareOptions = {
  clientAppBaseName: string | undefined;
};

export default (app: Application, options: ViewPathMiddlewareOptions) => {
  const { clientAppBaseName } = options;

  // treat the index.html as a template and substitute the value at runtime
  const isTabRequest = (req: Request) =>
    path.join(
      __dirname,
      '../../../',
      req.path.includes(clientAppBaseName as string) ? (clientAppBaseName as string) : 'collabria'
    );

  return (req: Request, res: Response, next: NextFunction) => {
    const buildPath = isTabRequest(req);
    app.set('views', buildPath);
    app.use(express.static(path.join(buildPath, 'static')));

    next();
  };
};
