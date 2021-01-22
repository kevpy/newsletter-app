import { Request, Response } from "express";
import validator from "validator";
import { addSubscriberTomailingList } from "../email";

export default (req: Request, res: Response) => {
  if (
    typeof req.body.email !== "string" ||
    !validator.isEmail(req.body.email)
  ) {
    res.sendStatus(400);
    return;
  }

  const subscriberEmail = (req.body.email as string).toLowerCase();

  addSubscriberTomailingList(subscriberEmail)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
};
