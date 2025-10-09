import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, User, MessageSquare } from "lucide-react";

const BackgroundBubbles = () => {
  return (
    <>
      <style>{`
                @keyframes float1 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-25px) rotate(5deg); } }
                @keyframes float2 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-30px) rotate(-5deg); } }
            `}</style>
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <div
          className="absolute bg-gradient-to-br from-blue-500 to-indigo-200 rounded-full filter blur-3xl opacity-30"
          style={{
            width: "450px",
            height: "450px",
            top: "5%",
            left: "10%",
            animation: "float1 20s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bg-gradient-to-br from-purple-500 to-pink-200 rounded-full filter blur-3xl opacity-30"
          style={{
            width: "400px",
            height: "400px",
            bottom: "5%",
            right: "10%",
            animation: "float2 24s ease-in-out infinite alternate",
          }}
        ></div>
      </div>
    </>
  );
};

const ContactUsSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Thank you for your message! This is a demo form. In a real application, your message would be sent to our team."
    );
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
                    Zone-1, Industrial Growth Centre, Bodhjungnagar, Agartala,
                    Tripura (W), 799008
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
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 placeholder-gray-500"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <div>
                  <motion.button
                    type="submit"
                    className="w-full py-3 px-4 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
