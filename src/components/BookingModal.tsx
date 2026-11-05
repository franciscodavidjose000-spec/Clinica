import { useState, useEffect } from 'react';
import { X, Calendar, MessageCircle, Phone, MapPin, Clock } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function BookingModal({ isOpen, onClose, initialService }: BookingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+244 ');
  const [service, setService] = useState('Tratamento Integral de Hérnias Discais');
  const [preferredDate, setPreferredDate] = useState('');
  const [period, setPeriod] = useState<'manha' | 'tarde'>('manha');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  if (!isOpen) return null;

  const serviceOptions = [
    'Tratamento Integral de Hérnias Discais',
    'Tratamento de Dor no Nervo Ciático',
    'Ozonoterapia Geral & Para-vertebral',
    'Quimionucleose e Discolise com Ozono',
    'Bloqueio Neural e Infiltrações',
    'Fisioterapia Pós-Fraturas e Entorses',
    'Fisioterapia e Reabilitação de AVC',
    'Tratamento de Dores Musculoesqueléticas',
    'Odontologia: Ortodontia (Aparelhos)',
    'Odontologia: Próteses Dentárias',
    'Odontologia: Tratamento de Canal',
    'Odontologia: Destartarização e Limpeza',
    'Outro / Avaliação Geral de Dor',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const periodText = period === 'manha' ? 'Manhã (08h–12h)' : 'Tarde (12h–16h)';
    const text = `*NOVO AGENDAMENTO - CLÍNICA JJ 26 DE JULHO (SOYO)*
    
• *Nome:* ${name}
• *Telefone:* ${phone}
• *Especialidade:* ${service}
• *Data Preferida:* ${preferredDate || 'A definir'}
• *Período:* ${periodText}
• *Sintomas / Observações:* ${notes.trim() || 'Nenhuma'}

Aguardo confirmação da equipa de atendimento no Soyo.`;

    window.open(`https://wa.me/${CLINIC_INFO.primaryPhoneRaw}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="text-base font-bold font-display">Marcar Consulta no Soyo</h3>
              <p className="text-xs text-slate-300">Barrio TGFA, junto ao Banco BPC</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Schedule reminder */}
        <div className="bg-teal-50 px-6 py-2.5 border-b border-teal-100 flex items-center justify-between text-xs text-teal-900">
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-teal-700" />
            <span>Segunda a Sexta: 08:00 – 16:00</span>
          </span>
          <span className="font-semibold text-teal-800">Soyo · Zaire</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nome do Paciente *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Alberto Domingos"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Telefone / WhatsApp (Angola) *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+244 926 242 725"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Serviço / Especialidade
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white"
            >
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Data Preferida
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Período
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setPeriod('manha')}
                  className={`py-2 text-[11px] font-semibold rounded-lg border text-center transition-all ${
                    period === 'manha'
                      ? 'bg-teal-50 border-teal-600 text-teal-900'
                      : 'border-slate-300 text-slate-600'
                  }`}
                >
                  Manhã
                </button>
                <button
                  type="button"
                  onClick={() => setPeriod('tarde')}
                  className={`py-2 text-[11px] font-semibold rounded-lg border text-center transition-all ${
                    period === 'tarde'
                      ? 'bg-teal-50 border-teal-600 text-teal-900'
                      : 'border-slate-300 text-slate-600'
                  }`}
                >
                  Tarde
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Descreva brevemente o que sente (opcional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Hérnia diagnosticada, dor forte na perna ao sentar..."
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-md transition-all active:scale-[0.99]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirmar no WhatsApp (+244 926 242 725)</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
