import express from "express";
const app=express();
import cors from "cors";
import Connection from "./db/db.js";
import dotenv from "dotenv";
import Router from "./router/route.js";
import bodyParser from "body-parser";
dotenv.config();
const PORT=process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/",Router);
const URL=process.env.MONGODVURL;

Connection(URL);
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
// ArBFcEJDndqEUDdQ
