import {
  FiMapPin,
  FiNavigation,
  FiClock,
} from "react-icons/fi";

const mapLocations = [
  {
    id: 1,
    title: "Corporate Office",
    address: "Gala No :- C-2, Dungra Park, GIDC, Vapi, Gujarat 396195",
    hours: "Monday - Saturday | 09:00 AM - 07:00 PM",
    iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.8341654159053!2d72.93628567595752!3d20.348468410794897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0cf9b0b7f9ebb%3A0xad1acd77551106dc!2sScancode%20Auto%20ID%20Technology%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1786100899592!5m2!1sen!2sin",
    query: "Imprenta+Private+Limited,+Rakanpur",
  },
  {
    id: 2,
    title: "Manufacturing & Factory",
    address: "Plot No: - 822/1, Block No:- 2024/1, Rakanpur Gam Road, Nr. Leo Polymers, Rakanpur, Tal:- Kalol, Dist.:- Gandhinagar Gujarat:- 382 721",
    iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.8320600476895!2d72.47980157600966!3d23.103242813311645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9dacfd05b723%3A0x7f18ea5dc570ffcb!2sImprenta%20Private%20Limited!5e0!3m2!1sen!2sin!4v1787551996425!5m2!1sen!2sin",
    hours: "Monday - Saturday | 09:00 AM - 07:00 PM",
    query: "Scancode+Auto+ID+Technology,+Vapi",
  }
];



const ContactMap = () => {
  return (
    <section className="pt-6 xl:pt-8 pb-20">
      <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19 max-w-[1920px] mx-auto">
        {/* <div className="text-center mb-16">
          <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 text-sm font-medium text-sky-300">
            Visit Our Office
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-black text-white">
            Meet Our Team
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-lg leading-8 text-slate-400">
            We'd love to meet you. Visit our offices to discuss your printing and packaging requirements.
          </p>
        </div> */}

        <div className="grid gap-8 md:grid-cols-2">
          {mapLocations.map((loc) => (
            <div key={loc.id} className="flex flex-col rounded-[36px] border border-white/10 bg-white/5 p-6 md:p-10 backdrop-blur-2xl transition-all duration-300 hover:border-sky-400/30 hover:bg-white/10 shadow-lg">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-8">{loc.title}</h3>

                <div className="space-y-6 mb-10">
                  {/* <div className="flex gap-4 items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 mt-1">
                      <FiMapPin size={24} />
                    </div>
                    <p className="leading-8 text-slate-300 text-lg pr-4">{loc.address}</p>
                  </div> */}

                  {/* <div className="flex gap-4 items-center">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400">
                      <FiClock size={24} />
                    </div>
                    <p className="leading-relaxed text-slate-300 text-lg">{loc.hours}</p>
                  </div> */}
                </div>
              </div>

              <div className="w-full overflow-hidden rounded-3xl mb-8 shadow-md border border-white/5 relative bg-slate-800">
                <iframe
                  title={`Google Map - ${loc.title}`}
                  src={loc.iframe}
                  className="w-full h-[300px] sm:h-[350px] lg:h-[400px] border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              {/* <a
                href={`https://www.google.com/maps/search/?api=1&query=${loc.query}`}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-sky-500 px-8 py-4 font-semibold text-white transition-all hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-500/30"
              >
                <FiNavigation />
                Get Directions
              </a> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactMap;