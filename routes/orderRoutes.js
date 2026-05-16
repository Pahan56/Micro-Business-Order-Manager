const express=require("express");
const router =express.Router();

const
 {
    createOrder,
    getOrders,
    getOrderByID,
    updateOrder,
    deleteOrder,
}=require("..//controllers/orderController");



router.post("/",createOrder);
router.get("/",getOrders);
router.get("/:id",getOrderByID);
router.put("/:id",updateOrder);
router.delete("/:id",deleteOrder);

module.exports=router;
