import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(formData);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#142850] via-[#0F1F38] to-[#0D4A5A] relative overflow-hidden">

      {/* Background */}

      <div className="absolute -left-32 top-0 w-[520px] h-[520px] rounded-full bg-blue-600/20 blur-3xl"></div>

      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">

        <div className="grid w-full max-w-7xl overflow-hidden rounded-[35px] bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl lg:grid-cols-2">

          {/* Left */}

          <div className="hidden lg:flex flex-col justify-center px-16 py-20">

            <span className="inline-block w-fit rounded-full bg-sky-500/20 px-5 py-2 text-sm text-sky-300">
              🚀 Join Imprenta
            </span>

            <h1 className="mt-6 text-6xl font-black leading-tight text-white">
              Create
              <span className="block text-sky-400">
                Your Account
              </span>
            </h1>

            <p className="mt-8 text-lg leading-8 text-slate-300 max-w-lg">
              Start ordering premium printed products, manage your orders,
              save designs and grow your business with Imprenta.
            </p>

            {/* <img
              src="/images/auth/signup.png"
              alt="Signup"
              className="mt-12 w-full max-w-lg"
            /> */}

          </div>

          {/* Right */}

          <div className="bg-white px-6 py-10 sm:px-10 lg:px-16 lg:py-16">

            <form
              onSubmit={handleSubmit}
              className="mx-auto max-w-md"
            >
              <h2 className="text-4xl font-bold">
                Create Account
              </h2>

              <p className="mt-3 text-gray-500">
                Register your Imprenta account.
              </p>

              {/* Name */}

              <div className="mt-8">

                <label className="mb-2 block font-medium">
                  Full Name
                </label>

                <div className="relative">

                  <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full h-14 rounded-xl border border-gray-300 pl-14 pr-5 outline-none focus:border-sky-500"
                  />

                </div>

              </div>

              {/* Email */}

              <div className="mt-5">

                <label className="mb-2 block font-medium">
                  Email
                </label>

                <div className="relative">

                  <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email"
                    className="w-full h-14 rounded-xl border border-gray-300 pl-14 pr-5 outline-none focus:border-sky-500"
                  />

                </div>

              </div>

              {/* Phone */}

              <div className="mt-5">

                <label className="mb-2 block font-medium">
                  Mobile Number
                </label>

                <div className="relative">

                  <FiPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter mobile number"
                    className="w-full h-14 rounded-xl border border-gray-300 pl-14 pr-5 outline-none focus:border-sky-500"
                  />

                </div>

              </div>

              {/* Password */}

              <div className="mt-5">

                <label className="mb-2 block font-medium">
                  Password
                </label>

                <div className="relative">

                  <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Password"
                    className="w-full h-14 rounded-xl border border-gray-300 pl-14 pr-14 outline-none focus:border-sky-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>

                </div>

              </div>

              {/* Confirm Password */}

              <div className="mt-5">

                <label className="mb-2 block font-medium">
                  Confirm Password
                </label>

                <div className="relative">

                  <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm password"
                    className="w-full h-14 rounded-xl border border-gray-300 pl-14 pr-14 outline-none focus:border-sky-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-5 top-1/2 -translate-y-1/2"
                  >
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                  </button>

                </div>

              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 w-full h-14 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold flex items-center justify-center gap-3 disabled:opacity-50 transition"
              >

                {isSubmitting ? "Creating Account..." : "Create Account"}

                <FiArrowRight />

              </button>

              <div className="my-8 flex items-center">

                <div className="flex-1 h-px bg-gray-300"></div>

                <span className="mx-4 text-gray-500">
                  OR
                </span>

                <div className="flex-1 h-px bg-gray-300"></div>

              </div>

              <button type="button" className="w-full h-14 rounded-xl border border-gray-300 flex items-center justify-center gap-4 hover:bg-gray-50 text-gray-500 transition opacity-60 cursor-not-allowed" title="Coming Soon">

                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-6 h-6"
                />

                Continue with Google (Coming Soon)

              </button>

              <p className="mt-8 text-center text-gray-600">

                Already have an account?

                <Link
                  to="/login"
                  className="ml-2 font-semibold text-sky-600"
                >
                  Login
                </Link>

              </p>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Signup;