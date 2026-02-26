import { HeroSection }       from "@/components/home/HeroSection";
import { ProblemSection }    from "@/components/home/ProblemSection";
import { ProofSection }      from "@/components/home/ProofSection";
import { TrustStripSection } from "@/components/home/TrustStripSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { SectionDivider }    from "@/components/ui/SectionDivider";
import { CtaBand }           from "@/components/ui/CtaBand";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SectionDivider from="light" to="dark" />
      <ProblemSection />
      <SectionDivider from="dark" to="light" />
      <ProofSection />
      <SectionDivider from="light" to="dark" />
      <TrustStripSection />
      <SectionDivider from="dark" to="light" />
      <HowItWorksSection />
      <SectionDivider from="light" to="dark" />
      <SocialProofSection />
      <CtaBand />
    </main>
  );
}
