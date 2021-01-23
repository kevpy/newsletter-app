import { sendNewsletter } from "../email";
import { createRoute, Validator } from "../router";
import { intoHandlerResult, isString } from "../utils";

interface SendNewsletter {
  body: string;
  subject: string;
}

const validator: Validator<SendNewsletter> = ({ body, subject }) =>
  isString(body) && isString(subject) ? { body, subject } : null;

export default createRoute(validator, ({ body, subject }) =>
  sendNewsletter(body, subject).then(intoHandlerResult)
);
