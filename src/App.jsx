import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { supabase } from './lib/supabase';

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

import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [adminMode, setAdminMode] = useState(
    window.location.pathname === '/admin'
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (adminMode) {
    if (!user) {
      return (
        <AdminLogin
          onLogin={(loggedInUser) => setUser(loggedInUser)}
        />
      );
    }

    return (
      <AdminDashboard
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <>
      <AnimatePresence>
        {loading && (
          <LoadingScreen
            onComplete={() => setLoading(false)}
          />
        )}
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