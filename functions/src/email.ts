import axios from "axios";
import * as FormData from "form-data";
import { EMAIL_SENDER_DOMAIN, MAILGUN_API_KEY } from "./env";
import { EmailApiOutcome, intoEmailOutcome } from "./email-utils";

const NEWSLETTER_NAME = "newsletter";
const BASE_URL = "https://api.mailgun.net/v3/";

export const addSubscriberTomailingList = async (
  email: string
): Promise<EmailApiOutcome> => {
  const form = new FormData();

  form.append("subscribed", "yes");
  form.append("address", email);

  const mailingList = `${NEWSLETTER_NAME}@${EMAIL_SENDER_DOMAIN}`;
  const endpoint = `${BASE_URL}lists/${mailingList}/members`;

  try {
    await axios.post(endpoint, form, {
      auth: {
        username: "api",
        password: MAILGUN_API_KEY,
      },
      headers: form.getHeaders(),
    });
    return EmailApiOutcome.Success;
  } catch (err) {
    return intoEmailOutcome(err);
  }
};

export const unsubscribeUserFromMailingList = async (
  email: string
): Promise<EmailApiOutcome> => {
  const form = new FormData();

  form.append("subscribed", "no");

  const mailingList = `${NEWSLETTER_NAME}@${EMAIL_SENDER_DOMAIN}`;
  const endpoint = `${BASE_URL}lists/${mailingList}/members/${email}`;

  try {
    await axios.put(endpoint, form, {
      auth: {
        username: "api",
        password: MAILGUN_API_KEY,
      },
      headers: form.getHeaders(),
    });
    return EmailApiOutcome.Success;
  } catch (err) {
    return intoEmailOutcome(err);
  }
};
