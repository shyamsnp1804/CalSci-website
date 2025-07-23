import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          from_email: formData.email,
          from_phone: formData.phone || "Not provided",
          message: formData.message,
          to_email: "contact@calsci.io", // Replace with your company email
        },
        "YOUR_PUBLIC_KEY" // Replace with your EmailJS public key
      )
      .then((response) => {
        console.log("Email sent successfully:", response);
        setStatus("Thank you! Your message has been sent.");
        setFormData({ email: "", phone: "", message: "" });
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
        setStatus("Error: Failed to send message. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-5xl w-full space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
            Contact Us
          </h1>
          <p className="mt-3 text-lg md:text-xl text-blue-700">
            Connect with us to share your feedback or inquiries about calsci.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Company Details */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg border border-blue-200 hover:shadow-xl transition-shadow duration-300"
            variants={itemVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-6">
              Our Contact Information
            </h2>
            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-3"
                variants={itemVariants}
              >
                <Mail className="w-6 h-6 text-blue-600" />
                <p className="text-blue-800">
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href="mailto:contact@yourcompany.com"
                    className="text-blue-600 hover:underline"
                  >
                    contact@calsci.io
                  </a>
                </p>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3"
                variants={itemVariants}
              >
                <Phone className="w-6 h-6 text-blue-600" />
                <p className="text-blue-800">
                  <span className="font-medium">Phone:</span>{" "}
                  <a
                    href="tel:+919876543210"
                    className="text-blue-600 hover:underline"
                  >
                    +91-8527896692
                  </a>
                </p>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3"
                variants={itemVariants}
              >
                <MapPin className="w-6 h-6 text-blue-600" />
                <p className="text-blue-800">
                  <span className="font-medium">Address:</span>{" "}
                </p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="text-lg md:text-xl font-semibold text-blue-900 mb-3">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://x.com/yourcompany"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Twitter/X"
                  >
                    <Twitter className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/company/yourcompany"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="https://github.com/yourcompany"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-gray-700"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="GitHub"
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg border border-blue-200 hover:shadow-xl transition-shadow duration-300"
            variants={itemVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-blue-800"
                >
                  Email Address
                </label>
                <div className="mt-1 relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50 text-blue-900 placeholder-blue-400"
                    placeholder="you@example.com"
                  />
                  <Mail className="absolute right-3 top-3 h-5 w-5 text-blue-400" />
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-blue-800"
                >
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50 text-blue-900 placeholder-blue-400"
                    placeholder="9999999999"
                  />
                  <Phone className="absolute right-3 top-3 h-5 w-5 text-blue-400" />
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-blue-800"
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="block w-full px-4 py-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50 text-blue-900 placeholder-blue-400"
                  placeholder="How can we help you?"
                ></textarea>
              </motion.div>
              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </motion.div>
              <AnimatePresence>
                {status && (
                  <motion.p
                    className={`text-sm text-center ${
                      status.includes("Error")
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {status}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
