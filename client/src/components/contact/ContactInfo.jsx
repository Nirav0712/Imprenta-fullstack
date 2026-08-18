import { useState, useEffect } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import { fetchSettings } from "../../services/api";

const contactCards = [
  {
    icon: <FiPhone size={26} />,
    title: "Call Us",
    value: "+91 94270 61888",
    sub: "Mon - Sat | 9:00 AM - 7:00 PM",
  },
  {
    icon: <FiMail size={26} />,
    title: "Email Us",
    value: "info@imprenta.com",
    sub: "We'll reply within 24 hours",
  },
  {
    icon: <FiMapPin size={26} />,
    title: "Visit Office",
    value: "Gala No. C-2, Dungra Park, Vapi, Gujarat-396195",
    sub: "India",
  },
  {
    icon: <FiClock size={26} />,
    title: "Working Hours",
    value: "Mon - Sat",
    sub: "09:00 AM - 07:00 PM",
  },
];

const ContactInfo = () => {
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

  const getDynamicCards = () => {
    return [
      {
        icon: <FiPhone size={26} />,
        title: "Call Us",
        value: settings?.phone || "+91 94270 61888",
        sub: "Mon - Sat | 9:00 AM - 7:00 PM",
      },
      {
        icon: <FiMail size={26} />,
        title: "Email Us",
        value: settings?.email || "info@imprenta.com",
        sub: "We'll reply within 24 hours",
      },
      {
        icon: <FiMapPin size={26} />,
        title: "Visit Office",
        value: settings?.address || "Gala No. C-2, Dungra Park, Vapi, Gujarat-396195",
        sub: "India",
      },
      {
        icon: <FiClock size={26} />,
        title: "Working Hours",
        value: "Mon - Sat",
        sub: "09:00 AM - 07:00 PM",
      },
    ];
  };

  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">

        <div className="text-center">

          <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 text-sm font-medium text-sky-300">

            Contact Information

          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-black text-white">

            We're Always Ready To Help

          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg leading-8 text-slate-400">

            Reach out through your preferred communication channel.
            Our team is available to discuss printing, packaging,
            custom branding and bulk manufacturing requirements.

          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {getDynamicCards().map((card) => (

            <div
              key={card.title}
              className="
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/10
                bg-white/5
                p-8
                backdrop-blur-2xl
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-sky-400/40
              "
            >

              {/* Glow */}

              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-500/10 blur-[80px] opacity-0 transition duration-500 group-hover:opacity-100" />

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-sky-500/10
                  text-sky-400
                  transition
                  duration-500
                  group-hover:bg-sky-500
                  group-hover:text-white
                "
              >
                {card.icon}
              </div>

              <h3 className="mt-8 text-2xl font-bold text-white">

                {card.title}

              </h3>

              <p className="mt-4 text-lg font-semibold text-sky-300 break-words">

                {card.value}

              </p>

              <p className="mt-3 leading-7 text-slate-400">

                {card.sub}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default ContactInfo;