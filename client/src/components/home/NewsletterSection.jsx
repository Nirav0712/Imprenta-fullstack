import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHomepage, getImageUrl } from "../../services/api";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import defaultNewsletterImage from "../../assets/images/newsletter/newsletter.png";

const NewsletterSection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchHomepage();
        console.log("== DEBUG NEWSLETTER API RESPONSE ==");
        console.log("Full Res:", res);
        console.log("Res Data:", res?.data);
        console.log("NewsletterImage directly:", res?.data?.newsletterImage);

        if (res?.data) setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return null;
  if (data && data.newsletterEnabled === false) return null;

  const image = data?.newsletterImage ? getImageUrl(data.newsletterImage) : defaultNewsletterImage;
  const heading = data?.newsletterHeading || "Final";
  const description = data?.newsletterDescription || "Partner with us today and start experiencing premium quality packaging and branding designed specifically for your industry's demands.";
  const btnText = data?.newsletterButtonText || "Get in Touch";
  const btnLink = data?.newsletterButtonLink || "/contact";

  return (
    <section className="py-20 bg-transparent relative z-10">
      <div className="w-full mx-auto px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

        {/* Dynamic Premium Container */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-8 lg:p-12 items-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] group overflow-hidden relative">

          {/* Subtle Glow Overlay */}
          <div className="absolute inset-0 bg-sky-400/5 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>

          {/* Left: Dynamic Image */}
          <div className="relative z-10">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <img
                src={image}
                alt="Newsletter"
                className="w-full h-full object-cover max-h-[500px] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/30 to-transparent mix-blend-overlay"></div>
            </div>
          </div>

          {/* Right: Dynamic Content */}
          <div className="relative z-10 flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {heading}
            </h2>

            <p className="mt-5 text-lg sm:text-xl text-slate-300 leading-relaxed font-medium">
              {description}
            </p>

            <div className="mt-10 flex justify-center lg:justify-start">
              {btnLink.startsWith("http") ? (
                <a
                  href={btnLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-3 rounded-2xl bg-sky-500 px-8 py-4 sm:px-10 sm:py-5 text-lg font-semibold text-white transition-all duration-300 hover:bg-sky-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
                >
                  {btnText} <FiArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              ) : (
                <Link
                  to={btnLink}
                  className="group/btn inline-flex items-center gap-3 rounded-2xl bg-sky-500 px-8 py-4 sm:px-10 sm:py-5 text-lg font-semibold text-white transition-all duration-300 hover:bg-sky-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
                >
                  {btnText} <FiArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;