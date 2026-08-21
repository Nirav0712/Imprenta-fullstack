import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "What printing services does Imprenta provide?",
    answer:
      "We provide premium labels, shrink sleeves, mono cartons, flexible packaging, business cards, brochures, commercial printing and customized packaging solutions.",
  },
  {
    question: "Can I request a physical sample before placing a bulk order?",
    answer:
      "Yes. You can request a product sample so you can verify material quality, printing finish and colors before final production.",
  },
  {
    question: "What artwork formats do you accept?",
    answer:
      "We accept AI, PDF, PSD, EPS, CDR, PNG and high-resolution JPG files for commercial printing.",
  },
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "MOQ depends on the product type and printing process. Contact our team for product-specific requirements.",
  },
  {
    question: "How long does production take?",
    answer:
      "Production time depends on quantity and product type. Standard jobs are generally completed within a few working days after artwork approval.",
  },
  {
    question: "Do you deliver across India?",
    answer:
      "Yes. We provide safe and reliable delivery services across India.",
  },
];

const FAQ = () => {

  const [open, setOpen] = useState(0);

  return (

    <section className="py-24">

      <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

        <div className="text-center">

          <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 text-sm font-medium text-sky-300">

            Frequently Asked Questions

          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-black text-white">

            Have Questions?

          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">

            Find answers to the most common questions about our
            printing and packaging services.

          </p>

        </div>

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="
                overflow-hidden
                rounded-[28px]
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
              "
            >

              <button
                onClick={() =>
                  setOpen(open === index ? -1 : index)
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  px-8
                  py-6
                  text-left
                "
              >

                <h3 className="text-lg font-semibold text-white">

                  {faq.question}

                </h3>

                <FiChevronDown
                  className={`transition duration-300 ${
                    open === index
                      ? "rotate-180 text-sky-400"
                      : "text-slate-400"
                  }`}
                  size={24}
                />

              </button>

              <div
                className={`transition-all duration-500 overflow-hidden ${
                  open === index
                    ? "max-h-96"
                    : "max-h-0"
                }`}
              >

                <div className="px-8 pb-8 text-slate-400 leading-8">

                  {faq.answer}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

};

export default FAQ;