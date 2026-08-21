import { FiArrowRight, FiCheckCircle, FiBox, FiCpu, FiShield } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AboutHero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">

      {/* Background Glow */}

      <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-sky-500/10 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-[150px]" />

      <div className="relative w-full w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="relative">

            <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 text-sm font-semibold text-sky-300 backdrop-blur-xl relative z-10">
              About Imprenta
            </span>

            {/* Rotating Quality Badge */}
            <div className="absolute -top-4 right-0 sm:-top-6 sm:right-8 lg:-top-12 lg:right-16 w-24 h-24 lg:w-28 lg:h-28 flex items-center justify-center z-0 pointer-events-none opacity-80">
              {/* Thin Premium Border Glow */}
              <div className="absolute inset-0 rounded-full border border-sky-400/30 bg-sky-950/20 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.2)]"></div>
              {/* Rotating SVG */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite] text-sky-300 drop-shadow-[0_0_5px_rgba(56,189,248,0.4)]">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text fontSize="10.5" fontWeight="700" fill="currentColor" letterSpacing="1.2">
                  <textPath href="#circlePath" startOffset="0%">
                    GUARANTEED • PREMIUM QUALITY •
                  </textPath>
                </text>
              </svg>
              {/* Center Checkmark */}
              <div className="relative z-10 bg-[#061224] rounded-full p-2 shadow-inner border border-white/5">
                <FiCheckCircle className="text-xl text-sky-400" />
              </div>
            </div>

            <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-white">
              Engineering
              <span className="block text-sky-400">
                Packaging
              </span>
              That Performs
            </h1>

            {/* Rotating Quality Badge */}
            {/* <div className="absolute -top-4 right-0 sm:top-4 sm:-right-6 lg:top-8 xl:-right-16 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 flex items-center justify-center z-20 pointer-events-none">
              <div className="absolute inset-0 rounded-full border border-sky-400/20 bg-sky-500/5 backdrop-blur-sm shadow-[0_0_20px_rgba(56,189,248,0.2)]"></div>
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite] text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]">
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                <text fontSize="10.5" fontWeight="900" fill="currentColor" letterSpacing="1.5">
                  <textPath href="#circlePath" startOffset="0%">
                    100% GUARANTEED • PREMIUM QUALITY •
                  </textPath>
                </text>
              </svg>
              <div className="relative z-10 bg-[#061224] rounded-full p-2 shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                <FiCheckCircle className="text-xl sm:text-2xl text-sky-400" />
              </div>
            </div> */}

            <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-300">

              Imprenta Private Limited manufactures packaging that performs
              beyond appearance. Every label, shrink sleeve, mono carton,
              plastic tube and branding material is engineered to survive
              production, logistics, retail shelves and customer handling
              without compromising quality.

            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-5">

              <button
                onClick={() => navigate("/contact#contact-form")}
                className="flex items-center justify-center gap-3 rounded-2xl bg-sky-500 hover:bg-sky-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105"
              >
                Request a Quote

                <FiArrowRight />
              </button>

              <button onClick={() => navigate('/products')} className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl px-8 py-4 text-lg font-semibold text-white transition hover:border-sky-400 hover:bg-white/10">

                Explore Products

              </button>

            </div>

          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 items-stretch mt-12 lg:mt-0">
            <div className="group rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 hover:border-sky-400/50 hover:shadow-[0_0_40px_rgba(56,189,248,0.15)] transition-all duration-500 shadow-2xl relative overflow-hidden flex flex-col justify-start h-full">
              <div className="h-14 w-14 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                <FiBox className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">End-to-End Packaging</h3>
              <p className="text-slate-400 leading-relaxed relative z-10">Design, manufacturing, quality inspection and logistics seamlessly integrated.</p>
            </div>

            <div className="group rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 hover:border-sky-400/50 hover:shadow-[0_0_40px_rgba(56,189,248,0.15)] transition-all duration-500 shadow-2xl relative overflow-hidden flex flex-col justify-start h-full">
              <h3 className="text-5xl font-black text-sky-400 mb-2 relative z-10">2</h3>
              <h4 className="text-lg font-bold text-white mb-3 relative z-10">Manufacturing Units</h4>
              <p className="text-slate-400 text-sm leading-relaxed relative z-10">State-of-the-art facilities ensuring high-volume capacity and rapid turnarounds.</p>
            </div>

            <div className="group rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 hover:border-sky-400/50 hover:shadow-[0_0_40px_rgba(56,189,248,0.15)] transition-all duration-500 shadow-2xl relative overflow-hidden flex flex-col justify-start h-full">
              <div className="absolute -top-4 -right-4 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <FiCpu className="text-9xl text-cyan-400" />
              </div>
              <div className="relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <FiCpu className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Advanced Manufacturing</h3>
                <p className="text-slate-400 leading-relaxed">Flexographic, Offset, Gravure and cutting-edge Digital printing workflows.</p>
              </div>
            </div>

            <div className="group rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 hover:border-sky-400/50 hover:shadow-[0_0_40px_rgba(56,189,248,0.15)] transition-all duration-500 shadow-2xl relative overflow-hidden flex flex-col justify-start h-full">
              <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-6 group-hover:bg-sky-500/20 group-hover:text-sky-400 transition-colors duration-500 relative z-10">
                <FiShield className="text-3xl" />
              </div>
              <div className="flex items-baseline gap-2 mb-3 relative z-10">
                <h3 className="text-4xl font-black text-white">100%</h3>
                <span className="text-sm font-bold text-sky-400 uppercase tracking-widest">Quality</span>
              </div>
              <p className="text-slate-400 leading-relaxed relative z-10">Rigorous inspection protocols and prototype approvals prior to production runs.</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

export default AboutHero;