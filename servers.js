const express=require("express");
const dotenv=require("dotenv");

const cross=require("cross");

const connectDB=require("./config/db.js");

dotenv.config();
connectDB();

const app=express();

app.arguments(cross());
app.use(express.json);

app.get("/",(req,res)=>
{
    res.send("API Running");
});

const PORT=process.env.PORT|| 50000;
app.listen(PORT,()=>
{
    console.log(`server running on port ${PORT}`);
});