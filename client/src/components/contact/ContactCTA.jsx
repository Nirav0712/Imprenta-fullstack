import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiPhoneCall,
} from "react-icons/fi";
import { fetchSettings } from "../../services/api";

const ContactCTA = () => {
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
    <section className="relative py-24 overflow-hidden">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-sky-500/10 blur-[160px]" />

      <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[180px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">

        <div
          className="
          relative
          overflow-hidden
          rounded-[40px]
          border
          border-white/10
          bg-gradient-to-br
          from-[#102947]
          via-[#12385D]
          to-[#0B223F]
          backdrop-blur-3xl
          shadow-[0_25px_80px_rgba(0,0,0,.35)]
        "
        >

          {/* Decorative Glow */}

          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-sky-500/10 blur-[130px]" />

          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-[150px]" />

          <div className="relative grid gap-14 px-8 py-14 lg:grid-cols-[1fr_340px] lg:px-16 lg:py-20">

            {/* Left */}

            <div>

              <span
                className="
                inline-flex
                items-center
                rounded-full
                border
                border-sky-400/20
                bg-sky-500/10
                px-5
                py-2
                text-sm
                font-semibold
                text-sky-300
              "
              >
                Premium Printing Solutions
              </span>

              <h2
                className="
                mt-7
                text-4xl
                font-black
                leading-tight
                text-white
                lg:text-6xl
              "
              >
                Ready To Elevate

                <span className="block text-sky-400">

                  Your Brand?

                </span>

              </h2>

              <p
                className="
                mt-7
                max-w-2xl
                text-lg
                leading-8
                text-slate-300
              "
              >
                Get expert guidance for premium packaging,
                labels, commercial printing and customized
                branding solutions tailored specifically for
                your business.
              </p>

            </div>

            {/* Right */}

            <div
              className="
              flex
              flex-col
              justify-center
              gap-5
            "
            >

              <Link
                to="/request-sample"
                className="
                  group
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-sky-500
                  px-8
                  py-5
                  text-lg
                  font-bold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-sky-400
                "
              >

                Request Sample

                <FiArrowRight className="transition group-hover:translate-x-1" />

              </Link>

              <a
                href={settings?.phone ? `tel:${settings.phone}` : "tel:+919427061888"}
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-8
                  py-5
                  text-lg
                  font-semibold
                  text-white
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-sky-400
                  hover:bg-white/10
                "
              >

                <FiPhoneCall />

                Contact Our Experts

              </a>

              <div
                className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
                text-center
              "
              >

                <h4 className="text-white font-bold text-xl">

                  Need Immediate Help?

                </h4>

                <p className="mt-2 text-slate-400">

                  Mon – Sat • 9:00 AM – 7:00 PM

                </p>

                <p className="mt-4 text-2xl font-black text-sky-400">

                  {settings?.phone || "+91 94270 61888"}

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ContactCTA;