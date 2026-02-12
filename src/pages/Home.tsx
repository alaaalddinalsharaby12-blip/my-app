import Hero from '../sections/Hero';
import TrustBadges from '../sections/TrustBadges';
import Services from '../sections/Services';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <Services limit={3} />
      <Projects limit={4} />
      <Contact />
    </>
  );
}
