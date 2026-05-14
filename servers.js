const express=require("express");
const dotenv=require("dotenv");

const cors=require("cors");

const connectDB=require("./config/db");

dotenv.config();
connectDB();

const app=express();

app.arguments(cors());
app.use(express.json());

app.get("/",(req,res)=>
{
    res.send("API Running");
});

const PORT=process.env.PORT|| 50000;
app.listen(PORT,()=>
{
    console.log(`server running on port ${PORT}`);
});