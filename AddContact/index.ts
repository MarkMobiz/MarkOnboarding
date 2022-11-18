import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Contact } from "../Entities/Contact"
import { ReturnResponse } from "../Dtos/Global/ReturnResponse"
import { v4 as uuidv4 } from "uuid";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('AddContact Function About to Process');

    let returnStatus:number;
    let responseMessage:ReturnResponse;
    let contact = new Contact();

    if (req.body && req.body.firstName && req.body.lastName && req.body.phoneNumber && req.body.emailAddress && req.body.clientId)
    {
        contact.id = uuidv4();
        contact.firstName = req.body.firstName;
        contact.lastName = req.body.lastName;
        contact.phoneNumber = req.body.phoneNumber;
        contact.emailAddress = req.body.emailAddress;
        contact.clientId = req.body.clientId;
        contact.createdAt = (new Date()).toISOString();
        contact.modifiedAt = null;

        context.bindings.outputDocument = JSON.stringify(contact);

        returnStatus = 200;
        responseMessage = new ReturnResponse("00", "Contact Added Successfully", contact)
    }
    else
    {
        returnStatus = 400;
        responseMessage = new ReturnResponse("01", "Missing Fields. Contact Not Added.", null);
    }
    
    context.res = {
        status: returnStatus,
        body: JSON.stringify(responseMessage)
    };
};

export default httpTrigger;