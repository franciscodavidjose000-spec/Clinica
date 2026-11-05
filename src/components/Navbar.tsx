import { useState, useEffect } from 'react';
import { Phone, Clock, MapPin, Menu, X, Calendar, MessageCircle, ChevronRight } from 'lucide-react';
import { CLINIC_INFO, getClinicCurrentStatus } from '../data/clinicData';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenQuiz: () => void;
}

export default function Navbar({ onOpenBooking, onOpenQuiz }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const status = getClinicCurrentStatus();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Especialidades', href: '#servicos' },
    { label: 'Ozonoterapia O3', href: '#ozonoterapia' },
    { label: 'Instalações', href: '#instalacoes' },
    { label: 'Localização', href: '#localizacao' },
    { label: 'Perguntas Frequentes', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200">
      {/* Top Notification / Information Strip */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Barrio TGFA, Rua Direita do Aeroporto (junto ao Banco BPC), Soyo</span>
            </span>
            <span className="hidden md:inline text-slate-600">·</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Seg–Sex: 08:00 – 16:00</span>
              <span className={`ml-1 text-[11px] font-semibold px-1.5 py-0.5 rounded ${status.isOpen ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'}`}>
                {status.isOpen ? 'Aberto Hoje' : 'Encerrado Agora'}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${CLINIC_INFO.primaryPhone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-teal-300 hover:text-teal-200 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{CLINIC_INFO.primaryPhone}</span>
            </a>
            <button
              onClick={onOpenQuiz}
              className="hidden lg:inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors underline underline-offset-2"
            >
              Autoavaliação de Dor
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand wordmark / official logo lockup */}
          <a href="#inicio" className="flex items-center gap-3 shrink-0 group">
            <img
              src={CLINIC_INFO.logoSrc}
              alt="Logotipo Clínica de Dor JJ 26 de Julho"
              className="w-12 h-12 object-contain rounded-lg p-0.5 bg-slate-50 border border-slate-200 group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-display leading-tight">
                CLÍNICA DE DOR
              </span>
              <span className="text-xs sm:text-sm font-semibold text-teal-700 tracking-wider">
                JJ 26 DE JULHO <span className="text-blue-800 font-bold">O₃</span>
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Single-line, unboxed text) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 hover:underline hover:underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Direct Contact */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${CLINIC_INFO.primaryPhoneRaw}?text=${encodeURIComponent(
                'Olá! Gostaria de informações e agendamento na Clínica de Dor JJ 26 de Julho no Soyo.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-teal-600" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 active:scale-[0.99]"
            >
              <Calendar className="w-4 h-4" />
              <span>Marcar Consulta</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center sm:hidden gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-700 rounded-lg"
            >
              Agendar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-700"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-teal-800 bg-teal-50 border border-teal-200 rounded-lg"
            >
              Fazer Triagem / Autoavaliação de Dor
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-teal-700 rounded-lg shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Marcar Consulta no Soyo</span>
            </button>
            <a
              href={`https://wa.me/${CLINIC_INFO.primaryPhoneRaw}?text=${encodeURIComponent(
                'Olá! Gostaria de tirar dúvidas com a Clínica de Dor JJ 26 de Julho.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Conversar pelo WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
