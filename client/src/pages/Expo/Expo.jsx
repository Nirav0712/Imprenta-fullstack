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
            {/* Featured Expo Showcase Banner */}
            {featuredExpo && (
              <Link
                to={`/expo/${featuredExpo.slug}`}
                className="group block mb-16 bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-sky-400/50 transition-all duration-500 shadow-2xl"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="w-full lg:w-3/5 aspect-video lg:aspect-auto lg:h-[480px] overflow-hidden bg-[#0A1220] relative">
                    <img
                      src={
                        featuredExpo.heroImage ||
                        "https://res.cloudinary.com/dkenmez3t/image/upload/v1788338383/imprenta/products/yop399ugb8snu2ye5i4s.png"
                      }
                      alt={featuredExpo.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1220]/80 via-transparent to-transparent lg:hidden"></div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-2/5 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-5 text-xs font-semibold">
                      <span className="bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 border border-sky-400/30">
                        <FiTag size={12} /> Featured Event
                      </span>
                      {featuredExpo.eventDate && (
                        <span className="text-slate-300 flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                          <FiCalendar size={12} className="text-sky-400" /> {featuredExpo.eventDate}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 group-hover:text-sky-400 transition-colors leading-tight">
                      {featuredExpo.name}
                    </h2>

                    <div className="flex items-center gap-2 text-slate-300 text-sm mb-4 font-medium">
                      <FiMapPin className="text-sky-400 shrink-0" />
                      <span>
                        {featuredExpo.city ? `${featuredExpo.city} • ` : ""}
                        {featuredExpo.venue || "Exhibition Center"}
                      </span>
                    </div>

                    {featuredExpo.boothNumber && (
                      <div className="text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-400/20 px-3 py-1.5 rounded-lg w-fit mb-5">
                        {featuredExpo.boothNumber}
                      </div>
                    )}

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 line-clamp-3">
                      {featuredExpo.heroDescription || featuredExpo.shortDescription}
                    </p>

                    <div className="mt-auto">
                      <span className="inline-flex items-center gap-2 text-sky-400 font-bold group-hover:gap-3 transition-all text-base">
                        Explore Expo & Book Meeting <FiArrowRight />
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
