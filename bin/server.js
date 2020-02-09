"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient } = require('dialogflow-fulfillment');
const webhook_actions_1 = require("./webhook_actions");
const webhook_dialogflow_1 = require("./webhook_dialogflow");
const dialogflowFulfillment = (request, response) => {
    console.log("dialogflowFulfillment");
    const agent = new WebhookClient({ request, response });
    if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
        webhook_actions_1.default(request, response);
    }
    else {
        webhook_dialogflow_1.default(request, response);
    }
};
const port = process.env.PORT || 3000;
express()
    .get("/", (req, rep) => {
    let msg = "hello! mask ";
    rep.end(msg);
})
    .use("/dialogflowFulfillment", bodyParser.json(), dialogflowFulfillment)
    .listen(port, () => console.log(`run port ${port}`));
//# sourceMappingURL=server.js.map