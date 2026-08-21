import {
  FiMapPin,
  FiNavigation,
  FiClock,
} from "react-icons/fi";

const ContactMap = () => {
  return (
    <section className="py-20">

      <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

        <div className="grid gap-10 lg:grid-cols-[420px_1fr]">

          {/* Left Card */}

          <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

            <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 text-sm font-medium text-sky-300">

              Visit Our Office

            </span>

            <h2 className="mt-6 text-4xl font-black text-white">

              Meet Our Team

            </h2>

            <p className="mt-6 leading-8 text-slate-400">

              We'd love to meet you. Visit our office to discuss
              your printing and packaging requirements.

            </p>

            <div className="mt-10 space-y-6">

              <div className="flex gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400">

                  <FiMapPin size={24} />

                </div>

                <div>

                  <h3 className="font-bold text-white">

                    Office Address

                  </h3>

                  <p className="mt-2 leading-7 text-slate-400">

                    Gala No. C-2, Dungra Park

                    <br />

                    Vapi, Gujarat

                    <br />

                    India

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400">

                  <FiClock size={24} />

                </div>

                <div>

                  <h3 className="font-bold text-white">

                    Office Hours

                  </h3>

                  <p className="mt-2 leading-7 text-slate-400">

                    Monday - Saturday

                    <br />

                    09:00 AM - 07:00 PM

                  </p>

                </div>

              </div>

            </div>

            <button
              className="
                mt-10
                inline-flex
                items-center
                gap-3
                rounded-2xl
                bg-sky-500
                px-8
                py-4
                font-semibold
                text-white
                transition
                hover:bg-sky-600
              "
            >

              <FiNavigation />

              Get Directions

            </button>

          </div>

          {/* Map */}

         <div className="w-full overflow-hidden rounded-2xl">
  <iframe
    title="Google Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.8341654159053!2d72.93628567595752!3d20.348468410794897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0cf9b0b7f9ebb%3A0xad1acd77551106dc!2sScancode%20Auto%20ID%20Technology%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1786100899592!5m2!1sen!2sin"
    className="h-[600px] w-full border-0"
    allowFullScreen
    loading="lazy"
    referrerPolicy="strict-origin-when-cross-origin"
  />
</div>

        </div>

      </div>

    </section>
  );
};

export default ContactMap;