import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ReturnResponse } from "../Dtos/Global/ReturnResponse"
import { CosmosClient } from "@azure/cosmos"

const endpoint = process.env.CosmosDbAccountUrl;
const key = process.env.CosmosDbAccountKey;

const client = new CosmosClient({ endpoint, key });
// All function invocations also reference the same database and container.
const container = client.database(process.env.CosmosDbDatabaseName).container(process.env.CosmosDbContactContainer);

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('DeleteContact Function About to Process');

    let returnStatus:number;
    let responseMessage:ReturnResponse;

    if(!(req.query && req.query.clientId && req.query.id))
    {
        returnStatus = 400;
        responseMessage = new ReturnResponse("01", "Missing Fetch Parameters. Contact Cannot be Deleted.", null);

        context.res = {
            status: returnStatus,
            body: JSON.stringify(responseMessage)
        };

        return;
    }

    let contact = context.bindings.deleteContactDocument;

    context.log('deleteContactDocument: ' + JSON.stringify(contact));

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

    context.log('About to Execute Conatainer Item Delete: ');

    let deleteResponse = await container.item(req.query.id, req.query.clientId).delete();

    context.log('Executed Conatainer Item Delete: ');

    returnStatus = 200;
    responseMessage = new ReturnResponse("00", "Contact Deleted Successfully", contact);

    context.res = {
        status: returnStatus,
        body: JSON.stringify(responseMessage)
    };
};

export default httpTrigger;