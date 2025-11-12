import "dotenv/config";
import express from "express";
import connectDb from "./src/config/db.js";
import authRouter from "./src/routes/auth/auth.js";

connectDb();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/api/v1/auth',authRouter);

app.get('/',(req,res)=>{
    res.send('hello');
});

app.listen(port,()=>{
    console.log('server is running on',port);
});