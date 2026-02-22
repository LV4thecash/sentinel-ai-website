import { HeroSection } from "@/components/home/HeroSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ProofSection } from "@/components/home/ProofSection";
import { TrustStripSection } from "@/components/home/TrustStripSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { RoadmapSection } from "@/components/home/RoadmapSection";
import { CtaBand } from "@/components/ui/CtaBand";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <ProofSection />
      <TrustStripSection />
      <HowItWorksSection />
      <SocialProofSection />
      <RoadmapSection />
      <CtaBand />
    </main>
  );
}
