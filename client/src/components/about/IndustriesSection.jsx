import {
  FiShoppingBag,
  FiShield,
  FiDroplet,
  FiTool,
  FiCpu,
  FiGlobe,
} from "react-icons/fi";

import { industries } from "../../data/aboutData";

const icons = [
  <FiShoppingBag size={34} />,
  <FiShield size={34} />,
  <FiDroplet size={34} />,
  <FiTool size={34} />,
  <FiCpu size={34} />,
  <FiGlobe size={34} />,
];

const IndustriesSection = () => {
  return (
    <section className="py-24">

      <div className="w-full w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 text-sm font-semibold text-sky-300 backdrop-blur-xl">

            Industries

          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-black text-white">

            Industries

            <span className="block text-sky-400">

              We Serve

            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">

            Delivering dependable packaging and branding solutions across
            diverse industries where quality, durability and consistency
            matter.

          </p>

        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 items-stretch">
          {industries.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-5 sm:p-6 lg:p-4 xl:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-sky-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] flex flex-col items-center text-center justify-center h-full gap-4 sm:gap-5"
            >
              {/* Glow Overlay */}
              <div className="absolute inset-0 bg-sky-500/5 opacity-0 transition duration-500 group-hover:opacity-100 pointer-events-none"></div>

              {/* Icon */}
              <div className="h-12 w-12 sm:h-16 sm:w-16 lg:h-12 lg:w-12 xl:h-16 xl:w-16 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:bg-sky-500/20 group-hover:text-sky-400 group-hover:scale-110 transition-all duration-500 relative z-10 shrink-0">
                {icons[index]}
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base lg:text-[13px] xl:text-base font-bold text-white relative z-10 leading-snug">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default IndustriesSection;