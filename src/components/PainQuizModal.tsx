import { useState } from 'react';
import { X, Activity, AlertCircle, CheckCircle2, MessageCircle, Calendar, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface PainQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransferToBooking: (prefill: { service: string; notes: string }) => void;
}

export default function PainQuizModal({ isOpen, onClose, onTransferToBooking }: PainQuizModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [location, setLocation] = useState<string>('hernia');
  const [painLevel, setPainLevel] = useState<number>(7);
  const [duration, setDuration] = useState<string>('cronica');
  const [symptoms, setSymptoms] = useState<string[]>([]);

  if (!isOpen) return null;

  const locations = [
    { id: 'hernia', label: 'Coluna Lombar / Hérnia Discal', desc: 'Dor na parte baixa das costas, rigidez ao levantar' },
    { id: 'ciatico', label: 'Nervo Ciático / Pernas', desc: 'Dor que desce pela coxa até ao pé, choque elétrico' },
    { id: 'cervical', label: 'Pescoço / Cervical & Ombros', desc: 'Dor no pescoço que irradia para os braços ou cabeça' },
    { id: 'articulacoes', label: 'Joelhos & Articulações', desc: 'Desgaste, inflamação, dores ao caminhar ou dobrar' },
    { id: 'avc', label: 'Reabilitação Pós-AVC / Paralisia', desc: 'Perda de força motora, desequilíbrio, sequelas' },
    { id: 'dentes', label: 'Dores Dentárias / Mastigação', desc: 'Dor de dente aguda, próteses, cáries ou canal' },
  ];

  const symptomOptions = [
    'Sensação de formigueiro ou dormência',
    'Dificuldade para caminhar ou ficar em pé',
    'Dor que piora durante a noite',
    'Fraqueza muscular nos braços ou pernas',
    'Rigidez articular pela manhã',
    'Dor ao tossir ou espirrar',
  ];

  const toggleSymptom = (sym: string) => {
    if (symptoms.includes(sym)) {
      setSymptoms(symptoms.filter((s) => s !== sym));
    } else {
      setSymptoms([...symptoms, sym]);
    }
  };

  const getRecommendation = () => {
    switch (location) {
      case 'hernia':
        return {
          title: 'Tratamento de Hérnia Discal & Ozonoterapia (O₃)',
          desc: 'Recomenda-se avaliação por secção vertebral na Clínica JJ 26 de Julho para discolise com ozono e bloqueio para-vertebral, aliviando a compressão sobre a medula e raízes nervosas.',
          category: 'dor',
        };
      case 'ciatico':
        return {
          title: 'Tratamento da Dor Ciática & Bloqueio Neural',
          desc: 'Recomenda-se infiltração desinflamatória no trajeto do ciático associada a ozonoterapia para rápido cessamento da dor irradiada.',
          category: 'dor',
        };
      case 'avc':
        return {
          title: 'Fisioterapia Neurofuncional & Reabilitação Motora',
          desc: 'Protocolo intensivo de cinesioterapia e reaprendizagem motora para recuperação da força e da marcha pós-AVC no Soyo.',
          category: 'fisioterapia',
        };
      case 'dentes':
        return {
          title: 'Consulta de Odontologia & Endodontia',
          desc: 'Avaliação clínica dentária no nosso gabinete no Soyo para tratamento de canal, restauração estética ou planeamento de prótese.',
          category: 'odontologia',
        };
      default:
        return {
          title: 'Consulta de Avaliação de Dor & Fisioterapia',
          desc: 'Recomenda-se exame físico pelo corpo clínico para definir protocolo combinado de ozonoterapia e reabilitação muscular.',
          category: 'dor',
        };
    }
  };

  const recommendation = getRecommendation();

  const handleSendWhatsApp = () => {
    const locName = locations.find((l) => l.id === location)?.label || location;
    const durLabel = duration === 'cronica' ? 'Mais de 3 meses (Crónica)' : duration === 'recente' ? 'Menos de 1 semana' : '1 a 4 semanas';
    
    const message = `*TRIAGEM DE DOR - CLÍNICA JJ 26 DE JULHO (SOYO)*
    
• *Local da dor:* ${locName}
• *Nível da dor (1-10):* ${painLevel}/10
• *Duração:* ${durLabel}
• *Sintomas adicionais:* ${symptoms.length > 0 ? symptoms.join(', ') : 'Nenhum adicional'}
• *Tratamento recomendado:* ${recommendation.title}

Gostaria de agendar a minha consulta com base nesta autoavaliação.`;

    window.open(`https://wa.me/${CLINIC_INFO.primaryPhoneRaw}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleScheduleWithData = () => {
    const locName = locations.find((l) => l.id === location)?.label || location;
    onTransferToBooking({
      service: recommendation.title,
      notes: `Triagem: ${locName} (Dor nível ${painLevel}/10, Duração: ${duration}). Sintomas: ${symptoms.join(', ') || 'Nenhum informado'}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="text-base font-bold font-display">Autoavaliação Rápida de Dor</h3>
              <p className="text-xs text-slate-300">Clínica de Dor JJ 26 de Julho · Soyo, Angola</p>
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

        {/* Step indicator */}
        <div className="px-6 pt-4 pb-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Passo {step} de 3</span>
          <div className="flex gap-1.5">
            <span className={`w-8 h-1 rounded-full ${step >= 1 ? 'bg-teal-600' : 'bg-slate-200'}`} />
            <span className={`w-8 h-1 rounded-full ${step >= 2 ? 'bg-teal-600' : 'bg-slate-200'}`} />
            <span className={`w-8 h-1 rounded-full ${step >= 3 ? 'bg-teal-600' : 'bg-slate-200'}`} />
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  1. Onde se localiza a dor ou sintoma principal?
                </h4>
                <p className="text-xs text-slate-500">Selecione a região que mais necessita de atenção clínica:</p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setLocation(loc.id)}
                    className={`p-3 text-left rounded-xl border transition-all flex items-start gap-3 ${
                      location === loc.id
                        ? 'border-teal-600 bg-teal-50/70 text-slate-900 ring-1 ring-teal-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                      location === loc.id ? 'border-teal-600 bg-teal-600' : 'border-slate-300'
                    }`}>
                      {location === loc.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{loc.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{loc.desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  2. Intensidade e duração do sintoma
                </h4>
                <p className="text-xs text-slate-500">Avaliação da Escala Visual Analógica (1 a 10):</p>
              </div>

              {/* Slider */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">Intensidade da Dor:</span>
                  <span className="text-sm font-extrabold text-teal-800 tabular-nums">
                    {painLevel} / 10 · {painLevel <= 3 ? 'Leve' : painLevel <= 6 ? 'Moderada' : painLevel <= 8 ? 'Intensa' : 'Incapacitante'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={painLevel}
                  onChange={(e) => setPainLevel(Number(e.target.value))}
                  className="w-full accent-teal-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1 - Quase imperceptível</span>
                  <span>5 - Moderada</span>
                  <span>10 - Insuportável</span>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Há quanto tempo sente a dor?</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'recente', label: 'Menos de 1 semana' },
                    { id: 'subaguda', label: '1 a 4 semanas' },
                    { id: 'cronica', label: 'Mais de 3 meses (Crónica)' },
                  ].map((dur) => (
                    <button
                      key={dur.id}
                      type="button"
                      onClick={() => setDuration(dur.id)}
                      className={`p-2.5 text-center text-xs rounded-lg border font-medium transition-all ${
                        duration === dur.id
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptoms Checklist */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Sintomas associados (opcional):</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {symptomOptions.map((sym) => {
                    const checked = symptoms.includes(sym);
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => toggleSymptom(sym)}
                        className={`text-left p-2 rounded-lg text-xs border flex items-center gap-2 transition-all ${
                          checked
                            ? 'border-teal-600 bg-teal-50 text-teal-900 font-medium'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded shrink-0 border flex items-center justify-center ${
                          checked ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'
                        }`}>
                          {checked && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        <span className="text-[11px] leading-tight">{sym}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <span>Ver Recomendação</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="p-4 bg-teal-50/80 border border-teal-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Tratamento Indicado na Clínica JJ 26 de Julho:</span>
                </div>
                <div className="text-sm font-extrabold text-slate-900 font-display">
                  {recommendation.title}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {recommendation.desc}
                </p>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  Esta autoavaliação não substitui a consulta médica presencial. No nosso consultório no Soyo, faremos a avaliação física e os testes clínicos precisos.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Resumo para o WhatsApp da Clínica (+244 926 242 725)</span>
                </button>

                <button
                  type="button"
                  onClick={handleScheduleWithData}
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-teal-900 bg-teal-100/70 hover:bg-teal-200/70 border border-teal-300 rounded-xl transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Consulta Directamente com Estes Dados</span>
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline"
                  >
                    Revisar respostas
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
