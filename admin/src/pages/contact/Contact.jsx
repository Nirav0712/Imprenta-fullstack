import { useState, useEffect, useMemo } from "react";
import { FiTrash2, FiSearch } from "react-icons/fi";
import { contactService } from "../../services/contactService";
import DeleteModal from "../../components/common/modal/DeleteModal";

const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const res = await contactService.getContacts();
            if (res?.data) setContacts(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await contactService.updateContactStatus(id, status);
            fetchContacts();
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const handleDelete = async () => {
        if (!selectedContact) return;
        try {
            await contactService.deleteContact(selectedContact._id);
            setDeleteOpen(false);
            fetchContacts();
        } catch (error) {
            alert("Failed to delete contact message");
        }
    };

    const filteredContacts = useMemo(() => {
        return contacts.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [contacts, search]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-4xl font-black text-white">Contact Messages</h1>
                    <p className="mt-2 text-slate-400">View and respond to inquiries from the website form.</p>
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
                <div className="overflow-x-auto w-full">
                    <table className="w-full">
                        <thead className="border-b border-white/10 bg-[#08111F]/50">
                            <tr className="text-left text-sm font-semibold text-slate-400">
                                <th className="px-6 py-5 whitespace-nowrap">Sender</th>
                                <th className="px-6 py-5 whitespace-nowrap max-w-sm">Message</th>
                                <th className="px-6 py-5 whitespace-nowrap">Date</th>
                                <th className="px-6 py-5 whitespace-nowrap">Status</th>
                                <th className="px-6 py-5 whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && <tr><td colSpan={5} className="py-16 text-center text-slate-500">Loading messages...</td></tr>}
                            {!loading && filteredContacts.length === 0 && <tr><td colSpan={5} className="py-16 text-center text-slate-500">No messages found.</td></tr>}
                            {!loading && filteredContacts.map((contact) => (
                                <tr key={contact._id} className={`border-b border-white/5 hover:bg-white/5 transition text-sm ${contact.status === "Unread" ? "bg-white/[0.02]" : ""}`}>
                                    <td className="px-6 py-5 text-slate-300">
                                        <div className="font-semibold text-white">{contact.name}</div>
                                        <div className="text-xs text-slate-500">{contact.email}</div>
                                        <div className="text-xs text-slate-500">{contact.phone}</div>
                                    </td>
                                    <td className="px-6 py-5 text-slate-400 max-w-xs truncate">{contact.message}</td>
                                    <td className="px-6 py-5 text-slate-400">{new Date(contact.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-5">
                                        <select
                                            value={contact.status}
                                            onChange={(e) => updateStatus(contact._id, e.target.value)}
                                            className={`rounded-full px-3 py-1 font-semibold outline-none ${contact.status === "Unread" ? "bg-red-500/20 text-red-500" :
                                                    contact.status === "Read" ? "bg-sky-500/20 text-sky-500" :
                                                        "bg-green-500/20 text-green-500"
                                                }`}
                                        >
                                            <option value="Unread" className="bg-[#101B2D]">Unread</option>
                                            <option value="Read" className="bg-[#101B2D]">Read</option>
                                            <option value="Contacted" className="bg-[#101B2D]">Contacted</option>
                                            <option value="Completed" className="bg-[#101B2D]">Completed</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-5">
                                        <button onClick={() => { setSelectedContact(contact); setDeleteOpen(true); }} className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition hover:bg-red-500 hover:text-white">
                                            <FiTrash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <DeleteModal
                isOpen={deleteOpen}
                title="Delete Message"
                message={`Are you sure you want to delete the message from "${selectedContact?.name}"?`}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default Contact;
