const express=require("express");
const dotenv=require("dotenv");
const path=require("path");

const cors=require("cors");

const connectDB=require("./config/db");

dotenv.config();
connectDB();

const app=express();
const PORT=process.env.PORT || 5000;
const SERVER_URL=`http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>
{
    res.sendFile(path.join(__dirname,"index.html"));
});

app.use("/api/orders", require("./routes/orderRoutes"));

app.listen(PORT,()=>
{
    console.log(`Server running on ${SERVER_URL}`);
});