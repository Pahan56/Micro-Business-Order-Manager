const Order=require("../models/Orders");

const createOrder=async(req,res)=>
{
    try
    {
        const order=await Order.create(req.body);

        res.status(201).json({
            success:true,
            data:order,

        });
        
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};


const getOrders=async(req,res)=>
{
    try
    {
        const orders=await Order.find();
        res.status(200).json
        ({
             success:true,
             count:orders.length,
            data:orders,
        })
    }
    catch(error)
    {
        res.status(500).json({
             success:false,
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
            return res.status(400).json(
                {
                     success:false,
                    message:"Order not found",
                }
            );
        }
        res.status(200).json
        ({
             success:true,
            data:order,

        })
    }
      catch(error)
    {
        res.status(500).json({
            success:false,
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
                    runValidators:true,
                }

            
        );

        if(!order)
        {
            return res.status(404).json(
                {
                    success:false,
                    message:"Order not found",
                }
            );
        }
        res.status(200).json
        (
            {
                 success:true,
                 data:order,
            }
        )
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
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
                     success:false,
                    message:"Order not found",
                }
            );
        }

        res.status(200).json(
            {
                success:true,
                message:"Order Delete Successfully",
            }
        );
    }
    catch(error)
    {
        res.status(500).json(
            {
                success:false,
                message:error.message,
            }
        );
    }
};

module.exports={createOrder,getOrders,getOrderByID,updateOrder,deleteOrder};