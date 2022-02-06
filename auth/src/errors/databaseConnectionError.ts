import { CustomError } from "./customError";


export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = "Error connecting database";

    constructor() {
        super("Error connection to db...");
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);

    }

    serializeError() {
        return [
            { message: this.reason }
        ]
    }
}