import { Request, Response } from "express";

type HandlerResult = "failed" | "succeed" | "not_found" | "conflict";

export type Validator<T> = (
  requestbody: Record<string, unknown | undefined>
) => T | null;

type Handler<T> = (data: T) => Promise<HandlerResult>;

const HttpStatusCodeMap: Record<string, number> = {
  failed: 500,
  conflict: 409,
  not_found: 404,
  succeed: 200,
};

export const createRoute = <T>(
  validator: Validator<T>,
  handler: Handler<T>
) => {
  return async (req: Request, res: Response) => {
    const validationResult = validator(req.body);

    if (!validationResult) {
      res.sendStatus(400);
      return;
    }

    const handlerResult = await handler(validationResult);

    const code = HttpStatusCodeMap[handlerResult];

    res.sendStatus(code);
  };
};
