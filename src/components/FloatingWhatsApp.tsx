import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CLINIC_INFO, getClinicCurrentStatus } from '../data/clinicData';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);
  const status = getClinicCurrentStatus();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Optional Speech Bubble Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs py-2 px-3.5 rounded-xl shadow-lg border border-slate-200 animate-fadeIn">
          <div>
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>Atendimento Soyo</span>
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </div>
            <span className="text-[11px] text-slate-500">Dúvidas ou agendamentos directos</span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
            aria-label="Fechar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={`https://wa.me/${CLINIC_INFO.primaryPhoneRaw}?text=${encodeURIComponent(
          'Olá, Clínica de Dor JJ 26 de Julho! Gostaria de informações sobre consultas e tratamentos no Soyo.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Clínica de Dor JJ 26 de Julho no WhatsApp"
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
