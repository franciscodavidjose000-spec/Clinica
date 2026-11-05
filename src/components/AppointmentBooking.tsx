import { useState, useEffect } from 'react';
import { Calendar, Clock, MessageCircle, CheckCircle2, Phone, MapPin, AlertCircle, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface AppointmentBookingProps {
  prefillService?: string;
  prefillNotes?: string;
}

export default function AppointmentBooking({ prefillService, prefillNotes }: AppointmentBookingProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+244 ');
  const [service, setService] = useState('Tratamento Integral de Hérnias Discais');
  const [preferredDate, setPreferredDate] = useState('');
  const [period, setPeriod] = useState<'manha' | 'tarde'>('manha');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [protocolCode, setProtocolCode] = useState('');

  useEffect(() => {
    if (prefillService) {
      setService(prefillService);
    }
  }, [prefillService]);

  useEffect(() => {
    if (prefillNotes) {
      setNotes(prefillNotes);
    }
  }, [prefillNotes]);

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

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const periodText = period === 'manha' ? 'Manhã (08:00 – 12:00)' : 'Tarde (12:00 – 16:00)';
    const text = `*SOLICITAÇÃO DE AGENDAMENTO - CLÍNICA JJ 26 DE JULHO (SOYO)*
    
• *Nome do Paciente:* ${name}
• *Contacto:* ${phone}
• *Especialidade Solicitada:* ${service}
• *Data Preferencial:* ${preferredDate || 'A definir / Mais próxima'}
• *Período Preferencial:* ${periodText}
• *Observações / Sintomas:* ${notes.trim() || 'Nenhuma informada'}

Gostaria de confirmar a disponibilidade para esta consulta no Barrio TGFA, Soyo.`;

    window.open(`https://wa.me/${CLINIC_INFO.primaryPhoneRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleOnlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    // Generate random protocol
    const code = 'JJ-' + Math.floor(100000 + Math.random() * 900000);
    setProtocolCode(code);
    setSubmitted(true);
  };

  return (
    <section id="agendamento" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Clinic Guarantees (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              <span>Agendamento Simples & Rápido</span>
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
              Marque a sua Consulta na Clínica de Dor JJ 26 de Julho
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              O nosso consultório no Soyo atende de <strong>Segunda a Sexta, das 08:00 às 16:00</strong>. 
              Ao enviar a sua solicitação, a nossa equipa receciona os seus dados e confirma o horário para que seja atendido com pontualidade e tranquilidade.
            </p>

            {/* Direct contact card */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Linhas Telefónicas Directas
              </h3>
              
              <div className="space-y-2 text-xs">
                <a
                  href={`tel:${CLINIC_INFO.primaryPhone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-100 transition-colors"
                >
                  <span className="font-semibold text-slate-800 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-teal-600" />
                    <span>{CLINIC_INFO.primaryPhone}</span>
                  </span>
                  <span className="text-[11px] font-medium text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded">
                    Principal & WhatsApp
                  </span>
                </a>

                {CLINIC_INFO.secondaryPhones.map((sec, idx) => (
                  <a
                    key={idx}
                    href={`tel:${sec.replace(/\s+/g, '')}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors"
                  >
                    <span className="text-slate-700 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{sec}</span>
                    </span>
                    <span className="text-[11px] text-slate-400">Linha 2</span>
                  </a>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>Barrio TGFA, Rua Direita do Aeroporto, junto ao Banco BPC, Soyo, Angola.</span>
              </div>
            </div>

            {/* Timetable note */}
            <div className="p-4 bg-teal-50/60 border border-teal-200 rounded-xl flex items-start gap-3 text-xs text-teal-950">
              <Clock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <strong>Atenção aos fins-de-semana:</strong> A clínica funciona de Segunda a Sexta (08:00–16:00) e encerra aos Sábados e Domingos. Pedidos feitos ao fim-de-semana são agendados para a Segunda-feira seguinte.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form / Confirmation Receipt (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            
            {submitted ? (
              /* Success / Protocol State */
              <div className="space-y-6 text-center py-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                    Solicitação Registada com Sucesso!
                  </span>
                  <h3 className="text-2xl font-bold font-display text-slate-900">
                    Protocolo: <span className="font-mono text-teal-800">{protocolCode}</span>
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto pt-1">
                    Agradecemos a confiança, <strong>{name}</strong>. Guardámos os dados da sua consulta na <strong>Clínica de Dor JJ 26 de Julho</strong> no Soyo.
                  </p>
                </div>

                {/* Receipt Box */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Paciente:</span>
                    <span className="font-semibold text-slate-800">{name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Contacto:</span>
                    <span className="font-semibold text-slate-800">{phone}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Especialidade:</span>
                    <span className="font-semibold text-slate-800 text-right">{service}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Data e Turno:</span>
                    <span className="font-semibold text-slate-800">
                      {preferredDate || 'A combinar'} · {period === 'manha' ? 'Manhã (08h-12h)' : 'Tarde (12h-16h)'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Local de Atendimento:</span>
                    <span className="font-semibold text-teal-800">Barrio TGFA, Soyo (junto ao BPC)</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-2 max-w-md mx-auto pt-2">
                  <a
                    href={`https://wa.me/${CLINIC_INFO.primaryPhoneRaw}?text=${encodeURIComponent(
                      `Olá! Acabei de gerar o protocolo ${protocolCode} para agendamento de ${service} na Clínica JJ 26 de Julho no Soyo.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Avisar a Recepção pelo WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setNotes('');
                    }}
                    className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Fazer Novo Agendamento
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3 mb-2 flex items-center justify-between">
                  <h3 className="text-base font-bold font-display text-slate-900">
                    Formulário de Agendamento
                  </h3>
                  <span className="text-xs text-slate-500">Atendimento presencial no Soyo</span>
                </div>

                {/* Patient Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome Completo do Paciente *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: João Baptista Silva"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                  />
                </div>

                {/* Contact Phone */}
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
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white font-mono"
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Especialidade ou Tratamento Desejado *
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date and Period Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Data Preferencial (Segunda a Sexta)
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Período Preferencial
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPeriod('manha')}
                        className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                          period === 'manha'
                            ? 'bg-teal-50 border-teal-600 text-teal-900 font-bold'
                            : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400'
                        }`}
                      >
                        Manhã (08h–12h)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPeriod('tarde')}
                        className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                          period === 'tarde'
                            ? 'bg-teal-50 border-teal-600 text-teal-900 font-bold'
                            : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400'
                        }`}
                      >
                        Tarde (12h–16h)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Symptoms / Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sintomas ou Motivo da Consulta (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Dor forte na lombar descendo para o calcanhar há 2 semanas..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 bg-white"
                  />
                </div>

                {/* Submission Options */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-md transition-all active:scale-[0.99]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enviar Agendamento pelo WhatsApp (+244 926 242 725)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOnlineSubmit}
                    className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-teal-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Gerar Comprovativo de Agendamento Online
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Não realizamos cobrança online. O pagamento é efetuado presencialmente na clínica.</span>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
