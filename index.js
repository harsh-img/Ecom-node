import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import mainRoute from "./src/routes/main.route.js";
import cors from "cors";


dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",mainRoute);

app.listen(port,"0.0.0.0",()=>{
    console.log('server is running on 0.0.0.0:',port);
});
