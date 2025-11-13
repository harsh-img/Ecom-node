import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import mainRoute from "./src/routes/main.route.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",mainRoute);

app.listen(port,()=>{
    console.log('server is running on',port);
});