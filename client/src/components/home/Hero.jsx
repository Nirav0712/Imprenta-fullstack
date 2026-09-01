import { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import heroSlidesFallback from "../../data/heroSlides";
import { Link } from "react-router-dom";
import { fetchHeroSlides } from "../../services/api";

const Hero = () => {

  const [activeSlide, setActiveSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch dynamic slides
    const getSlides = async () => {
      try {
        const res = await fetchHeroSlides();
        if (res?.data && res.data.length > 0) {
          setSlides(res.data);
        } else {
          setSlides(heroSlidesFallback);
        }
      } catch (error) {
        console.error("Failed to load slides:", error);
        setSlides(heroSlidesFallback);
      } finally {
        setIsLoading(false);
      }
    };
    getSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  if (isLoading || slides.length === 0) {
    return <section className="min-h-screen flex items-center justify-center bg-[#0C1626]"></section>;
  }

  const slide = slides[activeSlide];

  // Format heading
  let heading1 = "", heading2 = "", heading3 = "";
  if (slide.heading) {
    const parts = slide.heading.split('\n');
    heading1 = parts[0] || "";
    heading2 = parts[1] || "";
    heading3 = parts[2] || "";
  } else {
    heading1 = slide.title1 || "";
    heading2 = slide.title2 || "";
    heading3 = slide.title3 || "";
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-8">

      {/* Background Overlay */}
      <div className="absolute inset-0 opacity-90" style={{ backgroundImage: 'linear-gradient(to right, var(--theme-background), transparent)' }}></div>

      <div className="relative z-10 w-full w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-sky-400/10 blur-[130px]"></div>
          <div className="absolute right-0 top-20 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[150px]"></div>
          <div className="absolute bottom-0 left-1/2 h-64 w-64 rounded-full bg-sky-400/10 blur-[120px]"></div>

          {/* LEFT CONTENT */}
          <div
            key={activeSlide}
            className="animate-fadeLeft text-center lg:text-left"
          >

            {/* Badge */}
            <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 text-sm font-medium text-sky-300 backdrop-blur-xl">
              {slide.badge || "Imprenta"}
            </span>

            {/* Heading */}
            <h1 className="mt-6 sm:mt-8 text-4xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.08] text-white">
              {heading1}
              {heading2 && (
                <span className="block text-sky-400">{heading2}</span>
              )}
              {heading3 && (
                <span className="block">{heading3}</span>
              )}
            </h1>

            {/* Description */}
            <p className="mx-auto lg:mx-0 mt-5 sm:mt-8 max-w-xl text-sm sm:text-lg lg:text-xl leading-7 sm:leading-8 text-slate-300 whitespace-pre-line">
              {slide.description}
            </p>

            {/* Buttons */}
            <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto">

              <Link
                to={slide.primaryButtonLink || "/request-wizard"}
                className="
                  group
                  w-full sm:w-auto
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-[var(--theme-button)]
                  text-[var(--theme-heading)]
                  px-6 sm:px-8
                  py-3.5 sm:py-4
                  text-base sm:text-lg
                  font-semibold
                  shadow-lg
                  transition-all
                  duration-300
                  hover:opacity-90
                  hover:scale-[1.02]
                  active:scale-[0.98]
                "
              >
                {slide.primaryButtonText || "Request a Sample"}
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to={slide.secondaryButtonLink || "/request-wizard"}
                className="
                  w-full sm:w-auto
                  flex items-center justify-center gap-2
                  rounded-2xl
                  border border-white/15
                  bg-white/5
                  backdrop-blur-xl
                  px-6 sm:px-8
                  py-3.5 sm:py-4
                  text-base sm:text-lg
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:border-sky-400
                  hover:bg-white/10
                  active:scale-[0.98]
                "
              >
                {slide.secondaryButtonText || "Request a Quote"} <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">

            {/* Static Glow */}
            <div className="absolute -inset-8 rounded-[50px] bg-sky-500/20 blur-[90px]"></div>

            <div
              key={activeSlide + "img"}
              className="relative animate-fadeRight"
            >
              {slide.image ? (
                <img
                  src={slide.image}
                  alt={heading1}
                  className="
                    w-full
                    h-full
                    rounded-[30px]
                    object-cover
                    animate-floating
                    animate-zoom
                    transition-all
                    duration-700
                  "
                />
              ) : (
                <div className="
                  w-full
                  h-full
                  min-h-[350px]
                  lg:min-h-[500px]
                  rounded-[30px]
                  bg-white/5
                  border border-white/10
                  backdrop-blur-xl
                  flex flex-col items-center justify-center
                  animate-floating
                  animate-zoom
                  transition-all
                  duration-700
                  text-center
                  p-8
                ">
                  <span className="text-2xl sm:text-3xl font-bold text-sky-200/60 tracking-wider uppercase">
                    {slide.placeholder || "Image"}
                  </span>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Indicators */}
        <div className="mt-12 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ${activeSlide === index
                ? "w-12 bg-sky-400"
                : "w-3 bg-white/30"
                }`}
            />
          ))}
        </div>

      </div>

    </section>
  );
};

export default Hero;