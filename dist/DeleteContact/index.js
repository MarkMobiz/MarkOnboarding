"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnResponse_1 = require("../Dtos/Global/ReturnResponse");
const cosmos_1 = require("@azure/cosmos");
const endpoint = process.env.CosmosDbAccountUrl;
const key = process.env.CosmosDbAccountKey;
const client = new cosmos_1.CosmosClient({ endpoint, key });
// All function invocations also reference the same database and container.
const container = client.database(process.env.CosmosDbDatabaseName).container(process.env.CosmosDbContactContainer);
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log('DeleteContact Function About to Process');
        let returnStatus;
        let responseMessage;
        if (!(req.query && req.query.clientId && req.query.id)) {
            returnStatus = 400;
            responseMessage = new ReturnResponse_1.ReturnResponse("01", "Missing Fetch Parameters. Contact Cannot be Deleted.", null);
            context.res = {
                status: returnStatus,
                body: JSON.stringify(responseMessage)
            };
            return;
        }
        let contact = context.bindings.deleteContactDocument;
        context.log('deleteContactDocument: ' + JSON.stringify(contact));
        if (!contact) {
            returnStatus = 404;
            responseMessage = new ReturnResponse_1.ReturnResponse("02", "Contact Not Found", null);
            context.res = {
                status: returnStatus,
                body: JSON.stringify(responseMessage)
            };
            return;
        }
        context.log('About to Execute Conatainer Item Delete: ');
        let deleteResponse = yield container.item(req.query.id, req.query.clientId).delete();
        context.log('Executed Conatainer Item Delete: ');
        returnStatus = 200;
        responseMessage = new ReturnResponse_1.ReturnResponse("00", "Contact Deleted Successfully", contact);
        context.res = {
            status: returnStatus,
            body: JSON.stringify(responseMessage)
        };
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map