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
    value: "info@imprenta.in",
    sub: "We'll reply within 24 hours",
  },
  // {
  //   icon: <FiMapPin size={26} />,
  //   title: "Registered Office",
  //   value: "Gala No :- C-2, Dungra Park, GIDC, Vapi, Gujarat 396195",
  // },
  {
    icon: <FiClock size={26} />,
    title: "Working Hours",
    value: "Mon - Sat",
    sub: "09:00 AM - 07:00 PM",
  },
  // {
  //   icon: <FiMapPin size={26} />,
  //   title: "Manufacturing & Factory",
  //   value: "Plot No: - 822/1, Block No:- 2024/1, Rakanpur Gam Road, Nr. Leo Polymers, Rakanpur, Tal:- Kalol, Dist.:- Gandhinagar Gujarat:- 382 721",
  // },
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
        value: settings?.email || "contact@imprenta.in",
        sub: "We'll reply within 24 hours",
      },
      // {
      //   icon: <FiMapPin size={26} />,
      //   title: "Registered Office",
      //   value: "Gala No :- C-2, Dungra Park, GIDC, Vapi, Gujarat 396195",
      // },
      {
        icon: <FiClock size={26} />,
        title: "Working Hours",
        value: "Mon - Sat",
        sub: "09:00 AM - 07:00 PM",
      },
      // {
      //   icon: <FiMapPin size={26} />,
      //   title: "Manufacturing & Factory",
      //   value: "Plot No: - 822/1, Block No:- 2024/1, Rakanpur Gam Road, Nr. Leo Polymers, Rakanpur, Tal:- Kalol, Dist.:- Gandhinagar Gujarat:- 382 721",
      // },
    ];
  };

  return (
    <section className="pt-20 pb-0">

      <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 xl:gap-8">

          {getDynamicCards().map((card) => {
            let layoutClasses = "";
            switch (card.title) {
              case "Call Us":
                layoutClasses = "md:col-span-1 lg:col-span-2 order-1";
                break;
              case "Email Us":
                layoutClasses = "md:col-span-1 lg:col-span-2 order-2";
                break;
              case "Working Hours":
                layoutClasses = "md:col-span-2 lg:col-span-2 order-4 lg:order-3";
                break;
              case "Registered Office":
                layoutClasses = "md:col-span-2 lg:col-span-3 order-3 lg:order-4";
                break;
              case "Manufacturing & Factory":
                layoutClasses = "md:col-span-2 lg:col-span-3 order-5";
                break;
              default:
                layoutClasses = "md:col-span-2 lg:col-span-2 order-last";
            }

            return (
              <div
                key={card.title}
                className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-8 xl:p-10 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_-20px_rgba(14,165,233,0.15)] hover:border-sky-400/30 flex flex-col h-full ${layoutClasses}`}
              >

                {/* Glow */}
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-500/10 blur-[80px] opacity-0 transition duration-700 group-hover:opacity-100" />

                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 transition-all duration-500 group-hover:bg-sky-500 group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]"
                >
                  {card.icon}
                </div>

                <div className="mt-8 flex flex-col flex-grow">
                  <h3 className="text-xl xl:text-2xl font-bold text-white tracking-wide">
                    {card.title}
                  </h3>

                  <p className="mt-4 text-base xl:text-lg font-medium text-sky-300 leading-relaxed">
                    {card.value}
                  </p>

                  {card.sub && (
                    <p className="mt-4 text-sm xl:text-base leading-relaxed text-slate-400 font-medium">
                      {card.sub}
                    </p>
                  )}
                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default ContactInfo;