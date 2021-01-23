import { addSubscriberTomailingList } from "../email";
import { createRoute } from "../router";
import { intoHandlerResult, emailValidator } from "../utils";

export default createRoute(emailValidator, (email) =>
  addSubscriberTomailingList(email.toLowerCase()).then(intoHandlerResult)
);
