import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import subscribeHandler from "./routes/subscribe";

// Newsletter Service entry point
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.post("/subscribe", subscribeHandler);

export const newsletter = functions.https.onRequest(app);
