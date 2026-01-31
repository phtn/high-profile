import { CryptoFlapDisplay } from './components/crypto-prices'
import { CtaSection } from './components/cta_section'
import { FaqSection } from './components/faq_section'
import { FeaturesSection } from './components/features_section'
import { Footer } from './components/footer'
import { Header } from './components/header'
import { HeroSection } from './components/hero_section'
import { HowItWorksSection } from './components/how_it_works_section'
import { QuickLinksSection } from './components/quick-links'

export default function Root() {
  return (
    <div className='min-h-screen bg-white font-sans text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100'>
      <Header />
      <CryptoFlapDisplay />
      {/*<CryptoMarquee />*/}
      <main>
        <HeroSection />
        <QuickLinksSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FaqSection />
        <CtaSection />
        <Footer />
      </main>
    </div>
  )
}
