import React, { useState } from "react";
import { Mail, Lock, LogIn, UserPlus, User, ArrowRight } from "lucide-react";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Form Submitted:",
      isLogin ? "Login Mode" : "Signup Mode",
      formData
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-50">
        <div className="flex p-2 bg-blue-50/50 m-6 rounded-2xl">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
              isLogin
                ? "bg-white text-green-600 shadow-md"
                : "text-green-400 hover:text-green-500"
            }`}
          >
            <LogIn size={18} /> Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
              !isLogin
                ? "bg-white text-green-600 shadow-md"
                : "text-green-400 hover:text-green-500"
            }`}
          >
            <UserPlus size={18} /> Sign Up
          </button>
        </div>

        <div className="px-8 pb-8">
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-[#1b4332]">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-[#2d6a4f] mt-2 font-medium">
                {isLogin
                  ? "Enter your credentials to access your dashboard."
                  : "Fill in the details below to get started with CalSci."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-[#1b4332] ml-1">
                    Username
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1b4332]"
                      size={19}
                    />
                    <input
                      name="username"
                      type="text"
                      placeholder="johndoe"
                      className="w-full pl-10 pr-4 py-3 bg-green-50/50 border border-green-100 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all duration-200"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-semibold text-[#1b4332] ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1b4332]"
                    size={19}
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="hello@calsci.com"
                    className="w-full pl-10 pr-4 py-3 bg-green-50/50 border border-green-100 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all duration-200"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-[#1b4332]">
                    Password
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      className="text-xs text-[#1b4332] hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1b4332]
                  "
                    size={19}
                  />
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-green-50/50 border border-green-100 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all duration-200"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-green-600 hover:bg-green-700 active:scale-95 text-white rounded-xl font-bold shadow-lg shadow-green-200 transition-all duration-200 flex items-center justify-center gap-2 mt-4"
              >
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-[#1b4332]">
                {isLogin ? "Don't have an account?" : "Already a member?"}{" "}
                <button
                  onClick={toggleMode}
                  className="text-[#1b4332] font-bold hover:underline"
                >
                  {isLogin ? "Register Now" : "Login here"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
