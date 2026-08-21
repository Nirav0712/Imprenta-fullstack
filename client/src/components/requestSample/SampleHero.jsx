import {
  FiArrowRight,
  FiBox,
  FiLayers,
  FiGrid,
  FiStar,
} from "react-icons/fi";

const stats = [
  {
    number: "2000+",
    title: "Premium Templates",
    icon: <FiGrid size={20} />,
  },
  {
    number: "50+",
    title: "Industries",
    icon: <FiBox size={20} />,
  },
  {
    number: "100%",
    title: "Customizable",
    icon: <FiLayers size={20} />,
  },
  {
    number: "4.9★",
    title: "Customer Rating",
    icon: <FiStar size={20} />,
  },
];

const SampleHero = () => {
  return (
    <section className="relative overflow-hidden pt-24 pb-20">

      {/* Background Blur */}

      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-sky-500/10 blur-[130px]" />

      <div className="absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[150px]" />

      <div className="absolute bottom-0 left-1/2 h-72 w-72 rounded-full bg-sky-400/10 blur-[120px]" />

      <div className="relative z-10 w-full w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <span className="inline-flex items-center rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 text-sm font-semibold text-sky-300 backdrop-blur-xl">

              Design Gallery

            </span>

            <h1 className="mt-8 text-4xl sm:text-5xl xl:text-6xl font-black leading-tight text-white">

              Discover

              <span className="block text-sky-400">

                Premium Templates

              </span>

              For Every Product

            </h1>

            <p className="mt-8 max-w-2xl text-base sm:text-lg leading-8 text-slate-400">

              Browse professionally designed business cards, packaging,
              labels, stickers, brochures and marketing templates.
              Personalize every design with your own branding and request
              a production-ready sample before placing your order.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <button className="group rounded-2xl bg-sky-500 px-8 py-4 font-semibold text-white transition hover:bg-sky-600">

                Explore Templates

                <FiArrowRight className="ml-2 inline transition group-hover:translate-x-1" />

              </button>

              <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:border-sky-400 hover:bg-white/10">

                View Categories

              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

              <div className="grid grid-cols-2 gap-5">

                {stats.map((item) => (

                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:border-sky-400/40 hover:bg-white/10"
                  >

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-300">

                      {item.icon}

                    </div>

                    <h3 className="mt-5 text-3xl font-black text-white">

                      {item.number}

                    </h3>

                    <p className="mt-2 text-slate-400">

                      {item.title}

                    </p>

                  </div>

                ))}

              </div>

              {/* Bottom Card */}

              <div className="mt-6 rounded-3xl border border-sky-400/20 bg-sky-500/10 p-6">

                <h3 className="text-xl font-bold text-white">

                  Need Something Unique?

                </h3>

                <p className="mt-3 leading-7 text-slate-300">

                  Upload your own artwork or collaborate with our design
                  experts to create a completely custom template tailored
                  to your business.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default SampleHero;