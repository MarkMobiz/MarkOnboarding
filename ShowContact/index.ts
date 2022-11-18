import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Contact } from "../Entities/Contact"
import { ReturnResponse } from "../Dtos/Global/ReturnResponse"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('ShowContact Function About to Process');

    let returnStatus:number;
    let responseMessage:ReturnResponse;

    if(!(req.query && req.query.id && req.query.clientId))
    {
        returnStatus = 400;
        responseMessage = new ReturnResponse("01", "Missing Fetch Parameters. Contact Cannot be Fetched.", null);

        context.res = {
            status: returnStatus,
            body: JSON.stringify(responseMessage)
        };

        return;
    }

    let contact = context.bindings.contactDocument;

    if(!contact)
    {
        returnStatus = 404;
        responseMessage = new ReturnResponse("02", "Contact Not Found", null);

        context.res = {
            status: returnStatus,
            body: JSON.stringify(responseMessage)
        };

        return;
    }

    //CONTACT FOUND
    returnStatus = 200;
    responseMessage = new ReturnResponse("00", "Contact Fetched Successfully", contact);

    context.res = {
        status: returnStatus,
        body: JSON.stringify(responseMessage)
    };
};

export default httpTrigger;