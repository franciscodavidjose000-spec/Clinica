import { useState } from 'react';
import { CLINIC_FAQS } from '../data/clinicData';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>Esclarecimentos Clínicos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="mt-2 text-slate-600 text-sm leading-relaxed">
            Respostas às principais dúvidas sobre os nossos tratamentos de coluna, ozonoterapia e consultas no Soyo.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {CLINIC_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 font-display">
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-full text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-teal-700 bg-teal-50' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Callout box for custom question */}
        <div className="mt-10 p-6 rounded-2xl bg-teal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold font-display">Tem uma dúvida específica sobre o seu caso?</h4>
            <p className="text-xs text-teal-200 mt-0.5">
              Fale diretamente com a equipa de triagem da Clínica JJ 26 de Julho via WhatsApp.
            </p>
          </div>
          <a
            href={`https://wa.me/${CLINIC_INFO.primaryPhoneRaw}?text=${encodeURIComponent(
              'Olá! Gostaria de tirar uma dúvida sobre um tratamento na Clínica JJ 26 de Julho no Soyo.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Tirar Dúvidas (+244 926 242 725)</span>
          </a>
        </div>

      </div>
    </section>
  );
}
