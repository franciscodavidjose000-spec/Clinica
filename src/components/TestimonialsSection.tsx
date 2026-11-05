import { PATIENT_TESTIMONIALS } from '../data/clinicData';
import { Quote, Star, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            <Quote className="w-3.5 h-3.5 text-teal-600" />
            <span>Resultados Clínicos Reais</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
            O Impacto dos Nossos Tratamentos na Vida dos Pacientes
          </h2>
          <p className="mt-2 text-slate-600 text-sm leading-relaxed">
            Testemunhos de quem recuperou a mobilidade e o alívio das dores no município do Soyo.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PATIENT_TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-teal-300 transition-all"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{item.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <span>{item.location}</span>
                  <span>·</span>
                  <span className="text-teal-700 font-medium">{item.treatment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
