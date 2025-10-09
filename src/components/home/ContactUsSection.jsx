import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const BackgroundBubbles = () => {
  return (
    <>
      <style>{`
        @keyframes float1 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-25px) rotate(5deg); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-30px) rotate(-5deg); } }
      `}</style>
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <div
          className="absolute bg-gradient-to-br from-blue-800 to-indigo-500 rounded-full filter blur-3xl opacity-30"
          style={{
            width: "450px",
            height: "450px",
            top: "5%",
            left: "10%",
            animation: "float1 5s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bg-gradient-to-br from-purple-800 to-pink-500 rounded-full filter blur-3xl opacity-30"
          style={{
            width: "400px",
            height: "400px",
            bottom: "5%",
            right: "10%",
            animation: "float2 5s ease-in-out infinite alternate",
          }}
        ></div>
      </div>
    </>
  );
};

const ContactUsSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const WEB3FORMS_ACCESS_KEY = "ac7c8776-a78d-4732-b1a3-3e2994bc4480";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setResult({
        success: false,
        message: "Please fill out all required fields.",
      });
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    const formValues = new FormData(e.target);
    formValues.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formValues,
      });

      const json = await response.json();

      if (json.success) {
        setResult({
          success: true,
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error("Web3Forms Error:", json);
        setResult({
          success: false,
          message: json.message || "An error occurred. Please try again.",
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setResult({
        success: false,
        message: "A network error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-gray-50 overflow-hidden py-16 sm:py-24">
      <BackgroundBubbles />
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Get in Touch
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            We’d love to hear from you. Please fill out the form below.
          </p>
        </div>
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
                  <p className="text-gray-700">
                    3rd Floor ORCHID CENTER GOLF COURSE ROAD, SEC-53 DLF QE
                    HARYANA GURUGRAM, 122002
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-blue-600 shrink-0" />
                  <a
                    href="mailto:contact@calsci.io"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    contact@calsci.io
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-blue-600 shrink-0" />
                  <a
                    href="tel:+918527896692"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    +91-8527896692
                  </a>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-12 bg-gray-50/50">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 placeholder-gray-500"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 placeholder-gray-500"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 placeholder-gray-500"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </motion.button>
                </div>
                <AnimatePresence>
                  {result && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`text-sm font-medium text-center ${
                        result.success ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {result.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
