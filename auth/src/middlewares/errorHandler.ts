import { NextFunction, Response, Request } from "express";
import { CustomError } from "../errors/customError";

export const errorHandler = (
    error: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).send({errors: error.serializeError()}); 
        }

        res.send({ errors: [
            {message: "Something went"}
        ]});
        
}