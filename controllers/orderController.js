const { json } = require("express");
const Order=require("../models/Orders");

const createOrder=async(req,res)=>
{
    try
    {
        const order=await Order.create(req.body);

        res.status(201).json(order);
    }
    catch(error)
    {
        res.status(500).json({
            message:error.message,
        });
    }
};


const getOrders=async(req,res)=>
{
    try
    {
        const orders=await Order.find();
        res.status(200).json(orders);
    }
    catch(error)
    {
        res.status(500).json({
            message:error.message,
        });
    }
};



const getOrderByID=async(req,res)=>
{
    try
    {
        const order=await Order.findById(req.params.id);

        if(!order)
        {
            return res.status(400),json(
                {
                    message:"Order not found",
                }
            );
        }
        res.status(200).json(order);
    }
      catch(error)
    {
        res.status(500).json({
            message:error.message,
        });
    }

}

const updateOrder=async(req,res)=>
{
    try
    {
        const order=await Order.findByIdAndUpdate
        (
            
                req.params.id,
                req.body,
                {
                    new :true,
                }

            
        );

        if(!order)
        {
            return res.status(404).json(
                {
                    message:"Order not found",
                }
            );
        }
        res.status(200).json(order);
    }
    catch(error)
    {
        res.status(500).json({
            message:error.message,
        });
    }

};

const deleteOrder=async(req,res)=>
{
    try
    {
        const order=await Order.findByIdAndDelete(req.params.id);

        if(!order)
        {
            return res.status(404).json
            (
                {
                    message:"Order not found",
                }
            );
        }

        res.status(200).json(
            {
                message:"Order Delete Successfully",
            }
        );
    }
    catch(error)
    {
        res.status(500).json(
            {
                message:error.message,
            }
        );
    }
};

module.exports={createOrder,getOrders,getOrderByID,updateOrder,deleteOrder};