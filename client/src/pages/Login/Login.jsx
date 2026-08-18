import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#142850] via-[#0F1F38] to-[#0D4A5A] relative overflow-hidden">

      {/* Background */}

      <div className="absolute -left-32 top-0 w-[520px] h-[520px] rounded-full bg-blue-600/20 blur-3xl"></div>

      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">

        <div className="grid w-full max-w-7xl overflow-hidden rounded-[35px] bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl lg:grid-cols-2">

          {/* Left */}

          <div className="hidden lg:flex flex-col justify-center px-16 py-20">

            <span className="mb-6 inline-block w-fit rounded-full bg-sky-500/20 px-5 py-2 text-sm font-medium text-sky-300">
              Welcome Back 👋
            </span>

            <h1 className="text-6xl font-black leading-tight text-white">

              Login

              <span className="block text-sky-400">
                to Imprenta
              </span>

            </h1>

            <p className="mt-8 max-w-lg text-lg leading-8 text-slate-300">

              Access your account, manage orders, track shipments,
              save designs and continue growing your brand with
              premium printing solutions.

            </p>

            {/* <img
              src="/images/auth/login.png"
              alt="Login"
              className="mt-12 w-full max-w-lg object-contain"
            /> */}

          </div>

          {/* Right */}

          <div className="bg-white px-6 py-10 sm:px-10 lg:px-16 lg:py-20">

            <form
              onSubmit={handleSubmit}
              className="mx-auto max-w-md"
            >

              <h2 className="text-4xl font-bold text-gray-900">
                Sign In
              </h2>

              <p className="mt-3 text-gray-500">
                Welcome back! Please login to your account.
              </p>

              {/* Email */}

              <div className="mt-10">

                <label className="mb-2 block font-medium">
                  Email Address
                </label>

                <div className="relative">

                  {/* <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" /> */}

                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full h-14 rounded-xl border border-gray-300 pl-14 pr-5 outline-none focus:border-sky-500"
                  />

                </div>

              </div>

              {/* Password */}

              <div className="mt-6">

                <label className="mb-2 block font-medium">
                  Password
                </label>

                <div className="relative">

                  {/* <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" /> */}

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full h-14 rounded-xl border border-gray-300 pl-14 pr-14 outline-none focus:border-sky-500"
                  />

                  <button
                    type="submit"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>

                </div>

              </div>

              {/* Remember + Forgot */}

              <div className="mt-6 flex items-center justify-between">

                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 accent-sky-500"
                  />

                  <span className="text-gray-600">
                    Remember me
                  </span>

                </label>

                <button
                  type="button"
                  title="Coming Soon"
                  className="text-gray-400 font-medium cursor-not-allowed opacity-70"
                >
                  Forgot Password?
                </button>

              </div>

              {/* Login Button */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-sky-500 text-lg font-semibold text-white transition-all duration-300 hover:bg-sky-600 hover:shadow-xl disabled:opacity-50"
              >

                {isSubmitting ? "Logging in..." : "Login"}

                <FiArrowRight />

              </button>

              {/* Divider */}

              <div className="my-8 flex items-center">

                <div className="h-px flex-1 bg-gray-300"></div>

                <span className="mx-4 text-gray-500">
                  OR
                </span>

                <div className="h-px flex-1 bg-gray-300"></div>

              </div>

              {/* Google */}

              <button
                type="button"
                title="Coming Soon"
                className="flex h-14 w-full items-center justify-center gap-4 rounded-xl border border-gray-300 bg-white font-medium transition hover:bg-gray-50 text-gray-500 opacity-60 cursor-not-allowed"
              >

                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-6 w-6"
                />

                Continue with Google (Coming Soon)

              </button>

              {/* Signup */}

              <p className="mt-8 text-center text-gray-600">

                Don't have an account?

                <Link
                  to="/signup"
                  className="ml-2 font-semibold text-sky-600 hover:text-sky-700"
                >
                  Create Account
                </Link>

              </p>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Login;