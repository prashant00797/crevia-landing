import { LandingFeatureGrid } from "@/components/Landing/LandingFeaturesGrid";
import { LandingFooter } from "@/components/Landing/LandingFooter";
import { LandingHero } from "@/components/Landing/LandingHero";
import { LandingNavbar } from "@/components/Landing/LandingNavbar";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-linear-to-b from-accent via-background to-background text-foreground">
      <LandingNavbar />
      <LandingHero />
      <LandingFeatureGrid />
      <LandingFooter />
    </main>
  );
}
