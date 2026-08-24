import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiMessageSquare,
  FiSend,
  FiUpload,
} from "react-icons/fi";

const ContactForm = () => {

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  const [termsConsent, setTermsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validateForm = () => {
    if (!form.name || !form.email || !form.phone || !form.message) {
      setErrorMsg("Please fill in all required fields (Name, Email, Phone, Message).");
      return false;
    }
    if (!termsConsent) {
      setErrorMsg("Please agree to the Terms and Privacy Policy before submitting.");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  const handleWhatsApp = () => {
    if (!validateForm()) return;
    const text = `*New Project Inquiry*
*Name:* ${form.name}
*Company:* ${form.company || 'N/A'}
*Email:* ${form.email}
*Phone:* ${form.phone}
*Service:* ${form.service || 'N/A'}
*Budget:* ${form.budget || 'N/A'}

*Message:*
${form.message}`;

    const url = `https://wa.me/919427061888?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleEmail = () => {
    if (!validateForm()) return;
    const text = `Name: ${form.name}
Company: ${form.company || 'N/A'}
Email: ${form.email}
Phone: ${form.phone}
Service: ${form.service || 'N/A'}
Budget: ${form.budget || 'N/A'}

Message:
${form.message}`;

    const url = `mailto:contact@imprenta.in?subject=${encodeURIComponent("New Project Inquiry – Imprenta")}&body=${encodeURIComponent(text)}`;
    window.location.href = url;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const Input = ({
    icon,
    name,
    placeholder,
    type = "text",
  }) => (

    <div className="relative">

      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-sky-400">
        {icon}
      </div>

      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          h-14
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/5
          pl-14
          pr-5
          text-white
          placeholder:text-slate-500
          outline-none
          transition
          focus:border-sky-400
          focus:bg-white/10
        "
      />

    </div>

  );

  return (

    <section
      id="contact-form"
      className="py-20"
    >

      <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19">

        <div className="grid gap-10 lg:grid-cols-[420px_1fr]">

          {/* LEFT */}

          <div>

            <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-5 py-2 text-sm font-medium text-sky-300">

              Let's Connect

            </span>

            <h2 className="mt-6 text-4xl font-black text-white">

              Tell Us About

              <span className="block text-sky-400">

                Your Project

              </span>

            </h2>

            <p className="mt-6 leading-8 text-slate-400">

              Fill out the form and our packaging specialists
              will contact you with the best solution based on
              your requirements.

            </p>

            <div className="mt-10 space-y-5">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                <h3 className="font-semibold text-white">

                  ✓ Free Consultation

                </h3>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                <h3 className="font-semibold text-white">

                  ✓ Fast Response

                </h3>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                <h3 className="font-semibold text-white">

                  ✓ Custom Packaging Solutions

                </h3>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

            <div className="grid gap-6 md:grid-cols-2">

              <Input
                icon={<FiUser />}
                name="name"
                placeholder="Full Name"
              />

              <Input
                icon={<FiBriefcase />}
                name="company"
                placeholder="Company Name"
              />

              <Input
                icon={<FiMail />}
                name="email"
                type="email"
                placeholder="Email Address"
              />

              <Input
                icon={<FiPhone />}
                name="phone"
                placeholder="Phone Number"
              />

              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="
                  h-14
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  text-white
                  outline-none
                  focus:border-sky-400
                "
              >
                <option value="" className="bg-[#081525]">
                  Select Service
                </option>

                <option className="bg-[#081525]">
                  Packaging
                </option>

                <option className="bg-[#081525]">
                  Labels
                </option>

                <option className="bg-[#081525]">
                  Business Cards
                </option>

                <option className="bg-[#081525]">
                  Brochure Printing
                </option>

              </select>

              <select
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className="
                  h-14
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  text-white
                  outline-none
                  focus:border-sky-400
                "
              >
                <option value="" className="bg-[#081525]">
                  Budget
                </option>

                <option className="bg-[#081525]">
                  Below ₹10,000
                </option>

                <option className="bg-[#081525]">
                  ₹10,000 - ₹50,000
                </option>

                <option className="bg-[#081525]">
                  ₹50,000+
                </option>

              </select>

            </div>

            <textarea
              rows={6}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              className="
                mt-6
                w-full
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-6
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-sky-400
              "
            />

            <div className="mt-6 flex flex-col gap-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={termsConsent}
                  onChange={(e) => {
                    setTermsConsent(e.target.checked);
                    if (e.target.checked) setErrorMsg("");
                  }}
                  className="mt-1 w-5 h-5 rounded border-white/20 bg-[#081525] text-sky-500 focus:ring-sky-500 cursor-pointer"
                />
                <span className="text-slate-300 text-sm leading-relaxed select-none">
                  I agree to the <Link to="/terms" onClick={(e) => e.stopPropagation()} className="text-sky-400 hover:underline">Terms</Link> and <Link to="/privacy-policy" onClick={(e) => e.stopPropagation()} className="text-sky-400 hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-white/20 bg-[#081525] text-sky-500 focus:ring-sky-500 cursor-pointer"
                />
                <span className="text-slate-300 text-sm leading-relaxed select-none">
                  I would like to receive communication via SMS, RCS, SMS, Email & WhatsApp services for offers, updates & transactions.
                </span>
              </label>
            </div>

            {errorMsg && <p className="mt-3 text-red-500 text-sm font-medium">{errorMsg}</p>}

            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <button
                onClick={handleWhatsApp}
                type="button"
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-[#25D366]
                  py-4
                  text-lg
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#128C7E]
                "
              >
                <FiMessageSquare />
                Send Inquiry on WhatsApp
              </button>

              <button
                onClick={handleEmail}
                type="button"
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-sky-500
                  py-4
                  text-lg
                  font-semibold
                  text-white
                  transition
                  hover:bg-sky-600
                "
              >
                <FiMail />
                Send Inquiry on Email
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>

  );

};

export default ContactForm;