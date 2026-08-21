import { useState } from "react";
import {
  FiCpu,
  FiLayers,
  FiCheckCircle,
  FiAperture,
  FiTruck,
  FiUsers,
} from "react-icons/fi";

const features = [
  {
    title: "Engineering-First Approach",
    description: "Every packaging product is structurally engineered to survive production, logistics, and retail environments without compromising quality.",
    icon: <FiCpu className="text-3xl" />,
  },
  {
    title: "End-to-End Manufacturing",
    description: "From structural design to high-volume printing and logistics—all handled seamlessly under one integrated roof.",
    icon: <FiLayers className="text-3xl" />,
  },
  {
    title: "Consistent Quality",
    description: "Rigorous inspection protocols ensure zero defects and exact color matching across every single production batch.",
    icon: <FiCheckCircle className="text-3xl" />,
  },
  {
    title: "Advanced Printing Technology",
    description: "State-of-the-art Flexographic, Offset, Gravure, and Digital capabilities ready for any product scale and complexity.",
    icon: <FiAperture className="text-3xl" />,
  },
  {
    title: "Reliable Delivery",
    description: "Robust supply chain tracking and guaranteed turnaround times to keep your production and retail shelves fully stocked.",
    icon: <FiTruck className="text-3xl" />,
  },
  {
    title: "Built for Partnerships",
    description: "We integrate with your supply chain, predicting demand and storing inventory for rapid, seamless deployment logistics.",
    icon: <FiUsers className="text-3xl" />,
  },
];

const WhyChooseSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-24 relative overflow-hidden bg-[#020813]">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[40vw] h-[40vw] rounded-full bg-sky-500/5 blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[40vw] h-[40vw] rounded-full bg-cyan-400/5 blur-[120px]"></div>
      </div>

      {/* Global Padding Container */}
      <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19 relative z-10 mx-auto max-w-[1920px]">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-7 lg:mb-15">
          <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 text-sm font-semibold text-sky-300 backdrop-blur-xl">
            Why Imprenta
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight max-w-4xl">
            Why Leading Brands <span className="text-sky-400 block sm:inline">Choose Imprenta</span>
          </h2>
        </div>

        {/* Desktop Radial/Orbital Layout */}
        <div className="hidden lg:flex relative items-center justify-center min-h-[650px] w-full">

          {/* Central Core Graphic */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none">
            <div className="relative w-56 h-56 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-sky-400/10 animate-[spin_30s_linear_infinite]"></div>
              <div className="absolute inset-4 rounded-full border border-dotted border-cyan-400/30 animate-[spin_20s_linear_infinite_reverse]"></div>
              <div className="absolute inset-10 rounded-full border border-sky-500/30 bg-sky-950/40 backdrop-blur-md shadow-[0_0_40px_rgba(56,189,248,0.15)] flex items-center justify-center">
                <div className="relative z-10 flex flex-col items-center justify-center text-center w-full h-full">
                  <span className="font-bold text-white tracking-[0.2em] text-sm uppercase opacity-90 relative z-10">Imprenta</span>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cyan-400/20 blur-md animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Orbital Features Grid */}
          <div className="grid grid-cols-2 gap-x-[400px] gap-y-12 xl:gap-y-16 w-full max-w-7xl relative z-10">
            {features.map((feature, idx) => {
              const isHovered = activeIndex === idx;
              const isDimmed = activeIndex !== null && activeIndex !== idx;
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={`relative flex items-center ${isLeft ? 'justify-end text-right' : 'justify-start text-left'} transition-all duration-500 ease-out ${isDimmed ? 'opacity-30 scale-95' : 'opacity-100 scale-100 relative z-30'}`}
                >
                  {/* Connecting Data Line */}
                  <div className={`absolute top-9 h-[1px] bg-gradient-to-r ${isLeft ? 'from-transparent to-sky-400/40 -right-[40px] xl:-right-[200px]' : 'from-sky-400/40 to-transparent -left-[40px] xl:-left-[200px]'} w-[80px] xl:w-[240px] pointer-events-none`}>
                    {/* Moving light pulse */}
                    <div className={`absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] ${isHovered ? 'animate-pulse' : 'opacity-20'} ${isLeft ? 'right-0' : 'left-0'}`}></div>
                  </div>

                  {/* Feature Block */}
                  <div className={`group flex flex-col ${isLeft ? 'items-end' : 'items-start'} max-w-[340px] cursor-pointer`}>
                    <div className={`flex items-center gap-5 mb-2 ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 ${isHovered ? 'bg-gradient-to-br from-sky-500/20 to-sky-900/30 border-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.3)]' : 'bg-white/5 border-white/10'} text-sky-400`}>
                        {feature.icon}
                      </div>
                      <h3 className={`text-xl xl:text-2xl font-bold transition-all duration-300 ${isHovered ? 'text-white' : 'text-slate-300'}`}>{feature.title}</h3>
                    </div>

                    <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isHovered ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <p className="text-slate-400 leading-relaxed text-sm xl:text-base pt-4 pb-2">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile / Tablet Interactive Timeline Layout */}
        <div className="flex lg:hidden flex-col gap-4 sm:gap-6 relative z-10 max-w-3xl mx-auto">
          {/* Vertical Center Connector Line */}
          <div className="absolute left-[39px] sm:left-[47px] top-8 bottom-8 w-px bg-white/10"></div>

          {features.map((feature, idx) => {
            const isHovered = activeIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveIndex(isHovered ? idx : null)}
                className="relative pl-[88px] sm:pl-[120px] pr-2 sm:pr-4 py-2 cursor-pointer transition-all duration-300"
              >
                {/* Timeline Dot Identifier */}
                <div className={`absolute left-[39px] sm:left-[47px] top-[42px] sm:top-[46px] h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 ${isHovered ? 'border-sky-400 bg-sky-500 shadow-[0_0_15px_rgba(56,189,248,0.5)] scale-125' : 'border-white/20 bg-[#061224] scale-100'} transition-all duration-500 -translate-x-1/2 -translate-y-1/2 z-10`}></div>

                {/* Expandable Accordion Panel */}
                <div className={`p-5 sm:p-6 rounded-3xl border transition-all duration-500 ${isHovered ? 'border-sky-400/40 bg-gradient-to-br from-white/10 to-sky-900/20 backdrop-blur-xl shadow-[0_15px_40px_rgba(56,189,248,0.15)]' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'}`}>
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all duration-500 ${isHovered ? 'text-cyan-400 border-sky-400/30' : 'text-slate-400'}`}>
                      {feature.icon}
                    </div>
                    <h3 className={`text-lg sm:text-xl font-bold leading-tight transition-colors duration-300 ${isHovered ? 'text-white' : 'text-slate-300'}`}>{feature.title}</h3>
                  </div>

                  <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isHovered ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                    <div className="overflow-hidden">
                      <p className="text-slate-400 text-sm sm:text-base leading-relaxed pt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseSection;