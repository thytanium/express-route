import express, { RequestHandler } from "express";

export const router = express.Router();

export function catchErrors(handler: RequestHandler) {
  return async function (req, res, next): Promise<void> {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  } as RequestHandler;
}

type HttpMethod =
  | "checkout"
  | "copy"
  | "delete"
  | "get"
  | "head"
  | "lock"
  | "merge"
  | "mkactivity"
  | "mkcol"
  | "move"
  | "m-search"
  | "notify"
  | "options"
  | "patch"
  | "post"
  | "purge"
  | "put"
  | "report"
  | "search"
  | "subscribe"
  | "trace"
  | "unlock"
  | "unsubscribe";

export function route(
  method: HttpMethod,
  path: string,
  ...handlers: RequestHandler[]
): express.Router {
  const handler = handlers.slice(-1)[0];
  const middleware = handlers.slice(0, -1);

  router[method](path, ...middleware, catchErrors(handler));

  return router;
}
