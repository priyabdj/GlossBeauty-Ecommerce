import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  },
  userEmail: { 
    type: String, 
    required: true 
  },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true }
  }],
  shippingInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
  },
  totalAmount: { 
    type: Number, 
    required: true 
  },
  deliveryFee: { 
    type: Number, 
    default: 50 
  },
  paymentMethod: { 
    type: String, 
    required: true,
    enum: ['cod', 'stripe', 'razorpay']
  },
  status: { 
    type: String, 
    default: 'Order Placed',
    enum: ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled']
  },
  orderDate: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;