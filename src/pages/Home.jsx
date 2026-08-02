import PageWrapper from '../components/common/PageWrapper.jsx'
import Hero from '../components/home/Hero.jsx'
import StatsSection from '../components/home/StatsSection.jsx'
import FeaturesSection from '../components/home/FeaturesSection.jsx'
import HowItWorksSection from '../components/home/HowItWorksSection.jsx'
import TestimonialsSection from '../components/home/TestimonialsSection.jsx'

function Home() {
  return (
    <PageWrapper>
      <Hero />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
    </PageWrapper>
  )
}

export default Home
