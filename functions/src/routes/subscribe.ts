import validator from "validator";
import { addSubscriberTomailingList } from "../email";
import { createRoute, Validator } from "../router";
import { intoHandlerResult } from "../utils";

const emailValidator: Validator<string> = ({ email }) =>
  typeof email === "string" && validator.isEmail(email) ? email : null;

export default createRoute(emailValidator, (email) =>
  addSubscriberTomailingList(email.toLowerCase()).then(intoHandlerResult)
);
