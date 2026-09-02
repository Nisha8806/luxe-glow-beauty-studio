import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedStrip from './components/TrustedStrip';
import Services from './components/Services';
import Bridal from './components/Bridal';
import Gallery from './components/Gallery';
import Artists from './components/Artists';
import Testimonials from './components/Testimonials';
import SocialGrid from './components/SocialGrid';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <TrustedStrip />
        <Services />
        <Bridal />
        <Gallery />
        <Artists />
        <Testimonials />
        <SocialGrid />
        <Contact />
        <FAQ />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
