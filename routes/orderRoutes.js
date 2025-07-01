import express from "express";
import Order from "../models/Order.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, shippingInfo, totalAmount, deliveryFee, paymentMethod } = req.body;
    
    const userEmail = req.user?.email || req.body.userEmail;
    const userId = req.user?._id || userEmail;
    
    if (!userEmail) {
      return res.status(401).json({ 
        success: false, 
        message: "User authentication required" 
      });
    }

    if (!items || !items.length) {
      return res.status(400).json({ 
        success: false, 
        message: "Order items are required" 
      });
    }

    if (!shippingInfo || !totalAmount || !paymentMethod) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required order information" 
      });
    }
    const newOrder = new Order({
      userId,
      userEmail,
      items,
      shippingInfo,
      totalAmount,
      deliveryFee: deliveryFee || 50,
      paymentMethod
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userEmail = req.user?.email || req.query.userEmail;
    const userId = req.user?._id || userEmail;
    
    if (!userEmail) {
      return res.status(401).json({ 
        success: false, 
        message: "User authentication required" 
      });
    }

    const orders = await Order.find({ userEmail }).sort({ orderDate: -1 });

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message
    });
  }
});

router.get("/:orderId", authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const userEmail = req.user?.email || req.query.userEmail;
    
    if (!userEmail) {
      return res.status(401).json({ 
        success: false, 
        message: "User authentication required" 
      });
    }

    const order = await Order.findOne({ 
      _id: orderId, 
      userEmail 
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
      error: error.message
    });
  }
});

export default router;