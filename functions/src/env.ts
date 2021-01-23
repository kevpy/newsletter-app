import * as functions from "firebase-functions";
import { isObject, isString } from "./utils";

type EnvConfig = Record<string, unknown>;

const newsletterConfig = functions.config().newsletter;

if (!isObject(newsletterConfig)) {
  throw new Error("Invalid environment variable config");
}

const verifyEnv = (envName: keyof EnvConfig): string => {
  const value = newsletterConfig[envName];

  if (!isString(value)) {
    throw new Error(`Invalid '${envName}' variable ${value}`);
  }

  return value;
};

const verifyOptionalenv = (envName: keyof EnvConfig): string | undefined => {
  const value = newsletterConfig[envName];

  if (value === undefined) {
    return value;
  }
  return verifyEnv(envName);
};

export const EMAIL_SENDER_DOMAIN = verifyEnv("email_sender_domain");
export const MAILGUN_API_KEY = verifyEnv("mailgun_api_key");
export const AUTH_SECRET = verifyEnv("auth_secret");
export const EMAIL_END_USERS = verifyOptionalenv("email_end_users") === "yes";
