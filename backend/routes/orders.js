const router = require("express").Router();
const Order = require("../models/Order");

//POST
router.post("/", async (req,res)=>{
    const newOrder = new Order(req.body)
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err)
    }
});


//GET   
router.get("/", async (req,res)=>{
    try{
        const order = await Order.find();
        res.status(200).json(order);
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router