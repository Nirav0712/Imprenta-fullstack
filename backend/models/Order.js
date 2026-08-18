import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderId: { type: String, required: true, unique: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
        customerName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        companyName: { type: String },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: String, required: true },
        gstNumber: { type: String },
        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                name: { type: String, required: true },
                quantity: { type: Number, required: true, default: 1 },
                price: { type: Number, required: true }
            }
        ],
        totalAmount: { type: Number, required: true },
        paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
        status: { type: String, enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Pending" }
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
