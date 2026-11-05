import { MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Purpose (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={CLINIC_INFO.logoSrc}
                alt="Logotipo Clínica de Dor JJ 26 de Julho"
                className="w-12 h-12 object-contain rounded-lg p-0.5 bg-white/90"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-lg font-bold tracking-tight text-white font-display block leading-none">
                  CLÍNICA DE DOR
                </span>
                <span className="text-xs font-semibold text-teal-400 tracking-wider">
                  JJ 26 DE JULHO <span className="text-blue-400 font-bold">O₃</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Centro clínico de referência no Soyo para tratamento de hérnias discais, 
              compressões do nervo ciático, aplicação de ozonoterapia medicinal, 
              reabilitação fisioterapêutica e medicina dentária integrada.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Barrio TGFA, Rua Direita do Aeroporto (junto ao BPC), Soyo</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Segunda a Sexta: 08:00 – 16:00 · Sáb e Dom: Encerrado</span>
              </div>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navegação</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">Início</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">Especialidades</a>
              </li>
              <li>
                <a href="#ozonoterapia" className="hover:text-white transition-colors">Ozonoterapia O₃</a>
              </li>
              <li>
                <a href="#instalacoes" className="hover:text-white transition-colors">Instalações</a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-white transition-colors">Localização & Horário</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Perguntas Frequentes</a>
              </li>
            </ul>
          </div>

          {/* Specialties Focus (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Especialidades</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Hérnias Discais (Discolise)</li>
              <li>Nervo Ciático & Bloqueios</li>
              <li>Ozonoterapia Geral</li>
              <li>Reabilitação Pós-AVC</li>
              <li>Fisioterapia Pós-Fraturas</li>
              <li>Ortodontia & Próteses</li>
              <li>Tratamento de Canal</li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contactos Oficiais</h4>
            
            <div className="space-y-2 text-xs">
              <a
                href={`tel:${CLINIC_INFO.primaryPhone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-teal-300 hover:text-teal-200 transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{CLINIC_INFO.primaryPhone} (WhatsApp)</span>
              </a>

              {CLINIC_INFO.secondaryPhones.map((ph, i) => (
                <a
                  key={i}
                  href={`tel:${ph.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{ph}</span>
                </a>
              ))}

              <a
                href={`mailto:${CLINIC_INFO.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors pt-1"
              >
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{CLINIC_INFO.email}</span>
              </a>
            </div>

            <div className="pt-3">
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[11px] text-teal-400 hover:underline"
              >
                Ver localização no Google Maps ({CLINIC_INFO.plusCode}) &rarr;
              </a>
            </div>
          </div>

        </div>

        {/* Quiet copyright sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Clínica de Dor JJ 26 de Julho · Soyo, Zaire, Angola. Todos os direitos reservados.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
