import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiChevronRight
} from "react-icons/fi";
import NewsletterSection from "../home/NewsletterSection";
import ContactCTA from "../contact/ContactCTA";
import { fetchSettings } from "../../services/api";
import logo from "../../assets/logo/logo.png";

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const getSettings = async () => {
      try {
        const res = await fetchSettings();
        if (res?.data) {
          setSettings(res.data);
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };
    getSettings();
  }, []);

  return (
    <>
      <NewsletterSection />
      <ContactCTA />

      <footer className="relative bg-[#050B14] border-t border-white/10 pt-20 pb-8 overflow-hidden z-20">

        {/* Background Ambient Glows (Imprenta Theme) */}
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-sky-500/5 blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-400/5 blur-[150px] pointer-events-none"></div>

        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19 relative z-10">

          {/* 4-COLUMN GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 xl:gap-14 mb-16">

            {/* COLUMN 1: BRAND */}
            <div className="flex flex-col gap-6">
              <Link to="/" className="inline-block">
                <img src={logo} alt="Imprenta Logo" className="h-10 sm:h-12 w-auto object-contain" />
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs md:max-w-sm">
                Design, print and grow your business with premium quality packaging, commercial printing, labels, and customized branding products tailored for your success.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3 mt-2">
                <a href={settings?.facebook || "#"} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-sky-500 hover:border-sky-500 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:-translate-y-1">
                  <FiFacebook size={18} />
                </a>
                <a href={settings?.instagram || "#"} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-pink-500 hover:border-pink-500 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:-translate-y-1">
                  <FiInstagram size={18} />
                </a>
                <a href={settings?.linkedin || "#"} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:-translate-y-1">
                  <FiLinkedin size={18} />
                </a>
                <a href={settings?.youtube || "#"} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:-translate-y-1">
                  <FiYoutube size={18} />
                </a>
              </div>
            </div>

            {/* COLUMN 2: QUICK LINKS */}
            <div className="lg:ml-6">
              <h3 className="text-white font-bold text-lg mb-7 relative inline-block">
                Quick Links
                <span className="absolute -bottom-3 left-0 w-[40px] h-[2px] bg-gradient-to-r from-sky-400 to-transparent rounded-full"></span>
              </h3>
              <ul className="flex flex-col gap-4">
                <li><Link to="/" className="text-slate-400 hover:text-sky-400 transition-all text-sm font-medium flex items-center gap-2 group"><FiChevronRight size={14} className="text-sky-500/40 group-hover:text-sky-400 transition-transform group-hover:translate-x-1" /> Home</Link></li>
                <li><Link to="/about" className="text-slate-400 hover:text-sky-400 transition-all text-sm font-medium flex items-center gap-2 group"><FiChevronRight size={14} className="text-sky-500/40 group-hover:text-sky-400 transition-transform group-hover:translate-x-1" /> About Us</Link></li>
                <li><Link to="/process" className="text-slate-400 hover:text-sky-400 transition-all text-sm font-medium flex items-center gap-2 group"><FiChevronRight size={14} className="text-sky-500/40 group-hover:text-sky-400 transition-transform group-hover:translate-x-1" /> Services</Link></li>
                <li><Link to="/products" className="text-slate-400 hover:text-sky-400 transition-all text-sm font-medium flex items-center gap-2 group"><FiChevronRight size={14} className="text-sky-500/40 group-hover:text-sky-400 transition-transform group-hover:translate-x-1" /> Products</Link></li>
                <li><Link to="/blog" className="text-slate-400 hover:text-sky-400 transition-all text-sm font-medium flex items-center gap-2 group"><FiChevronRight size={14} className="text-sky-500/40 group-hover:text-sky-400 transition-transform group-hover:translate-x-1" /> Blog</Link></li>
                <li><Link to="/contact" className="text-slate-400 hover:text-sky-400 transition-all text-sm font-medium flex items-center gap-2 group"><FiChevronRight size={14} className="text-sky-500/40 group-hover:text-sky-400 transition-transform group-hover:translate-x-1" /> Contact Us</Link></li>
              </ul>
            </div>

            {/* COLUMN 3: SERVICES & PRODUCTS */}
            <div>
              <h3 className="text-white font-bold text-lg mb-7 relative inline-block">
                Services & Products
                <span className="absolute -bottom-3 left-0 w-[40px] h-[2px] bg-gradient-to-r from-cyan-400 to-transparent rounded-full"></span>
              </h3>
              <ul className="flex flex-col gap-4">
                <li><Link to="/products?category=shrink-sleeves" className="text-slate-400 hover:text-cyan-400 transition-all text-sm font-medium flex items-center gap-2 group"><FiChevronRight size={14} className="text-cyan-500/40 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" /> Shrink Sleeves</Link></li>
                <li><Link to="/products?category=mono-cartons" className="text-slate-400 hover:text-cyan-400 transition-all text-sm font-medium flex items-center gap-2 group"><FiChevronRight size={14} className="text-cyan-500/40 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" /> Mono Cartons</Link></li>
                <li><Link to="/products?category=seamless-plastic-tubes" className="text-slate-400 hover:text-cyan-400 transition-all text-sm font-medium flex items-center gap-2 group"><FiChevronRight size={14} className="text-cyan-500/40 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" /> Seamless Plastic Tubes</Link></li>
                <li><Link to="/products?category=corporate-branding" className="text-slate-400 hover:text-cyan-400 transition-all text-sm font-medium flex items-center gap-2 group"><FiChevronRight size={14} className="text-cyan-500/40 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" /> Corporate Branding</Link></li>
                <li><Link to="/products?category=design-services" className="text-slate-400 hover:text-cyan-400 transition-all text-sm font-medium flex items-center gap-2 group"><FiChevronRight size={14} className="text-cyan-500/40 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" /> Design Services</Link></li>
                <li><Link to="/products?category=labels" className="text-slate-400 hover:text-cyan-400 transition-all text-sm font-medium flex items-center gap-2 group"><FiChevronRight size={14} className="text-cyan-500/40 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" /> Custom Labels & Stickers</Link></li>
              </ul>
            </div>

            {/* COLUMN 4: CONTACT US */}
            <div>
              <h3 className="text-white font-bold text-lg mb-7 relative inline-block">
                Contact Us
                <span className="absolute -bottom-3 left-0 w-[40px] h-[2px] bg-gradient-to-r from-sky-400 to-transparent rounded-full"></span>
              </h3>
              <ul className="flex flex-col gap-6 text-sm text-slate-400">
                <li>
                  <a href={`tel:${settings?.phone || "+919427061888"}`} className="flex items-start gap-4 hover:text-sky-400 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                      <FiPhone className="text-sky-400 group-hover:text-white transition-colors" size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1">Phone Number</span>
                      <span className="font-semibold text-slate-300 text-sm group-hover:text-sky-300 transition-colors">{settings?.phone || "+91 94270 61888"}</span>
                    </div>
                  </a>
                </li>

                <li>
                  <a href={`mailto:${settings?.email || "info@imprenta.com"}`} className="flex items-start gap-4 hover:text-sky-400 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                      <FiMail className="text-cyan-400 group-hover:text-white transition-colors" size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                        Email Address
                      </span>

                      <span
                        className="font-semibold text-slate-300 text-sm break-all group-hover:text-cyan-300 transition-colors"
                      >
                        {settings?.email || "contact@imprenta.in"}
                      </span>
                    </div>
                  </a>
                </li>

                <li>
                  <div className="flex items-start gap-4 group cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-all duration-300">
                      <FiMapPin className="text-sky-400" size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1">Head Office</span>
                      <span className="leading-relaxed text-slate-300 text-sm group-hover:text-slate-200 transition-colors">{settings?.address || "Plot No:- 822/1, Block No:- 2024/1, Rakanpur-Santej Rd, nr. Leo Polymers, Rakanpur, Gujarat 382721"}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* COPYRIGHT BOTTOM */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5 text-sm text-slate-400">
            <p className="text-center md:text-left">© {new Date().getFullYear()} Imprenta Pvt. Ltd. All Rights Reserved.</p>
            <div className="flex flex-wrap justify-center items-center gap-6 font-medium">
              <Link to="/privacy-policy" className="hover:text-sky-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-sky-400 transition-colors">Terms & Conditions</Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;