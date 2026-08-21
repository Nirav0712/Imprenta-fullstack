import featuredBanner from "../../data/featuredBanner";

const FeaturedBanner = () => {
  return (
    <section className="py-16 bg-white">

      <div className="w-full mx-auto px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {featuredBanner.map((item) => (

            <div
              key={item.id}
              className="relative overflow-hidden rounded-xl group"
            >

              {/* Background */}

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[520px] object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Overlay Card */}

              <div className="absolute left-6 bottom-6 bg-white/95 rounded-3xl p-8 max-w-[420px] shadow-xl">

                <h2 className="text-4xl font-bold leading-tight">

                  {item.title}

                </h2>

                <p className="mt-5 text-xl">

                  {item.price}

                </p>

                <div className="flex flex-wrap gap-3 mt-8">

                  {item.buttons.map((btn, index) => (

                    <button
                      key={index}
                      className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 duration-300"
                    >

                      {btn}

                    </button>

                  ))}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturedBanner;