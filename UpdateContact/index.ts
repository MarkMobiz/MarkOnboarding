import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Contact } from "../Entities/Contact"
import { ReturnResponse } from "../Dtos/Global/ReturnResponse"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('UpdateContact Function About to Process');

    let returnStatus:number;
    let responseMessage:ReturnResponse;

    if(!(req.query && req.query.id && req.query.clientId))
    {
        returnStatus = 400;
        responseMessage = new ReturnResponse("01", "Missing Fetch Parameters. Contact Cannot be Updated.", null);

        context.res = {
            status: returnStatus,
            body: JSON.stringify(responseMessage)
        };

        return;
    }

    let contact = context.bindings.inputContactDocument;

    if(!contact)
    {
        returnStatus = 404;
        responseMessage = new ReturnResponse("00", "Contact Not Found", null);

        context.res = {
            status: returnStatus,
            body: JSON.stringify(responseMessage)
        };

        return;
    }

    //CONTACT FOUND. UPDATE
    context.bindings.outputContactDocument = context.bindings.inputContactDocument;

    if(req.body.firstName)
    {
        context.bindings.outputContactDocument.firstName = req.body.firstName;
    }

    if(req.body.lastName)
    {
        context.bindings.outputContactDocument.lastName = req.body.lastName;
    }

    if(req.body.phoneNumber)
    {
        context.bindings.outputContactDocument.phoneNumber = req.body.phoneNumber;
    }

    if(req.body.emailAddress)
    {
        context.bindings.outputContactDocument.firstName = req.body.emailAddress;
    }

    context.bindings.outputContactDocument.modifiedAt = (new Date()).toISOString();

    returnStatus = 200;
    responseMessage = new ReturnResponse("00", "Contact Updated Successfully", context.bindings.outputContactDocument);

    context.res = {
        status: returnStatus,
        body: JSON.stringify(responseMessage)
    };
};

export default httpTrigger;