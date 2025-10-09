import React from "react";
import { motion } from "framer-motion";

import MainSection from "../components/home/MainSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import FeaturesSection from "../components/home/FeaturesSection";
import SocialProofSection from "../components/home/SocialProofSection";
import Footer from "../components/Footer";
import ContactUsSection from "../components/home/ContactUsSection";

function HomePage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <MainSection />

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <HowItWorksSection />
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-12 sm:py-12 bg-gray-50"
      >
        <FeaturesSection />
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <SocialProofSection />
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <ContactUsSection />
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Footer />
      </motion.section>
    </div>
  );
}

export default HomePage;
