import { HeroSection } from "@/components/home/HeroSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ProofSection } from "@/components/home/ProofSection";
import { TrustStripSection } from "@/components/home/TrustStripSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <ProofSection />
      <TrustStripSection />
      {/* Sections 5–8 added in Task 8 */}
    </main>
  );
}
