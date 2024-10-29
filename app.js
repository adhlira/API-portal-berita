import express from "express";
import login_route from "./routes/login.js";
import sign_up_route from "./routes/sign_up.js";
import categories_route from "./routes/categories.js";
import news_route from "./routes/news.js";

const app = express();

app.use(express.json());
app.use(login_route);
app.use(sign_up_route);
app.use(categories_route);
app.use(news_route);

export default app;
