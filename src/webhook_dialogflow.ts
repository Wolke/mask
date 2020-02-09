const { WebhookClient } = require('dialogflow-fulfillment');
// import get_trash_time_by_name from "./get_trash_time_by_name";
// import { TrashLine } from "./const"
// import { DateTime } from "actions-on-google";
// import { getTrashTimeByName } from "./response"

export default function (request: Express.Request, response: Express.Response) {
    let intentMap = new Map();
    intentMap.set('where to buy', async (agent: any) => {
        // let data = await getTrashTimeByName(agent.parameters);
        // console.log(text)
        agent.add("你猜猜");

    });

    const agent = new WebhookClient({ request, response });
    agent.handleRequest(intentMap);


}