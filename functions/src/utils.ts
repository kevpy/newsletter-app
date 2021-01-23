import validator from "validator";
import { EmailApiOutcome } from "./email-utils";
import { HandlerResult, Validator } from "./router";

type Obj = Record<string, unknown>;

export const isString = (val: unknown): val is string =>
  typeof val === "string";

export const emailValidator: Validator<string> = ({ email }) =>
  typeof email === "string" && validator.isEmail(email) ? email : null;

export const isObject = (val: unknown): val is Obj =>
  typeof val === "object" && val !== null;

export const intoHandlerResult = (outcome: EmailApiOutcome): HandlerResult => {
  switch (outcome) {
    case EmailApiOutcome.Success: {
      return "succeed";
    }

    case EmailApiOutcome.Conflict: {
      return "conflict";
    }

    case EmailApiOutcome.NotFound: {
      return "not_found";
    }

    case EmailApiOutcome.UnknownError: {
      return "failed";
    }
  }
};
