import {
  FiArrowRight,
  FiPhoneCall,
  FiMapPin,
} from "react-icons/fi";

const ContactHero = () => {
  return (
    <section
      id="contact-hero"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* Background Glow */}

      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-sky-500/15 blur-[120px]" />

      <div className="absolute right-0 top-20 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[150px]" />

      <div className="absolute bottom-0 left-1/2 h-72 w-72 rounded-full bg-sky-400/10 blur-[120px]" />

      <div className="relative w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

        {/* Breadcrumb */}

        <div className="flex items-center gap-3 text-sm">

          <span className="cursor-pointer text-slate-400 hover:text-white transition">
            Home
          </span>

          <span className="text-slate-600">/</span>

          <span className="font-medium text-sky-400">
            Contact Us
          </span>

        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 items-center">

          {/* LEFT */}

          <div>

            <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 text-sm font-medium text-sky-300 backdrop-blur-xl">

              Contact Imprenta

            </span>

            <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] text-white">

              Let's Build

              <span className="block text-sky-400">

                Exceptional

              </span>

              Printing Solutions

            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">

              Whether you need premium packaging, labels,
              shrink sleeves, mono cartons or commercial
              printing, our specialists are ready to help
              you choose the right solution for your business.

            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-col sm:flex-row gap-5">

              <button className="group inline-flex items-center justify-center rounded-2xl bg-sky-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-sky-600 hover:scale-105">

                Get Free Consultation

                <FiArrowRight className="ml-3 transition group-hover:translate-x-1" />

              </button>

              <button className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-xl transition hover:border-sky-400">

                <FiPhoneCall className="mr-3" />

                Call Now

              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="absolute -inset-6 rounded-[40px] bg-sky-500/15 blur-[90px]" />

            <div className="relative rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

              <div className="grid gap-6">

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

                  <h3 className="text-xl font-bold text-white">

                    Head Office

                  </h3>

                  <div className="mt-5 flex gap-4">

                    <div className="mt-1">

                      <FiMapPin className="text-sky-400" size={22} />

                    </div>

                    <p className="leading-7 text-slate-300">

                      Plot No:- 822/1, Block No:- 2024/1

                      <br />

                      Rakanpur-Santej Rd, nr. Leo Polymers

                      <br />

                      Rakanpur, Gujarat 382721

                    </p>

                  </div>

                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

                    <p className="text-slate-400">

                      Experience

                    </p>

                    <h2 className="mt-3 text-4xl font-black text-white">

                      20+

                    </h2>

                    <p className="mt-2 text-slate-400">

                      Years

                    </p>

                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

                    <p className="text-slate-400">

                      Projects

                    </p>

                    <h2 className="mt-3 text-4xl font-black text-white">

                      500+

                    </h2>

                    <p className="mt-2 text-slate-400">

                      Delivered

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ContactHero;