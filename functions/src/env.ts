import * as functions from "firebase-functions";

type EnvConfig = Record<string, unknown>;

const newsletterConfig = functions.config().newsletter;

const isValidConfig = (val: unknown): val is EnvConfig =>
  typeof val === "object" && val !== null;

if (!isValidConfig(newsletterConfig)) {
  throw new Error("Invalid environment variable config");
}

const isString = (val: unknown): val is string => typeof val === "string";

const verifyEnv = (envName: keyof EnvConfig): string => {
  const value = newsletterConfig[envName];

  if (!isString(value)) {
    throw new Error(`Invalid '${envName}' variable ${value}`);
  }

  return value;
};

export const EMAIL_SENDER_DOMAIN = verifyEnv("email_sender_domain");
export const MAILGUN_API_KEY = verifyEnv("mailgun_api_key");
