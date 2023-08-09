import express from 'express';
import cors from 'cors'
import HelloController from "./controllers/hello-controllers.js";
import UserController from "./users/users-controllers.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
const app = express();
import session from "express-session";
import AuthController from "./users/auth-controller.js";


app.use(
    cors({
    credentials: true,
    origin: "http://localhost:3000",
    })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
app.use(
    session(sessionOptions)
);
app.use(express.json());
TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);
app.listen(4000);

