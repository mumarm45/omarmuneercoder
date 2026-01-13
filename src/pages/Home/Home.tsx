import { memo } from 'react';
import { HomePageHeader, HeroSection, FeatureSection, BenefitsSection, CTASection, Footer } from '.';


function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
     
     <HomePageHeader />
     <HeroSection />
     <FeatureSection/>
     <BenefitsSection />
     <CTASection />
     <Footer />
    </div>
  );
}

export default memo(HomePage);
