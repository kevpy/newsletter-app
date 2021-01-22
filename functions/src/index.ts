import * as functions from "firebase-functions";
import { PLACEHOlDER } from "./env";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });

  console.log(PLACEHOlDER);
  response.send("Hello from Firebase!");
});
