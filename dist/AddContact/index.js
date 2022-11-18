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
const Contact_1 = require("../Entities/Contact");
const ReturnResponse_1 = require("../Dtos/Global/ReturnResponse");
const uuid_1 = require("uuid");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log('AddContact Function About to Process');
        let returnStatus;
        let responseMessage;
        let contact = new Contact_1.Contact();
        if (req.body && req.body.firstName && req.body.lastName && req.body.phoneNumber && req.body.emailAddress && req.body.clientId) {
            contact.id = (0, uuid_1.v4)();
            contact.firstName = req.body.firstName;
            contact.lastName = req.body.lastName;
            contact.phoneNumber = req.body.phoneNumber;
            contact.emailAddress = req.body.emailAddress;
            contact.clientId = req.body.clientId;
            contact.createdAt = (new Date()).toISOString();
            contact.modifiedAt = null;
            context.bindings.outputDocument = JSON.stringify(contact);
            returnStatus = 200;
            responseMessage = new ReturnResponse_1.ReturnResponse("00", "Contact Added Successfully", contact);
        }
        else {
            returnStatus = 400;
            responseMessage = new ReturnResponse_1.ReturnResponse("01", "Missing Fields. Contact Not Added.", null);
        }
        context.res = {
            status: returnStatus,
            body: JSON.stringify(responseMessage)
        };
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map