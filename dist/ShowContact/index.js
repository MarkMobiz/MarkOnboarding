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
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log('ShowContact Function About to Process');
        let returnStatus;
        let responseMessage;
        if (!(req.query && req.query.id && req.query.clientId)) {
            returnStatus = 400;
            responseMessage = new ReturnResponse_1.ReturnResponse("01", "Missing Fetch Parameters. Contact Cannot be Fetched.", null);
            context.res = {
                status: returnStatus,
                body: JSON.stringify(responseMessage)
            };
            return;
        }
        let contact = context.bindings.contactDocument;
        if (!contact) {
            returnStatus = 404;
            responseMessage = new ReturnResponse_1.ReturnResponse("02", "Contact Not Found", null);
            context.res = {
                status: returnStatus,
                body: JSON.stringify(responseMessage)
            };
            return;
        }
        //CONTACT FOUND
        returnStatus = 200;
        responseMessage = new ReturnResponse_1.ReturnResponse("00", "Contact Fetched Successfully", contact);
        context.res = {
            status: returnStatus,
            body: JSON.stringify(responseMessage)
        };
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map