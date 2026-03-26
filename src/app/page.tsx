import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import DashboardHub from "@/components/DashboardHub";
import MethodologyLibrary from "@/components/MethodologyLibrary";
import LocationMentor from "@/components/LocationMentor";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-20">
      <HeroSection />
      <StatsSection />
      <ExpertiseSection />
      <DashboardHub />
      <MethodologyLibrary />
      <LocationMentor />
      <Footer />
    </div>
  );
}
