import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FiCalendar,
  FiMapPin,
  FiArrowRight,
  FiTag,
  FiClock,
  FiUsers,
  FiCheckCircle,
} from "react-icons/fi";
import { fetchExpos } from "../../services/api";

const Expo = () => {
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadExpos = async () => {
      try {
        setLoading(true);
        const res = await fetchExpos();
        setExpos(res?.expos || []);
      } catch (error) {
        console.error("Failed to load expos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadExpos();
  }, []);

  const featuredExpo = expos.length > 0 ? expos[0] : null;
  const otherExpos = expos.length > 1 ? expos.slice(1) : [];

  return (
    <div className="bg-[#0F1F38] min-h-screen pt-32 pb-24 font-sans text-white">
      <Helmet>
        <title>Expos & Global Events | Imprenta Packaging Solutions</title>
        <meta
          name="description"
          content="Meet Imprenta at premier international packaging, printing, and branding exhibitions worldwide. Schedule dedicated meetings with our packaging experts."
        />
      </Helmet>

      <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 border border-sky-400/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-400 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            Global Exhibitions & Events
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Meet Imprenta Worldwide
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Connect with our team at leading packaging, label, and printing expos across the globe. Secure one-on-one appointments and discover our multi-format capabilities.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-slate-400 py-20 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-semibold animate-pulse">Loading upcoming Expos...</p>
          </div>
        ) : expos.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-slate-400 max-w-xl mx-auto space-y-4 backdrop-blur-xl">
            <FiCalendar size={48} className="text-sky-400 mx-auto opacity-60" />
            <h3 className="text-2xl font-bold text-white">No Upcoming Expos Scheduled</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We are finalizing our upcoming exhibition calendar. Please check back soon or get in touch directly to discuss your packaging requirements.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-4 rounded-xl bg-sky-500 px-6 py-3 text-sm font-bold text-white hover:bg-sky-400 transition"
            >
              Contact Our Team
            </Link>
          </div>
        ) : (
          <>
            {/* Featured Expo Showcase Banner (Pixel-Perfect Match with Reference SS 2) */}
            {featuredExpo && (
              <Link
                to={`/expo/${featuredExpo.slug}`}
                className="group block mb-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-8 lg:p-10 xl:p-12 hover:border-sky-400/50 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden relative"
              >
                {/* Subtle Glow Overlay */}
                <div className="absolute inset-0 bg-sky-400/5 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 items-center relative z-10">
                  {/* Left: Featured Image (Landscape Aspect Ratio matching SS 2) */}
                  <div className="w-full flex items-center justify-center">
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.35)] border border-white/10 bg-[#071120]">
                      <img
                        src={
                          featuredExpo.heroImage ||
                          "https://res.cloudinary.com/dkenmez3t/image/upload/v1788338383/imprenta/products/yop399ugb8snu2ye5i4s.png"
                        }
                        alt={featuredExpo.name}
                        className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  {/* Right: Content details matching SS 2 */}
                  <div className="flex flex-col justify-center text-left">
                    {/* Meta Badges Row */}
                    <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-semibold">
                      {featuredExpo.eventDate && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 px-3 py-1 text-xs font-semibold text-sky-300">
                          <FiCalendar size={12} className="text-sky-400" /> {featuredExpo.eventDate}
                        </span>
                      )}
                      {(featuredExpo.city || featuredExpo.venue) && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-slate-300">
                          <FiMapPin size={12} className="text-sky-400" /> {featuredExpo.city || featuredExpo.venue}
                        </span>
                      )}
                      {featuredExpo.boothNumber && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 px-3 py-1 text-xs font-bold text-cyan-300">
                          {featuredExpo.boothNumber}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 group-hover:text-sky-400 transition-colors leading-tight">
                      {featuredExpo.heroHeading
                        ? featuredExpo.heroHeading.includes("🌎") || featuredExpo.heroHeading.includes("🌍")
                          ? featuredExpo.heroHeading
                          : `🌎 ${featuredExpo.heroHeading}`
                        : `🌎 Meet Imprenta at ${featuredExpo.name}`}
                    </h2>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium line-clamp-3">
                      {featuredExpo.heroDescription || featuredExpo.shortDescription}
                    </p>

                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2.5 rounded-2xl bg-sky-500 px-8 py-3.5 text-base font-semibold text-white group-hover:bg-sky-400 group-hover:scale-[1.02] transition-all shadow-[0_0_25px_rgba(56,189,248,0.35)]">
                        Schedule a Meeting <FiArrowRight />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Other Expos Grid */}
            {otherExpos.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white border-b border-white/10 pb-4">
                  All Scheduled Exhibitions
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherExpos.map((item) => (
                    <Link
                      to={`/expo/${item.slug}`}
                      key={item._id}
                      className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-sky-400/50 hover:-translate-y-1.5 transition-all duration-300 shadow-xl"
                    >
                      <div className="aspect-video overflow-hidden bg-[#0A1220] relative">
                        <img
                          src={
                            item.heroImage ||
                            "https://res.cloudinary.com/dkenmez3t/image/upload/v1788338383/imprenta/products/yop399ugb8snu2ye5i4s.png"
                          }
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-sky-400 flex items-center gap-1">
                              <FiCalendar size={12} /> {item.eventDate || "Upcoming"}
                            </span>
                            <span className="text-slate-400">{item.city}</span>
                          </div>

                          <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-2 leading-snug">
                            {item.name}
                          </h3>

                          {item.venue && (
                            <p className="text-xs text-slate-400 flex items-center gap-1">
                              <FiMapPin size={12} className="text-sky-400" /> {item.venue}
                            </p>
                          )}

                          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                            {item.shortDescription || item.heroDescription}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                          <span className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors flex items-center gap-1.5">
                            View Expo Details <FiArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Expo;
