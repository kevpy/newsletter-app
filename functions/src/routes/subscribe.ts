import validator from "validator";
import { addSubscriberTomailingList } from "../email";
import { EmailApiOutcome } from "../email-utils";
import { createRoute, Validator } from "../router";

const emailValidator: Validator<string> = ({ email }) =>
  typeof email === "string" && validator.isEmail(email) ? email : null;

export default createRoute(emailValidator, async (email) => {
  const outcome = await addSubscriberTomailingList(email.toLowerCase());

  if (outcome === EmailApiOutcome.Success) {
    return "succeed";
  } else if (outcome === EmailApiOutcome.Conflict) {
    return "conflict";
  }
  return "failed";
});

/*
export default (req: Request, res: Response) => {
  if (
    typeof req.body.email !== "string" ||
    !validator.isEmail(req.body.email)
  ) {
    res.sendStatus(400);
    return;
  }

  const subscriberEmail = (req.body.email as string).toLowerCase();

  addSubscriberTomailingList(subscriberEmail).then((outcome) => {
    if (outcome === EmailApiOutcome.Success) {
      res.sendStatus(200);
    } else if (outcome === EmailApiOutcome.Conflict) {
      res.sendStatus(409);
    } else {
      res.sendStatus(500);
    }
  });
};
*/
