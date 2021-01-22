import { EmailApiOutcome } from "./email-utils";
import { HandlerResult } from "./router";

type Obj = Record<string, unknown>;

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

    case EmailApiOutcome.UnknownError: {
      return "failed";
    }
  }
};
