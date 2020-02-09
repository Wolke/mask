import *  as express from "express";
import * as bodyParser from "body-parser";
const { WebhookClient } = require('dialogflow-fulfillment');

import { getDrugStoreByLocation } from "./utils";

import actions from "./webhook_actions"
import dialogflow from "./webhook_dialogflow"

const dialogflowFulfillment = (request: Express.Request, response: Express.Response) => {
    console.log("dialogflowFulfillment")
    const agent = new WebhookClient({ request, response });
    if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
        actions(request, response)
    } else {
        dialogflow(request, response)
    }
}


const port = process.env.PORT || 3000;
express()
    .get("/", (req: express.Request, rep: express.Response) => {
        let msg = "hello! mask ";
        rep.end(msg)
    })
    .use("/dialogflowFulfillment", bodyParser.json(), dialogflowFulfillment)
    .listen(port, () => console.log(`run port ${port}`)) 