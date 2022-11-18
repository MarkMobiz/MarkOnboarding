import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ReturnResponse } from "../Dtos/Global/ReturnResponse"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('ShowContactList Function About to Process');

    let returnStatus:number;
    let responseMessage:ReturnResponse;

    if(!(req.query && req.query.clientId))
    {
        returnStatus = 400;
        responseMessage = new ReturnResponse("01", "Missing Fetch Parameters. Contact List Cannot be Fetched.", null);

        context.res = {
            status: returnStatus,
            body: JSON.stringify(responseMessage)
        };

        return;
    }

    let contacts = context.bindings.inputContactDocument;

    returnStatus = 200;
    responseMessage = new ReturnResponse("00", "Contact List Fetched Successfully", contacts);

    context.res = {
        status: returnStatus,
        body: JSON.stringify(responseMessage)
    };
};

export default httpTrigger;