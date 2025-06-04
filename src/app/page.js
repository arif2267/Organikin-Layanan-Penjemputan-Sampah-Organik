import Header from '../components/Header'
import Hero from '../components/Hero'
import RunningText from '../components/RunningText'
import WhyOrganikin from '../components/WhyOrganikin'
import Footer from '../components/Footer'
import JenisSampahOrganik from '../components/JenisSampahOrganik';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <RunningText />
      <JenisSampahOrganik />
      <WhyOrganikin />
      <Footer />
    </main>
  )
}
