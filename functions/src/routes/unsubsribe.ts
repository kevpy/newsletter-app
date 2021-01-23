import { unsubscribeUserFromMailingList } from "../email";
import { intoHandlerResult, emailValidator } from "../utils";
import { createRoute } from "../router";

export default createRoute(emailValidator, (email) =>
  unsubscribeUserFromMailingList(email.toLowerCase()).then(intoHandlerResult)
);
