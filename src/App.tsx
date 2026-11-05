import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import OzoneSection from './components/OzoneSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import LocationAndHours from './components/LocationAndHours';
import AppointmentBooking from './components/AppointmentBooking';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import PainQuizModal from './components/PainQuizModal';
import BookingModal from './components/BookingModal';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [activeServicePrefill, setActiveServicePrefill] = useState<string>('Tratamento Integral de Hérnias Discais');
  const [activeNotesPrefill, setActiveNotesPrefill] = useState<string>('');

  const handleOpenBooking = (service?: string) => {
    if (service) {
      setActiveServicePrefill(service);
    }
    setIsBookingModalOpen(true);
  };

  const handleSelectService = (serviceName: string) => {
    setActiveServicePrefill(serviceName);
    // Scroll smoothly to booking section or open modal
    const bookingElem = document.getElementById('agendamento');
    if (bookingElem) {
      bookingElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsBookingModalOpen(true);
    }
  };

  const handleTransferFromQuiz = (prefill: { service: string; notes: string }) => {
    setActiveServicePrefill(prefill.service);
    setActiveNotesPrefill(prefill.notes);
    // Also scroll down to the main booking section
    const bookingElem = document.getElementById('agendamento');
    if (bookingElem) {
      bookingElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsBookingModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-teal-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenQuiz={() => setIsQuizModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenQuiz={() => setIsQuizModalOpen(true)}
        />

        {/* Services & Specialties Catalog */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Ozone Therapy Scientific & Medical Deep Dive */}
        <OzoneSection onOpenBooking={() => handleOpenBooking('Ozonoterapia Geral & Para-vertebral')} />

        {/* Real Photo Gallery of Clinic Facilities in Soyo */}
        <GallerySection />

        {/* Real Patient Outcomes & Social Proof */}
        <TestimonialsSection />

        {/* Location, Directions (junto ao BPC), Plus Code & Real-Time Schedule */}
        <LocationAndHours />

        {/* Interactive In-Page Appointment Scheduler with Dual Submission */}
        <AppointmentBooking
          prefillService={activeServicePrefill}
          prefillNotes={activeNotesPrefill}
        />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Professional Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button with Soyo Status */}
      <FloatingWhatsApp />

      {/* Interactive Pain Assessment & Triage Modal */}
      <PainQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onTransferToBooking={handleTransferFromQuiz}
      />

      {/* Quick Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialService={activeServicePrefill}
      />
    </div>
  );
}
