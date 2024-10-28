import express from "express";
import login_route from "./routes/login.js"
import sign_up from "./routes/sign_up.js";

const app = express();

app.use(express.json());
app.use(login_route)
app.use(sign_up)

export default app;
