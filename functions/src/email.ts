import axios from "axios";
import * as FormData from "form-data";
import { EMAIL_END_USERS, EMAIL_SENDER_DOMAIN, MAILGUN_API_KEY } from "./env";
import { EmailApiOutcome, intoEmailOutcome } from "./email-utils";

const BASE_URL = "https://api.mailgun.net/v3/";
const NEWSLETTER_NAME = "newsletter";
const MAILING_LIST = `${NEWSLETTER_NAME}@${EMAIL_SENDER_DOMAIN}`;

const createEndpoint = (path: string) => `${BASE_URL}${path}`;

type Operation =
  | { name: "Subscribe" | "Unsubscribe"; email: string }
  | { name: "SendNewsletter"; subject: string; body: string };

interface MailgunApiData {
  endpoint: string;
  form: FormData;
  httpMethod: "post" | "put";
}

const createMailgunApiData = (op: Operation): MailgunApiData => {
  const form = new FormData();

  switch (op.name) {
    case "Subscribe": {
      form.append("subscribed", "yes");
      form.append("address", op.email);

      return {
        form,
        endpoint: createEndpoint(`lists/${MAILING_LIST}/members`),
        httpMethod: "post",
      };
    }

    case "Unsubscribe": {
      form.append("subscribed", "no");

      return {
        form,
        endpoint: createEndpoint(`lists/${MAILING_LIST}/members/${op.email}`),
        httpMethod: "put",
      };
    }

    case "SendNewsletter": {
      form.append("from", `Kibet <${MAILING_LIST}>`);
      form.append("to", "kibetapps@gmail.com");
      form.append("subject", op.subject);
      form.append("text", op.body);

      if (!EMAIL_END_USERS) {
        form.append("o:testmode", "yes");
      }

      return {
        form,
        endpoint: createEndpoint(`${EMAIL_SENDER_DOMAIN}/messages`),
        httpMethod: "post",
      };
    }
  }
};

const createRequest = (op: Operation): Promise<EmailApiOutcome> => {
  const { form, endpoint, httpMethod } = createMailgunApiData(op);

  return axios({
    url: endpoint,
    method: httpMethod,
    data: form,
    headers: form.getHeaders(),
    auth: {
      username: "api",
      password: MAILGUN_API_KEY,
    },
  })
    .then(() => EmailApiOutcome.Success)
    .catch(intoEmailOutcome);
};

export const addSubscriberTomailingList = (email: string) =>
  createRequest({ name: "Subscribe", email });

export const unsubscribeUserFromMailingList = (email: string) =>
  createRequest({ name: "Unsubscribe", email });

export const sendNewsletter = (body: string, subject: string) =>
  createRequest({ name: "SendNewsletter", body, subject });
