import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiArrowUp,
} from "react-icons/fi";
import logo from "../../assets/logo/logo.png";

const FooterBottom = ({ settings }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-black border-t border-white/10">

      <div className="w-full mx-auto px-5 sm:px-6 lg:px-8 xl:px-10 py-8">

        {/* Top Row */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

          {/* Left */}

          <div className="text-center lg:text-left">

            <img
              src={logo}
              alt="Imprenta Logo"
              className="mx-auto lg:mx-0 w-auto h-10 sm:h-11 md:h-12 lg:h-14 xl:h-16 max-w-[150px] sm:max-w-[170px] md:max-w-[190px] object-contain"
            />

            <p className="mt-2 text-gray-400 text-sm">

              © {new Date().getFullYear()} Imprenta Pvt. Ltd. All Rights Reserved.


            </p>

          </div>

          {/* Payment */}

          {/* <div className="flex flex-wrap justify-center gap-3">

            <div className="px-4 py-2 rounded-lg bg-white font-semibold">
              VISA
            </div>

            <div className="px-4 py-2 rounded-lg bg-white font-semibold">
              Mastercard
            </div>

            <div className="px-4 py-2 rounded-lg bg-white font-semibold">
              RuPay
            </div>

            <div className="px-4 py-2 rounded-lg bg-white font-semibold">
              UPI
            </div>

          </div> */}

          {/* Social */}

          <div className="flex items-center gap-4">

            {(settings?.facebook || !settings) && <a
              href={settings?.facebook || "#"}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-sky-500 transition"
            >
              <FiFacebook size={20} />
            </a>}

            {(settings?.instagram || !settings) && <a
              href={settings?.instagram || "#"}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-pink-500 transition"
            >
              <FiInstagram size={20} />
            </a>}

            {(settings?.linkedin || !settings) && <a
              href={settings?.linkedin || "#"}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-blue-600 transition"
            >
              <FiLinkedin size={20} />
            </a>}

            {(settings?.youtube || !settings) && <a
              href={settings?.youtube || "#"}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-red-600 transition"
            >
              <FiYoutube size={20} />
            </a>}

          </div>

        </div>

        {/* Bottom */}

        {/* <div className="mt-8 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-sm text-gray-500 text-center">

            Designed with ❤️ for modern businesses.

          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 transition-all duration-300"
          >

            Back to Top

            <FiArrowUp />

          </button>

        </div> */}

      </div>

    </footer>
  );
};

export default FooterBottom;