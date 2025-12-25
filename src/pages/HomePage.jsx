import MainSection from "../components/home/MainSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItMade from "../components/home/HowItmade";
import ContactUsSection from "../components/home/ContactUsSection";

import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <div>
      <Navbar />

      <MainSection />

      <FeaturesSection />

      <HowItMade />

      <ContactUsSection />

    </div>
  );
}

export default HomePage;
