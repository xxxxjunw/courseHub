import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/databaseConnectionError';
import { RequestValidationError } from '../errors/requestValidationError';

const router = express.Router();

router.post('/api/users/signup', [
    body("email")
        .isEmail()
        .withMessage("Email must be valid"),
    body("password")
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage("Password must be 4 to 20 characters")
], 
(req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
        // return res.status(400).send(errors.array());
    }

    const {email, password} = req.body;

    console.log("Creating a user...");
    throw new DatabaseConnectionError();

    res.send({user: "userName", ID: 1234});
    
});

export {router as signUpRouter};