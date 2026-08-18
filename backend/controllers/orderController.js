import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { createNotification } from "./notificationController.js";

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });

        // Notify Admin (optional for status updates, but user requested it for Timeline)
        await createNotification({
            type: "order_status",
            title: "Order Status Updated",
            message: `Order #${order.orderId} status changed to ${status}.`,
            entityId: order._id,
            entityType: "order",
            orderId: order._id,
            customerName: order.customerName,
            priority: "normal",
        });

        res.status(200).json({ success: true, data: order, message: "Order status updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// Create order securely
export const createOrder = async (req, res) => {
    try {
        const { customerName, email, phone, companyName, address, city, state, country, postalCode, gstNumber, items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: "No order items" });
        }

        // Fetch prices securely from DB
        const validatedItems = [];
        let calculatedTotal = 0;

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product ${item.name} not found` });
            }

            let itemPrice = product.salePrice > 0 ? product.salePrice : product.price;

            const itemQuantity = Number(item.quantity);
            if (itemQuantity <= 0) {
                return res.status(400).json({ success: false, message: `Invalid quantity for ${product.name}` });
            }

            let finalUnitPrice = itemPrice;

            if (product.configuration?.enabled && item.configuration) {
                const conf = product.configuration;
                const userConf = item.configuration;

                // Quantity Tier override
                if (conf.quantityOptions && conf.quantityOptions.length > 0) {
                    const exactTier = conf.quantityOptions.find(q => q.enabled && Number(q.quantity) === itemQuantity);
                    if (exactTier && exactTier.price > 0) {
                        finalUnitPrice = exactTier.price; // Admin override price explicitly sets unit price
                    }
                }

                // Addons calculation
                let addons = 0;
                if (userConf.size && conf.sizes) {
                    const sizeOpt = conf.sizes.find(s => s.enabled && s.name === userConf.size);
                    if (sizeOpt) addons += sizeOpt.additionalPrice || 0;
                }
                if (userConf.material && conf.materials) {
                    const matOpt = conf.materials.find(m => m.enabled && m.name === userConf.material);
                    if (matOpt) addons += matOpt.additionalPrice || 0;
                }
                if (userConf.lamination && conf.laminations) {
                    const lamOpt = conf.laminations.find(l => l.enabled && l.name === userConf.lamination);
                    if (lamOpt) addons += lamOpt.additionalPrice || 0;
                }
                if (userConf.foil && conf.foils) {
                    const foilOpt = conf.foils.find(f => f.enabled && f.name === userConf.foil);
                    if (foilOpt) addons += foilOpt.additionalPrice || 0;
                }
                if (userConf.design && conf.designOptions) {
                    const designOpt = conf.designOptions.find(d => d.enabled && d.name === userConf.design);
                    if (designOpt) addons += designOpt.additionalPrice || 0;
                }
                if (userConf.splitOnBackPaper && conf.splitOnBackPapers) {
                    const splitOpt = conf.splitOnBackPapers.find(s => s.enabled && s.name === userConf.splitOnBackPaper);
                    if (splitOpt) addons += splitOpt.additionalPrice || 0;
                }

                finalUnitPrice += addons;
            }

            validatedItems.push({
                productId: product._id,
                name: product.name,
                quantity: itemQuantity,
                price: finalUnitPrice,
                configuration: item.configuration || null
            });

            calculatedTotal += (finalUnitPrice * itemQuantity);

            // Deduct stock if manageStock is true
            if (product.manageStock) {
                product.stock = Math.max(0, product.stock - itemQuantity);
                await product.save();

                // Trigger notifications
                if (product.stock === 0) {
                    await createNotification({
                        type: "out_of_stock",
                        title: "Product Out of Stock",
                        message: `${product.name} is now out of stock.`,
                        entityId: product._id,
                        entityType: "product",
                        productId: product._id,
                        productName: product.name,
                        priority: "urgent",
                    });
                } else if (product.stock <= (product.lowStockAlert || 5)) {
                    await createNotification({
                        type: "low_stock",
                        title: "Low Stock Alert",
                        message: `${product.name} has only ${product.stock} units remaining.`,
                        entityId: product._id,
                        entityType: "product",
                        productId: product._id,
                        productName: product.name,
                        priority: "high",
                    });
                }
            }
        }

        const orderId = "ORD-" + Date.now();
        const order = await Order.create({
            orderId,
            customerName,
            email,
            phone,
            companyName,
            address,
            city,
            state,
            country,
            postalCode,
            gstNumber,
            user: req.user ? req.user._id : null,
            items: validatedItems,
            totalAmount: calculatedTotal,
            paymentStatus: "Pending", // Stops before Stripe processing as Stripe is unconfigured
            status: "Pending"
        });

        // Notify Admin
        await createNotification({
            type: "new_order",
            title: "New Order Received",
            message: `New order #${order.orderId} has been placed by ${customerName}.`,
            entityId: order._id,
            entityType: "order",
            orderId: order._id,
            customerName,
            priority: "high",
        });

        res.status(201).json({ success: true, data: order, message: "Order created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
