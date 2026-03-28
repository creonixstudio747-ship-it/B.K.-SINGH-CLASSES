import HeroSection from "@/components/HeroSection";
import NavigationCategoryHub from "@/components/NavigationCategoryHub";
import ExpertiseSection from "@/components/ExpertiseSection";
import LearningHub from "@/components/LearningHub";
import MethodologyLibrary from "@/components/MethodologyLibrary";
import LocationMentor from "@/components/LocationMentor";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-20">
      <HeroSection />
      <NavigationCategoryHub />
      <ExpertiseSection />
      <LearningHub />
      <MethodologyLibrary />
      <LocationMentor />
      <Footer />
    </div>
  );
}
