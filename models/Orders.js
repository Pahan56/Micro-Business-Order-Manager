const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema
(
    {
        customerName:
        {
            type:String,
            required:true,
        },
        productName:
        {
            type:String,
            required:true,
        },
        quantity:
        {
            type:Number,
            required:true,
        },
        deliveryDate:
        {
            type:Date,
            required:true,
        },
        status:
        {
            type:String,
            enum:["Pending","Completed","Cancelled"],
            default:"Pending",
        },
    },
    {
        timestamps:true,
    }
);

module.exports=mongoose.model("Orders",orderSchema);