import TopServicesSection from "../components/HOME/TopServicesSection";
import ServicesSection from "../components/HOME/ServicesSection";
import TestimonialSection from "../components/HOME/TestimonialSection";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      <TopServicesSection />
      <ServicesSection />
      <TestimonialSection />
    </div>
  );
}
