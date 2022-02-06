import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/currentUser";
import { signInRouter } from "./routes/signIn";
import { signOutRouter } from "./routes/signOut";
import { signUpRouter } from "./routes/signUp";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";
import { connect } from "mongoose";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async () => {
    throw new NotFoundError();
})

app.use(errorHandler);

const start = async () => {
    try {
        await connect("mongodb://auth-mongo-srv:27017/auth");
        console.log("Connected to mongoDB");
        
    } catch (err) {
        console.log(err);
    }
    app.listen(3000, () => {
        console.log("Auth listening on port 3000!!!!!")
    });

}

start();

