import PageWrapper from '../components/common/PageWrapper.jsx'
import Hero from '../components/home/Hero.jsx'
import StatsSection from '../components/home/StatsSection.jsx'
import FeaturesSection from '../components/home/FeaturesSection.jsx'
import HowItWorksSection from '../components/home/HowItWorksSection.jsx'
import TestimonialsSection from '../components/home/TestimonialsSection.jsx'
import CTASection from '../components/home/CTASection.jsx'

function Home() {
  return (
    <PageWrapper>
      <Hero />
      <StatsSection />
      {/* FeaturesSection already owns id="features" on its internal <section> */}
      <FeaturesSection />
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      {/* Solutions scrolls to the social-proof / testimonials section */}
      <div id="solutions">
        <TestimonialsSection />
      </div>
      {/* About + CTA combined — #about anchor lands here */}
      <div id="about">
        <CTASection />
      </div>
    </PageWrapper>
  )
}

export default Home
