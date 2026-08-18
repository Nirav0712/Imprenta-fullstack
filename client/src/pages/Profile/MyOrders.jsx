import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const MyOrders = () => {
    const { isAuthenticated, loading, user } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!loading && !isAuthenticated) return navigate("/login");

        const fetchMyOrders = async () => {
            try {
                const res = await api.get("/orders/myorders");
                if (res.data.success) {
                    setOrders(res.data.data);
                }
            } catch (error) {
                console.error("Failed to load orders");
            } finally {
                setFetching(false);
            }
        };

        if (isAuthenticated) fetchMyOrders();
    }, [isAuthenticated, loading, navigate]);

    if (loading || fetching) return <div className="min-h-screen flex items-center justify-center">Loading orders...</div>;

    return (
        <section className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-white">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center backdrop-blur-xl">
                        <h2 className="text-2xl text-slate-300 font-semibold mb-4">You have no orders yet.</h2>
                        <button onClick={() => navigate("/products")} className="mt-4 px-8 py-3 rounded-xl bg-sky-500 text-white font-medium hover:bg-sky-600 transition">
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8 backdrop-blur-xl">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-white/10 pb-6 mb-6">
                                    <div>
                                        <p className="text-sm text-sky-400 font-bold uppercase tracking-wider mb-1">Order {order.orderId}</p>
                                        <p className="text-slate-400 text-sm">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="mt-4 lg:mt-0 text-left lg:text-right">
                                        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-400' :
                                            order.status === 'Cancelled' ? 'bg-red-500/10 text-red-400' :
                                                'bg-yellow-500/10 text-yellow-500'
                                            }`}>
                                            {order.status}
                                        </span>
                                        <p className="text-white font-bold mt-2 text-xl">₹{(order.totalAmount * 1.18).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm text-slate-300">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center font-bold text-sky-400">{item.quantity}x</div>
                                                <span className="font-medium text-white">{item.name}</span>
                                            </div>
                                            <span className="font-semibold text-slate-400">₹{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
export default MyOrders;
