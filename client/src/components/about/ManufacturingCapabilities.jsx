import {
  FiTag,
  FiPackage,
  FiBox,
  FiLayers,
  FiBriefcase,
  FiAward
} from "react-icons/fi";

import { manufacturingCapabilities } from "../../data/aboutData";

const icons = [
  <FiTag size={34} />,
  <FiPackage size={34} />,
  <FiBox size={34} />,
  <FiLayers size={34} />,
  <FiBriefcase size={34} />,
  <FiAward size={34} />,
];

const ManufacturingCapabilities = () => {
  return (
    <section className="py-24">

      <div className="w-full w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

        {/* Heading */}
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 text-sm font-semibold text-sky-300">
            Manufacturing
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-black text-white">
            Our Manufacturing
            <span className="block text-sky-400">
              Capabilities
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            Complete packaging solutions manufactured with precision,
            consistency and strict quality standards across every stage.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-16 grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {manufacturingCapabilities.map((item, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-sky-400/30 hover:shadow-[0_20px_60px_rgba(56,189,248,0.15)]"
            >

              {/* Glow */}

              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100"></div>

              <div className="relative">

                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-400">

                  {icons[index]}

                </div>

                <h3 className="mt-8 text-2xl font-bold text-white">

                  {item.title}

                </h3>

                <p className="mt-5 leading-8 text-slate-400">

                  {item.description}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default ManufacturingCapabilities;