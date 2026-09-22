import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchExpos, fetchHomepage, getImageUrl } from "../../services/api";
import { FiArrowRight, FiCalendar, FiMapPin } from "react-icons/fi";
import defaultNewsletterImage from "../../assets/images/newsletter/newsletter.png";

const NewsletterSection = () => {
  const [expos, setExpos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [fallbackData, setFallbackData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        // 1. Try fetching published expos
        const expoRes = await fetchExpos();
        const activeExpos = (expoRes?.expos || []).filter(
          (item) => item.status === "published" || !item.status
        );

        if (isMounted) {
          if (activeExpos.length > 0) {
            setExpos(activeExpos);
          } else {
            // 2. Fallback to homepage CMS data if no expos exist
            const homeRes = await fetchHomepage();
            if (homeRes?.data) {
              setFallbackData(homeRes.data);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load expo/newsletter section data:", err);
        try {
          const homeRes = await fetchHomepage();
          if (isMounted && homeRes?.data) {
            setFallbackData(homeRes.data);
          }
        } catch (fallbackErr) {
          console.error("Failed to load fallback CMS data:", fallbackErr);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-switch expos every 2 seconds if more than 1 expo exists and not hovered
  useEffect(() => {
    if (expos.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % expos.length);
    }, 2000); // 2 seconds duration as requested

    return () => clearInterval(interval);
  }, [expos.length, isHovered]);

  if (loading) return null;

  // If no expos and fallback disabled, don't show
  if (expos.length === 0 && fallbackData?.newsletterEnabled === false) {
    return null;
  }

  // Determine current item content (Expo or Fallback CMS)
  const isExpo = expos.length > 0;
  const currentExpo = isExpo ? expos[currentIndex] : null;

  const image = isExpo
    ? currentExpo?.heroImage ||
      (currentExpo?.heroSlideImages && currentExpo.heroSlideImages[0]) ||
      defaultNewsletterImage
    : fallbackData?.newsletterImage
    ? getImageUrl(fallbackData.newsletterImage)
    : defaultNewsletterImage;

  const heading = isExpo
    ? currentExpo?.heroHeading
      ? currentExpo.heroHeading.includes("🌍")
        ? currentExpo.heroHeading
        : `🌍 ${currentExpo.heroHeading}`
      : `🌍 Meet Us at ${currentExpo?.name || "PACK EXPO"}!`
    : fallbackData?.newsletterHeading || "🌍 Meet Us at PACK EXPO International 2026!";

  const description = isExpo
    ? currentExpo?.heroDescription ||
      currentExpo?.shortDescription ||
      "We're excited to participate in the upcoming expo. Visit Imprenta Private Limited at our booth and discover our innovative packaging solutions. Let's connect, collaborate, and explore new opportunities. We look forward to welcoming you at our stall!"
    : fallbackData?.newsletterDescription ||
      "We're excited to participate in PACK EXPO International 2026, Chicago. 📍 Visit Imprenta Private Limited at our booth and discover our innovative packaging solutions. 🤝 Let's connect, collaborate, and explore new opportunities. We look forward to welcoming you at our stall!";

  const btnText = isExpo
    ? currentExpo?.primaryButtonText || "Get In Touch"
    : fallbackData?.newsletterButtonText || "Get In Touch";

  const btnLink = isExpo
    ? currentExpo?.slug
      ? `/expo/${currentExpo.slug}`
      : "/contact"
    : fallbackData?.newsletterButtonLink || "/contact";

  return (
    <section
      className="py-16 sm:py-20 bg-transparent relative z-10 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="w-full mx-auto px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">
        {/* Dynamic Premium Container */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-14 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-8 lg:p-10 xl:p-12 items-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] group overflow-hidden relative transition-all duration-500">
          {/* Subtle Glow Overlay */}
          <div className="absolute inset-0 bg-sky-400/5 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>

          {/* Left: Dynamic Image with Smooth Transition */}
          <div className="relative z-10 w-full flex items-center justify-center">
            <div
              key={isExpo ? `img-${currentExpo?._id || currentIndex}` : "img-cms"}
              className="relative w-full rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.35)] border border-white/10 animate-fadeIn transition-all duration-500 bg-[#071120]"
            >
              <img
                src={image}
                alt={currentExpo?.name || "Expo Showcase"}
                className="w-full h-[280px] sm:h-[360px] md:h-[400px] lg:h-[420px] xl:h-[460px] object-cover rounded-2xl transition-transform duration-700 hover:scale-[1.02]"
                onError={(e) => {
                  e.target.src = defaultNewsletterImage;
                }}
              />
            </div>
          </div>

          {/* Right: Dynamic Content with Smooth Transition */}
          <div
            key={isExpo ? `content-${currentExpo?._id || currentIndex}` : "content-cms"}
            className="relative z-10 flex flex-col justify-center text-center lg:text-left animate-fadeIn transition-all duration-500"
          >
            {/* Meta Tags / Badges if Expo */}
            {isExpo && (currentExpo?.eventDate || currentExpo?.city || currentExpo?.boothNumber) && (
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
                {currentExpo?.eventDate && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 px-3 py-1 text-xs font-semibold text-sky-300">
                    <FiCalendar size={12} className="text-sky-400" />
                    {currentExpo.eventDate}
                  </span>
                )}
                {currentExpo?.city && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-slate-300">
                    <FiMapPin size={12} className="text-sky-400" />
                    {currentExpo.city}
                  </span>
                )}
                {currentExpo?.boothNumber && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 px-3 py-1 text-xs font-bold text-cyan-300">
                    {currentExpo.boothNumber}
                  </span>
                )}
              </div>
            )}

            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-black text-white leading-tight">
              {heading}
            </h2>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-medium line-clamp-4 sm:line-clamp-none">
              {description}
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {btnLink.startsWith("http") ? (
                <a
                  href={btnLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-8 py-3.5 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 hover:bg-sky-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
                >
                  <span>{btnText}</span>
                  <FiArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              ) : (
                <Link
                  to={btnLink}
                  className="group/btn inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-8 py-3.5 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 hover:bg-sky-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
                >
                  <span>{btnText}</span>
                  <FiArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              )}

              {/* Dots / Indicator if multiple expos exist */}
              {expos.length > 1 && (
                <div className="flex items-center gap-2 mt-4 sm:mt-0 sm:ml-4">
                  {expos.map((expoItem, idx) => (
                    <button
                      key={expoItem._id || idx}
                      onClick={() => setCurrentIndex(idx)}
                      title={expoItem.name}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        currentIndex === idx
                          ? "w-8 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                          : "w-2.5 bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;