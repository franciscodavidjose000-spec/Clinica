import { useState } from 'react';
import { CLINIC_SERVICES, ServiceItem } from '../data/clinicData';
import { Activity, Shield, Sparkles, CheckCircle2, Calendar, ArrowRight, Info } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'dor' | 'fisioterapia' | 'odontologia'>('dor');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredServices = CLINIC_SERVICES.filter((s) => s.category === activeCategory);

  const categories = [
    {
      id: 'dor' as const,
      label: 'Clínica de Dor & Ozonoterapia O₃',
      shortLabel: 'Clínica de Dor (O₃)',
      badge: 'Tratamentos por Secção',
      description: 'Bloqueios neurais, alívio de dor ciática, descompressão de hérnias discais e infiltrações.',
    },
    {
      id: 'fisioterapia' as const,
      label: 'Fisioterapia & Reabilitação',
      shortLabel: 'Fisioterapia',
      badge: 'Reabilitação Motora',
      description: 'Recuperação intensiva pós-AVC, pós-fraturas ortopédicas e alívio de contraturas musculoesqueléticas.',
    },
    {
      id: 'odontologia' as const,
      label: 'Odontologia & Saúde Oral',
      shortLabel: 'Odontologia',
      badge: 'Gabinete Dentário',
      description: 'Ortodontia (aparelhos), próteses, tratamento de canal, restaurações e profilaxia.',
    },
  ];

  return (
    <section id="servicos" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            <span className="w-2 h-2 rounded-full bg-teal-600 inline-block" />
            <span>Nossos Serviços Médicos · Soyo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
            Especialidades Médicas & Terapias Avançadas
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Estrutura médica dedicada ao diagnóstico e tratamento conservador e intervencionista da dor, 
            combinando ozonoterapia de precisão com reabilitação física e cuidados dentários completos.
          </p>
        </div>

        {/* Category Switcher - Segmented Interactive Filter Tabs (Valid interactive control per frontend-design) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl mb-10 border border-slate-200 max-w-2xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setExpandedId(null);
              }}
              className={`flex-1 py-3 px-4 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 text-center ${
                activeCategory === cat.id
                  ? 'bg-white text-teal-900 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span className="hidden sm:inline">{cat.label}</span>
              <span className="sm:hidden">{cat.shortLabel}</span>
            </button>
          ))}
        </div>

        {/* Category Context Banner */}
        <div className="mb-8 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              {activeCategory === 'dor' && <Sparkles className="w-4 h-4" />}
              {activeCategory === 'fisioterapia' && <Activity className="w-4 h-4" />}
              {activeCategory === 'odontologia' && <Shield className="w-4 h-4" />}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                {categories.find((c) => c.id === activeCategory)?.badge}
              </div>
              <div className="text-xs text-slate-600">
                {categories.find((c) => c.id === activeCategory)?.description}
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-500 whitespace-nowrap">
            {filteredServices.length} tratamentos disponíveis
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => {
            const isExpanded = expandedId === service.id;
            const formattedIndex = String(index + 1).padStart(2, '0');

            return (
              <div
                key={service.id}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-teal-300 transition-all"
              >
                <div>
                  {/* Human Editorial Index & Badge */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-mono text-teal-700 font-bold">{formattedIndex}.</span>
                    {service.popular && (
                      <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        Mais Procurado
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 font-display group-hover:text-teal-800 transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Indications preview */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                      Indicado para:
                    </div>
                    {service.indications.slice(0, 2).map((ind, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{ind}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expanded full details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-3 bg-slate-50 p-3 rounded-xl animate-fadeIn">
                      <p className="leading-relaxed">{service.fullDesc}</p>
                      {service.indications.length > 2 && (
                        <div>
                          <div className="font-semibold text-slate-800 mb-1">Outras indicações:</div>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                            {service.indications.slice(2).map((ind, idx) => (
                              <li key={idx}>{ind}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {service.duration && (
                        <div className="text-slate-500 text-[11px]">
                          <strong>Regime:</strong> {service.duration}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : service.id)}
                    className="text-xs font-semibold text-slate-600 hover:text-teal-700 flex items-center gap-1 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>{isExpanded ? 'Menos detalhes' : 'Saber mais'}</span>
                  </button>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition-colors"
                  >
                    <span>Agendar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner for Official Poster reference */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold font-display">
              Precisa de um protocolo de tratamento combinado?
            </h4>
            <p className="text-xs text-slate-300 max-w-xl">
              Muitos utentes no Soyo combinam Ozonoterapia medicinal e Fisioterapia para acelerar a regeneração sem recorrer a viagens dispendiosas.
            </p>
          </div>
          <button
            onClick={() => onSelectService('Avaliação Geral de Dor & Fisioterapia')}
            className="px-5 py-3 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all whitespace-nowrap shadow-sm"
          >
            Solicitar Avaliação Médica no Soyo
          </button>
        </div>

      </div>
    </section>
  );
}
