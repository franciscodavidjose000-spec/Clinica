import { useState } from 'react';
import { MapPin, Clock, Phone, Mail, ExternalLink, Copy, Check, Navigation, AlertCircle } from 'lucide-react';
import { CLINIC_INFO, getClinicCurrentStatus } from '../data/clinicData';

export default function LocationAndHours() {
  const status = getClinicCurrentStatus();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${CLINIC_INFO.name}, ${CLINIC_INFO.address}, ${CLINIC_INFO.city}, ${CLINIC_INFO.country} (Plus Code: ${CLINIC_INFO.plusCode})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scheduleDays = [
    { day: 'Segunda-feira', hours: '08:00 – 16:00', isOpen: true },
    { day: 'Terça-feira', hours: '08:00 – 16:00', isOpen: true },
    { day: 'Quarta-feira', hours: '08:00 – 16:00', isOpen: true },
    { day: 'Quinta-feira', hours: '08:00 – 16:00', isOpen: true },
    { day: 'Sexta-feira', hours: '08:00 – 16:00', isOpen: true },
    { day: 'Sábado', hours: 'Encerrado', isOpen: false },
    { day: 'Domingo', hours: 'Encerrado', isOpen: false },
  ];

  return (
    <section id="localizacao" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>Fácil Acesso no Município do Soyo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
            Localização & Horário de Atendimento
          </h2>
          <p className="mt-2 text-slate-600 text-sm leading-relaxed">
            Situada no coração do Soyo, na Rua Direita do Aeroporto, mesmo junto ao Banco BPC. 
            Ambiente seguro com facilidade de acesso pedonal e viário.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Schedule & Direct Lines (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Status Pill */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              status.isOpen 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}>
              <div className="flex items-center gap-3">
                <Clock className={`w-5 h-5 ${status.isOpen ? 'text-emerald-600' : 'text-amber-600'}`} />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">
                    {status.message}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {status.submessage}
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-white/80 border border-slate-200">
                UTC+1 (WAT)
              </span>
            </div>

            {/* Weekly Schedule Table */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Horário Semanal de Consultas</span>
              </h3>

              <div className="divide-y divide-slate-200/60 text-xs">
                {scheduleDays.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <span className="font-medium text-slate-700">{item.day}</span>
                    <span className={`font-semibold tabular-nums ${item.isOpen ? 'text-slate-900' : 'text-slate-400'}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Urgências agendadas previamente através do WhatsApp (+244 926 242 725).</span>
              </div>
            </div>

            {/* Direct Contacts Summary */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider">Contactos Telefónicos & Email</h3>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-500">Linha Principal & WhatsApp:</span>
                  <a href={`tel:${CLINIC_INFO.primaryPhone.replace(/\s+/g, '')}`} className="font-bold text-teal-700 hover:underline">
                    {CLINIC_INFO.primaryPhone}
                  </a>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-500">Linha Alternativa 1:</span>
                  <a href={`tel:${CLINIC_INFO.secondaryPhones[0].replace(/\s+/g, '')}`} className="font-medium hover:underline">
                    {CLINIC_INFO.secondaryPhones[0]}
                  </a>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-500">Linha Alternativa 2:</span>
                  <a href={`tel:${CLINIC_INFO.secondaryPhones[1].replace(/\s+/g, '')}`} className="font-medium hover:underline">
                    {CLINIC_INFO.secondaryPhones[1]}
                  </a>
                </div>

                <div className="flex items-center justify-between text-slate-700 pt-1 border-t border-slate-100">
                  <span className="text-slate-500">Correio Eletrónico:</span>
                  <a href={`mailto:${CLINIC_INFO.email}`} className="font-medium text-teal-800 hover:underline">
                    {CLINIC_INFO.email}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Map & Exterior Photo (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Real Exterior Facade Photo */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm relative group">
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  src={CLINIC_INFO.exteriorSrc}
                  alt="Fachada da Clínica de Dor JJ 26 de Julho no Soyo com letreiro e outdoor oficial"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
                  <MapPin className="w-4 h-4" />
                  <span>Fachada Oficial · Soyo, Zaire</span>
                </div>
                <p className="text-xs text-slate-200 mt-0.5">
                  Muro com placa identificadora "CLÍNICA DE DOR JJ/26 DE JULHO O3" e outdoor frontal de serviços.
                </p>
              </div>
            </div>

            {/* Address & Navigation Card */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Endereço Oficial no Soyo:
                  </h4>
                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    {CLINIC_INFO.address}
                  </p>
                  <p className="text-xs text-slate-500">
                    {CLINIC_INFO.city}, Província do {CLINIC_INFO.province}, {CLINIC_INFO.country} · Plus Code: <span className="font-mono text-teal-800 font-bold">{CLINIC_INFO.plusCode}</span>
                  </p>
                </div>

                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Endereço Copiado!' : 'Copiar Endereço'}</span>
                </button>
              </div>

              {/* Reference Points */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-teal-600" />
                  <span>Pontos de Referência Importantes:</span>
                </div>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-600 text-[11px]">
                  <li>Junto à agência do <strong>Banco BPC (Banco de Poupança e Crédito)</strong>.</li>
                  <li>Localizado na <strong>Rua Direita do Aeroporto</strong>, no <strong>Barrio TGFA</strong>.</li>
                  <li>Acesso rápido a partir de qualquer ponto central da cidade do Soyo.</li>
                </ul>
              </div>

              {/* Map Action Button */}
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs"
              >
                <ExternalLink className="w-4 h-4 text-teal-400" />
                <span>Abrir Localização no Google Maps ({CLINIC_INFO.plusCode})</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
