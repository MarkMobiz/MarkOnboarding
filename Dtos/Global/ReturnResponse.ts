export class ReturnResponse {
    responseCode: string;
    responseMessage: string;
    responseData: any;

    constructor(code: string, message: string, data: any) {
            this.responseCode = code;
            this.responseMessage = message;
            this.responseData = data;
    }
}