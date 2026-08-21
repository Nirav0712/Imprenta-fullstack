import React from "react";

const services = [
    { title: "Shrink Sleeves", desc: "High quality shrink sleeves" },
    { title: "Mono Cartons", desc: "Printed retail mono cartons" },
    { title: "Seamless Plastic Tubes", desc: "Seamless extrusion tubes" },
    { title: "Corporate Branding", desc: "Corporate branding materials" },
    { title: "Design Services", desc: "Professional design services" },
    { title: "Labels", desc: "Premium quality custom labels" },
];

const WhatWeOffer = () => {
    return (
        <section className="py-24">
            <div className="w-full w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 text-sm font-semibold text-sky-300 backdrop-blur-xl">
                        WHAT WE OFFER
                    </span>
                    <h2 className="mt-6 text-4xl md:text-5xl font-black text-white">
                        Our <span className="text-sky-400">Services</span>
                    </h2>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {services.map((item, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-[60px_12px_60px_12px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-sky-400/40 hover:bg-white/[0.08] hover:shadow-[0_20px_60px_rgba(56,189,248,0.15)]"
                        >
                            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100"></div>
                            <div className="relative">
                                <div className="relative inline-flex mb-8">
                                    <div className="absolute inset-0 rounded-[35%_65%_60%_40%/45%_35%_65%_55%] bg-sky-500/20 blur-xl opacity-0 transition duration-500 group-hover:opacity-100"></div>
                                    <div
                                        className="
                      relative
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-[35%_65%_60%_40%/45%_35%_65%_55%]
                      border
                      border-sky-400/20
                      bg-gradient-to-br
                      from-sky-500/20
                      via-cyan-500/10
                      to-transparent
                      backdrop-blur-xl
                      text-sky-300
                      transition-all
                      duration-500
                      group-hover:scale-110
                      group-hover:rotate-6
                      group-hover:border-sky-400/40
                      text-2xl
                      font-bold
                    "
                                    >
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white leading-snug">
                                    {item.title}
                                </h3>
                                <p className="mt-4 text-sm sm:text-base leading-7 text-slate-400">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatWeOffer;
