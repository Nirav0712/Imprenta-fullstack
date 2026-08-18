import { useState, useEffect, useMemo } from "react";
import { FiTrash2, FiSearch } from "react-icons/fi";
import { userService } from "../../services/userService";
import DeleteModal from "../../components/common/modal/DeleteModal";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await userService.getUsers();
            if (res?.data) setUsers(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async (id, role) => {
        try {
            await userService.updateUserRole(id, { role });
            fetchUsers();
        } catch (error) {
            alert("Failed to update user role");
        }
    };

    const toggleStatus = async (id, isActive) => {
        try {
            await userService.updateUserRole(id, { isActive });
            fetchUsers();
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const handleDelete = async () => {
        if (!selectedUser) return;
        try {
            await userService.deleteUser(selectedUser._id);
            setDeleteOpen(false);
            fetchUsers();
        } catch (error) {
            alert("Failed to delete user");
        }
    };

    const filteredUsers = useMemo(() => {
        return users.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [users, search]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white">Users</h1>
                    <p className="mt-2 text-slate-400">Manage admin and customer accounts securely.</p>
                </div>
            </div>

            <div className="flex items-center rounded-2xl border border-white/10 bg-[#101B2D] p-4">
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#08111F] px-4 py-3 focus-within:border-sky-500 transition">
                    <FiSearch className="text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search by Name or Email..."
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
                                <th className="px-6 py-5 whitespace-nowrap">Name</th>
                                <th className="px-6 py-5 whitespace-nowrap">Email</th>
                                <th className="px-6 py-5 whitespace-nowrap">Created</th>
                                <th className="px-6 py-5 whitespace-nowrap">Role</th>
                                <th className="px-6 py-5 whitespace-nowrap">Status</th>
                                <th className="px-6 py-5 whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && <tr><td colSpan={6} className="py-16 text-center text-slate-500">Loading users...</td></tr>}
                            {!loading && filteredUsers.length === 0 && <tr><td colSpan={6} className="py-16 text-center text-slate-500">No users found.</td></tr>}
                            {!loading && filteredUsers.map((user) => (
                                <tr key={user._id} className="border-b border-white/5 hover:bg-white/5 transition text-sm">
                                    <td className="px-6 py-5 font-semibold text-white">{user.name}</td>
                                    <td className="px-6 py-5 text-slate-400">{user.email}</td>
                                    <td className="px-6 py-5 text-slate-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-5">
                                        <select
                                            value={user.role}
                                            onChange={(e) => updateRole(user._id, e.target.value)}
                                            className={`rounded-full px-3 py-1 font-semibold outline-none ${user.role === "admin" ? "bg-purple-500/20 text-purple-400" : "bg-sky-500/20 text-sky-400"
                                                }`}
                                        >
                                            <option value="user" className="bg-[#101B2D]">User</option>
                                            <option value="admin" className="bg-[#101B2D]">Admin</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-5">
                                        <button
                                            onClick={() => toggleStatus(user._id, !user.isActive)}
                                            className={`rounded-full px-3 py-1 font-semibold outline-none transition ${user.isActive ? "bg-green-500/20 text-green-500" : "bg-slate-500/20 text-slate-400"
                                                }`}
                                        >
                                            {user.isActive ? "Active" : "Inactive"}
                                        </button>
                                    </td>
                                    <td className="px-6 py-5">
                                        <button onClick={() => { setSelectedUser(user); setDeleteOpen(true); }} className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition hover:bg-red-500 hover:text-white">
                                            <FiTrash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="grid grid-cols-1 gap-4 p-4 lg:hidden">
                    {loading && <div className="py-10 text-center text-slate-500">Loading users...</div>}
                    {!loading && filteredUsers.length === 0 && <div className="py-10 text-center text-slate-500">No users found.</div>}
                    {!loading && filteredUsers.map((user) => (
                        <div key={user._id} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm flex flex-col gap-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-bold text-white whitespace-normal break-words break-all">{user.name}</p>
                                    <p className="text-sm text-slate-400 break-all">{user.email}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-xs font-semibold text-slate-500">Created</p>
                                    <p className="text-sm text-slate-300">{new Date(user.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-4 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <select
                                        value={user.role}
                                        onChange={(e) => updateRole(user._id, e.target.value)}
                                        className={`rounded-full px-3 py-1 text-xs font-semibold outline-none ${user.role === "admin" ? "bg-purple-500/20 text-purple-400" : "bg-sky-500/20 text-sky-400"}`}
                                    >
                                        <option value="user" className="bg-[#101B2D]">User</option>
                                        <option value="admin" className="bg-[#101B2D]">Admin</option>
                                    </select>
                                    <button
                                        onClick={() => toggleStatus(user._id, !user.isActive)}
                                        className={`rounded-full px-3 py-1 text-xs font-semibold outline-none transition ${user.isActive ? "bg-green-500/20 text-green-500" : "bg-slate-500/20 text-slate-400"}`}
                                    >
                                        {user.isActive ? "Active" : "Inactive"}
                                    </button>
                                </div>
                                <button onClick={() => { setSelectedUser(user); setDeleteOpen(true); }} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-red-500 transition hover:bg-red-500 hover:text-white">
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <DeleteModal
                isOpen={deleteOpen}
                title="Delete User"
                message={`Are you sure you want to delete user "${selectedUser?.name}"?`}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDelete}
            />
        </div >
    );
};

export default Users;
