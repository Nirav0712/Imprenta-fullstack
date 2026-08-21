import React from 'react';
import { FiLinkedin, FiTwitter } from 'react-icons/fi';

const teamMembers = [
    {
        id: 1,
        name: "Vikram Sharma",
        designation: "Chief Executive Officer",
        description: "Visionary leader with 20+ years in the packaging and printing industry.",
        image: "https://placehold.co/400x400/0F1F38/38BDF8?text=VS"
    },
    {
        id: 2,
        name: "Priya Patel",
        designation: "Head of Design",
        description: "Award-winning designer specializing in innovative unboxing experiences.",
        image: "https://placehold.co/400x400/0F1F38/38BDF8?text=PP"
    },
    {
        id: 3,
        name: "Rajesh Kumar",
        designation: "Production Manager",
        description: "Ensures flawless execution and quality control across all manufacturing lines.",
        image: "https://placehold.co/400x400/0F1F38/38BDF8?text=RK"
    },
    {
        id: 4,
        name: "Anita Desai",
        designation: "Client Relations",
        description: "Dedicated to ensuring the highest level of customer satisfaction and support.",
        image: "https://placehold.co/400x400/0F1F38/38BDF8?text=AD"
    }
];

const Team = () => {
    return (
        <div className="bg-[#0F1F38] min-h-screen pt-32 pb-24 font-sans text-white">
            <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">
                <div className="text-center mb-16">
                    <h4 className="text-sky-400 font-bold uppercase tracking-wider text-sm mb-3">Our People</h4>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Meet the Team</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">The dedicated professionals driving innovation and quality at Imprenta.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member) => (
                        <div key={member.id} className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-sky-400/50 transition-all duration-300">
                            <div className="aspect-square bg-[#0a1526] overflow-hidden relative">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F38] via-transparent to-transparent opacity-90"></div>
                            </div>
                            <div className="p-6 relative z-10 -mt-16">
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-sky-400 transition-colors">{member.name}</h3>
                                <p className="text-sky-400 text-sm font-semibold mb-4">{member.designation}</p>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">{member.description}</p>

                                <div className="flex items-center gap-3">
                                    <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sky-500 transition-colors">
                                        <FiLinkedin size={14} />
                                    </button>
                                    <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sky-500 transition-colors">
                                        <FiTwitter size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;
