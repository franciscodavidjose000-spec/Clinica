import { Sparkles, CheckCircle2, ShieldCheck, Zap, HeartPulse, RefreshCw } from 'lucide-react';

interface OzoneSectionProps {
  onOpenBooking: () => void;
}

export default function OzoneSection({ onOpenBooking }: OzoneSectionProps) {
  const mechanisms = [
    {
      icon: Zap,
      title: 'Efeito Anti-inflamatório Rápido',
      desc: 'Inibe as citocinas pró-inflamatórias e modula as prostaglandinas, cessando a dor aguda nos nervos espinhais e raízes comprimidas.',
    },
    {
      icon: RefreshCw,
      title: 'Discolise & Retração da Hérnia',
      desc: 'O ozono reage com os proteoglicanos do núcleo pulposo do disco herniado, promovendo a sua dessecação e retração sem bisturi.',
    },
    {
      icon: HeartPulse,
      title: 'Superoxigenação Celular',
      desc: 'Aumenta a entrega de oxigénio pela hemoglobina aos tecidos lesionados e estimula a microcirculação local na coluna e membros.',
    },
    {
      icon: ShieldCheck,
      title: 'Estimulação Antioxidante',
      desc: 'Ativa as enzimas antioxidantes endógenas (SOD, catalase e glutationa), combatendo o stress oxidativo e protegendo o tecido nervoso.',
    },
  ];

  const comparisons = [
    {
      aspect: 'Invasividade',
      traditional: 'Incisões cirúrgicas, risco de fibrose cicatricial',
      ozone: 'Procedimento percutâneo minimamente invasivo',
    },
    {
      aspect: 'Internamento',
      traditional: 'Vários dias de internamento hospitalar',
      ozone: 'Regime ambulatorial: alta no mesmo dia no Soyo',
    },
    {
      aspect: 'Anestesia',
      traditional: 'Geral ou epidural de alto impacto',
      ozone: 'Apenas anestesia local suave ou sem anestesia',
    },
    {
      aspect: 'Recuperação',
      traditional: 'Semanas ou meses de repouso absoluto',
      ozone: 'Retorno gradual às atividades em poucos dias',
    },
  ];

  return (
    <section id="ozonoterapia" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>A Revolução no Tratamento da Coluna</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
            Porquê a Ozonoterapia Medicinal (O₃) no Tratamento de Hérnias e Ciático?
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Na Clínica JJ 26 de Julho no Soyo, aplicamos o ozono medicinal em concentrações exatas para regenerar a coluna 
            e desinflamar raízes nervosas sem necessidade de intervenção cirúrgica aberta.
          </p>
        </div>

        {/* 4 Mechanism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mechanisms.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-teal-300 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-display mb-2">{m.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Comparison Table / Box: Cirurgia Aberta vs Ozonoterapia JJ 26 de Julho */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Comparativo Clínico</span>
              <h3 className="text-lg font-bold font-display">Cirurgia Convencional vs. Ozonoterapia na Clínica JJ</h3>
            </div>
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-teal-300 hover:bg-teal-200 rounded-lg transition-colors whitespace-nowrap"
            >
              Consultar Especialista no Soyo
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {comparisons.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 gap-3 items-center text-xs">
                <div className="font-bold text-slate-900 uppercase tracking-wide text-[11px] md:text-xs">
                  {item.aspect}
                </div>
                <div className="text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase mb-0.5">Cirurgia Tradicional</span>
                  {item.traditional}
                </div>
                <div className="text-teal-950 font-medium bg-teal-50/80 p-2.5 rounded-lg border border-teal-200 flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] font-semibold text-teal-700 uppercase mb-0.5">Clínica JJ 26 de Julho (O₃)</span>
                    {item.ozone}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 text-center">
            * Cada caso clínico é avaliado individualmente por secção para determinar a elegibilidade do utente.
          </div>
        </div>

      </div>
    </section>
  );
}
