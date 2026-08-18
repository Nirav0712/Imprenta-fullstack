import { useState, useEffect, useMemo } from "react";
import { FiEye, FiSearch, FiX } from "react-icons/fi";
import { orderService } from "../../services/orderService";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await orderService.getOrders();
            if (res?.data) {
                setOrders(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await orderService.updateOrderStatus(id, status);
            fetchOrders();
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const filteredOrders = useMemo(() => {
        return orders.filter((item) =>
            item.orderId.toLowerCase().includes(search.toLowerCase()) ||
            item.customerName.toLowerCase().includes(search.toLowerCase())
        );
    }, [orders, search]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white">Orders</h1>
                    <p className="mt-2 text-slate-400">View and manage customer orders.</p>
                </div>
            </div>

            <div className="flex items-center rounded-2xl border border-white/10 bg-[#101B2D] p-4">
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 focus-within:border-sky-500 transition">
                    <FiSearch className="text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search by Order ID or Customer Name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                    />
                </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#101B2D]">
                <div className="hidden lg:block overflow-x-auto w-full">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="border-b border-white/10 bg-[#08111F]/50">
                            <tr className="text-left text-sm font-semibold text-slate-400">
                                <th className="px-6 py-5 whitespace-nowrap">Order ID</th>
                                <th className="px-6 py-5 whitespace-nowrap">Customer</th>
                                <th className="px-6 py-5 whitespace-nowrap">Date</th>
                                <th className="px-6 py-5 whitespace-nowrap">Total</th>
                                <th className="px-6 py-5 whitespace-nowrap">Status</th>
                                <th className="px-6 py-5 whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center text-slate-500">Loading orders...</td>
                                </tr>
                            )}
                            {!loading && filteredOrders.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center text-slate-500">No orders found.</td>
                                </tr>
                            )}
                            {!loading && filteredOrders.map((order) => (
                                <tr key={order._id} className="border-b border-white/5 hover:bg-white/5 transition text-sm">
                                    <td className="px-6 py-5 font-semibold text-white">{order.orderId}</td>
                                    <td className="px-6 py-5 text-slate-300">
                                        <div>{order.customerName}</div>
                                        <div className="text-xs text-slate-500">{order.email}</div>
                                    </td>
                                    <td className="px-6 py-5 text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-5 font-bold text-sky-400">₹{order.totalAmount}</td>
                                    <td className="px-6 py-5">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order._id, e.target.value)}
                                            className={`rounded-full px-3 py-1 font-semibold outline-none ${order.status === "Pending" ? "bg-yellow-500/20 text-yellow-500" :
                                                order.status === "Delivered" ? "bg-green-500/20 text-green-500" :
                                                    order.status === "Cancelled" ? "bg-red-500/20 text-red-500" :
                                                        "bg-sky-500/20 text-sky-500"
                                                }`}
                                        >
                                            <option value="Pending" className="bg-[#101B2D]">Pending</option>
                                            <option value="Confirmed" className="bg-[#101B2D]">Confirmed</option>
                                            <option value="Processing" className="bg-[#101B2D]">Processing</option>
                                            <option value="Shipped" className="bg-[#101B2D]">Shipped</option>
                                            <option value="Delivered" className="bg-[#101B2D]">Delivered</option>
                                            <option value="Cancelled" className="bg-[#101B2D]">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex gap-2">
                                            <button onClick={() => setSelectedOrder(order)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 transition hover:bg-sky-500 hover:text-white">
                                                <FiEye size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards (Hidden on Desktop) */}
                <div className="grid grid-cols-1 gap-4 p-4 lg:hidden">
                    {loading ? (
                        <div className="py-10 text-center text-slate-500">Loading orders...</div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="py-10 text-center text-slate-500">No orders found.</div>
                    ) : (
                        filteredOrders.map((order) => (
                            <div key={order._id} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
                                <div className="mb-3 flex items-start justify-between">
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500">Order ID</p>
                                        <p className="font-bold text-white">{order.orderId}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-semibold text-slate-500">Total</p>
                                        <p className="font-bold text-sky-400">₹{order.totalAmount}</p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <p className="text-xs font-semibold text-slate-500">Customer</p>
                                    <p className="font-medium text-slate-300">{order.customerName}</p>
                                    <p className="text-xs text-slate-400 break-all">{order.email}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-xs font-semibold text-slate-500">Date</p>
                                    <p className="text-sm text-slate-300">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                    <div className="flex-1 mr-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order._id, e.target.value)}
                                            className={`w-full rounded-full px-3 py-2 text-xs font-semibold outline-none ${order.status === "Pending" ? "bg-yellow-500/20 text-yellow-500" :
                                                order.status === "Delivered" ? "bg-green-500/20 text-green-500" :
                                                    order.status === "Cancelled" ? "bg-red-500/20 text-red-500" :
                                                        "bg-sky-500/20 text-sky-500"
                                                }`}
                                        >
                                            <option value="Pending" className="bg-[#101B2D]">Pending</option>
                                            <option value="Confirmed" className="bg-[#101B2D]">Confirmed</option>
                                            <option value="Processing" className="bg-[#101B2D]">Processing</option>
                                            <option value="Shipped" className="bg-[#101B2D]">Shipped</option>
                                            <option value="Delivered" className="bg-[#101B2D]">Delivered</option>
                                            <option value="Cancelled" className="bg-[#101B2D]">Cancelled</option>
                                        </select>
                                    </div>
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition hover:bg-sky-500 hover:text-white"
                                    >
                                        <FiEye size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#101B2D] p-6 lg:p-10 shadow-2xl">

                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-red-500/10 hover:text-red-400"
                        >
                            <FiX size={20} />
                        </button>

                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-white">Order {selectedOrder.orderId}</h2>
                            <p className="mt-1 text-slate-400">Placed on {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">

                            <div className="space-y-8">
                                <div>
                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-sky-400">Customer Information</h3>
                                    <div className="rounded-2xl border border-white/5 bg-[#08111F] p-5 text-sm space-y-3">
                                        <div className="flex justify-between"><span className="text-slate-400">Name</span><span className="font-semibold text-white">{selectedOrder.customerName}</span></div>
                                        <div className="flex justify-between"><span className="text-slate-400">Company</span><span className="text-white">{selectedOrder.companyName || "N/A"}</span></div>
                                        <div className="flex justify-between"><span className="text-slate-400">Email</span><span className="text-white">{selectedOrder.email}</span></div>
                                        <div className="flex justify-between"><span className="text-slate-400">Phone</span><span className="text-white">{selectedOrder.phone}</span></div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-sky-400">Billing / Delivery</h3>
                                    <div className="rounded-2xl border border-white/5 bg-[#08111F] p-5 text-sm space-y-3">
                                        <div className="flex justify-between"><span className="text-slate-400">Address</span><span className="text-white text-right max-w-[200px]">{selectedOrder.address}</span></div>
                                        <div className="flex justify-between"><span className="text-slate-400">City / State</span><span className="text-white">{selectedOrder.city}, {selectedOrder.state}</span></div>
                                        <div className="flex justify-between"><span className="text-slate-400">Country / Postal</span><span className="text-white">{selectedOrder.country} - {selectedOrder.postalCode}</span></div>
                                        <div className="flex justify-between mt-2 pt-2 border-t border-white/5"><span className="text-slate-400">GST Number</span><span className="text-white font-medium">{selectedOrder.gstNumber || "N/A"}</span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-sky-400">Order Items</h3>
                                    <div className="rounded-2xl border border-white/5 bg-[#08111F] p-5 space-y-4">
                                        {selectedOrder.items.map((item, index) => (
                                            <div key={index} className="flex justify-between text-sm py-2 border-b border-white/5 last:border-0 last:pb-0">
                                                <div>
                                                    <div className="font-semibold text-white">{item.name}</div>
                                                    <div className="text-slate-500 text-xs mt-1">₹{item.price.toLocaleString()} x {item.quantity}</div>
                                                </div>
                                                <div className="font-bold text-sky-400 text-right mt-1">₹{(item.price * item.quantity).toLocaleString()}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-sky-400">Order Summary</h3>
                                    <div className="rounded-2xl border border-white/5 bg-[#08111F] p-5 text-sm space-y-3">
                                        <div className="flex justify-between"><span className="text-slate-400">Subtotal</span><span className="text-white">₹{selectedOrder.totalAmount.toLocaleString()}</span></div>
                                        <div className="flex justify-between"><span className="text-slate-400">GST Tax (18%)</span><span className="text-white">₹{(selectedOrder.totalAmount * 0.18).toLocaleString()}</span></div>
                                        <div className="flex justify-between"><span className="text-slate-400">Payment Status</span><span className="font-medium text-yellow-500">{selectedOrder.paymentStatus}</span></div>
                                        <div className="flex justify-between mt-4 pt-4 border-t border-white/10 items-center">
                                            <span className="text-white font-semibold flex items-center">Grand Total</span>
                                            <span className="text-2xl font-black text-sky-400">₹{(selectedOrder.totalAmount * 1.18).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Orders;
