import React from 'react';
import { FiMessageSquare, FiPenTool, FiBox, FiSettings, FiCheckCircle, FiTruck } from 'react-icons/fi';

const steps = [
    {
        id: 1,
        title: "Consultation",
        description: "We begin by understanding your exact requirements, brand guidelines, and packaging goals to suggest the most optimal technical specifications.",
        icon: <FiMessageSquare size={24} />,
    },
    {
        id: 2,
        title: "Design & Development",
        description: "Our structural and graphic design teams collaborate to create precise die-lines, layouts, and stunning visual prototypes tailored for production.",
        icon: <FiPenTool size={24} />,
    },
    {
        id: 3,
        title: "Sampling",
        description: "Before full-scale production, we fabricate physical prototypes. This allows you to verify the form, fit, and finish of the packaging in real life.",
        icon: <FiBox size={24} />,
    },
    {
        id: 4,
        title: "Manufacturing",
        description: "Using state-of-the-art European offset and flexo presses, we execute high-volume printing with exact color calibration and specialty finishes.",
        icon: <FiSettings size={24} />,
    },
    {
        id: 5,
        title: "Quality Inspection",
        description: "Every batch undergoes rigorous quality control checks for color consistency, structural integrity, and defect elimination.",
        icon: <FiCheckCircle size={24} />,
    },
    {
        id: 6,
        title: "Delivery",
        description: "Punctual, secure, and pan-India logistics ensure your packaging materials arrive safely and precisely when your assembly lines need them.",
        icon: <FiTruck size={24} />,
    }
];

const Process = () => {
    return (
        <div className="bg-[#0F1F38] min-h-screen pt-32 pb-24 font-sans text-white">
            <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">
                <div className="text-center mb-16">
                    <h4 className="text-sky-400 font-bold uppercase tracking-wider text-sm mb-3">Workflow</h4>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Our Process</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">A systematic and transparent approach from initial conceptualization to final delivery.</p>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[24px] md:left-1/2 md:-ml-[1px] top-6 bottom-6 w-[2px] bg-sky-500/20"></div>

                    <div className="flex flex-col space-y-12 md:space-y-0">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={step.id} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''} group`}>

                                    {/* Center Dot */}
                                    <div className="absolute left-[24px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-12 h-12 bg-[#0F1F38] rounded-full border-4 border-sky-500/20 group-hover:border-sky-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-all duration-300 z-10 -ml-[24px] md:ml-0 mt-2 md:mt-0">
                                        <span className="text-sky-400 font-bold">{step.id}</span>
                                    </div>

                                    {/* Content Card */}
                                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'} py-2`}>
                                        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-xl hover:bg-white/10 hover:border-sky-400/50 transition-all duration-300 group-hover:-translate-y-1">
                                            <div className={`flex items-center mb-4 gap-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                                <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400 flex-shrink-0">
                                                    {step.icon}
                                                </div>
                                                <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                                            </div>
                                            <p className="text-slate-300 leading-relaxed text-sm md:text-base">{step.description}</p>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Process;
