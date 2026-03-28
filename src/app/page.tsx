import HeroSection from "@/components/HeroSection";
import NavigationCategoryHub from "@/components/NavigationCategoryHub";
import ExpertiseSection from "@/components/ExpertiseSection";
import LearningHub from "@/components/LearningHub";
import OurMethodology from "@/components/OurMethodology";
import BharatLibrary from "@/components/BharatLibrary";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-20 relative">
      <HeroSection />
      <NavigationCategoryHub />
      <ExpertiseSection />
      <LearningHub />
      <OurMethodology />
      <BharatLibrary />
      <Location />
      <Footer />
      <FloatingChat />
    </div>
  );
}
