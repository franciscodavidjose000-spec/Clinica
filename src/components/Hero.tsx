import { useState } from 'react';
import { Calendar, MessageCircle, ShieldCheck, MapPin, Sparkles, Activity, Clock, ArrowRight } from 'lucide-react';
import { CLINIC_INFO, getClinicCurrentStatus } from '../data/clinicData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
}

export default function Hero({ onOpenBooking, onOpenQuiz }: HeroProps) {
  const status = getClinicCurrentStatus();
  const [activeTab, setActiveTab] = useState<'reception' | 'cabinet'>('reception');

  return (
    <section id="inicio" className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Decorative subtle medical grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e0a_1px,transparent_1px),linear-gradient(to_bottom,#0f766e0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Clinical Proposition & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet unboxed kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
              <span className="w-2 h-2 rounded-full bg-teal-600 inline-block" />
              <span>Centro de Referência Médica · Soyo, Angola</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-normal normal-case">Junto ao Banco BPC</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.15] text-balance">
              Tratamento Especializado da Dor, Ozonoterapia e Reabilitação no Soyo
            </h1>

            {/* Concrete Proposition */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Alívio eficaz para <strong>hérnias discais</strong> e <strong>nervo ciático</strong> sem cirurgias invasivas, 
              através de ozonoterapia medicinal (O₃), bloqueios neurais e fisioterapia motora. 
              Gabinete completo de odontologia para cuidar do seu sorriso e bem-estar integral.
            </p>

            {/* Quick Live Status Card */}
            <div className="p-3.5 bg-slate-100/90 border border-slate-200 rounded-xl flex items-center justify-between gap-4 max-w-xl">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full shrink-0 ${status.isOpen ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-amber-500'}`} />
                <div className="text-xs">
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <span>{status.message}</span>
                    <span className="text-slate-400 font-normal">·</span>
                    <span className="text-slate-600 font-normal">Segunda a Sexta, 08:00 – 16:00</span>
                  </div>
                  <div className="text-slate-500">{status.submessage}</div>
                </div>
              </div>
              <span className="text-[11px] font-medium text-teal-700 hidden sm:inline whitespace-nowrap">
                Barrio TGFA
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Consulta no Soyo</span>
              </button>

              <a
                href={`https://wa.me/${CLINIC_INFO.primaryPhoneRaw}?text=${encodeURIComponent(
                  'Olá, Clínica JJ 26 de Julho! Gostaria de falar sobre sintomas de dor e agendar uma consulta no Soyo.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-all whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-teal-700" />
                <span>WhatsApp (+244 926 242 725)</span>
              </a>
            </div>

            {/* Interactive Screening prompt */}
            <div className="pt-2">
              <button
                onClick={onOpenQuiz}
                className="group flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-teal-700 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-teal-600 group-hover:rotate-12 transition-transform" />
                <span>Não tem certeza do seu diagnóstico? Faça a autoavaliação rápida de sintomas</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Authentic Clinic Visual Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200">
              {/* Media Switcher Tabs */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 p-1 bg-black/50 backdrop-blur-md rounded-lg">
                <button
                  onClick={() => setActiveTab('reception')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    activeTab === 'reception'
                      ? 'bg-white text-slate-900'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Recepção
                </button>
                <button
                  onClick={() => setActiveTab('cabinet')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    activeTab === 'cabinet'
                      ? 'bg-white text-slate-900'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Consultório
                </button>
              </div>

              {/* Clinic Badge Overlay */}
              <div className="absolute top-3 right-3 z-20">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-teal-800/90 text-white backdrop-blur-sm rounded-lg text-[11px] font-semibold border border-teal-600/50">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                  <span>Soyo · Angola</span>
                </div>
              </div>

              {/* Main Image Frame */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                <img
                  src={activeTab === 'reception' ? CLINIC_INFO.receptionSrc : CLINIC_INFO.treatmentChairSrc}
                  alt={
                    activeTab === 'reception'
                      ? 'Recepção da Clínica de Dor JJ 26 de Julho com painel de identificação'
                      : 'Gabinete com cadeira moderna de procedimentos e odontologia'
                  }
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Caption / Proof Lockup */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs text-teal-300 mb-1">
                    <Activity className="w-3.5 h-3.5" />
                    <span>
                      {activeTab === 'reception' ? 'Atendimento Acolhedor e Humanizado' : 'Equipamento Moderno & Biossegurança'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 line-clamp-2">
                    {activeTab === 'reception'
                      ? 'Espaço climatizado e confortável no Barrio TGFA para receber pacientes e famílias.'
                      : 'Cadeira ergonómica de última geração para infiltrações, ozonoterapia e tratamentos dentários.'}
                  </p>
                </div>
              </div>

              {/* Bottom Quick Feature Strip */}
              <div className="bg-slate-900/95 px-4 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>Procedimentos por Secção</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>Sem Cirurgia Invasiva</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>Alívio Comprovado</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width 4-Column Proof & Facilities Strip */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-teal-700 font-bold text-sm flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Ozonoterapia Medicinal (O₃)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Propriedades anti-inflamatórias e regenerativas para tratamento de hérnias discais e dores crónicas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-teal-700 font-bold text-sm flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4" />
              <span>Coluna & Nervo Ciático</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bloqueios neurais, discolise e infiltrações direcionadas para rápido restabelecimento da mobilidade.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-teal-700 font-bold text-sm flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Fisioterapia & Pós-AVC</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reabilitação motora intensiva para sequelas de AVC, paralisias, entorses e pós-fraturas ortopédicas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-teal-700 font-bold text-sm flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4" />
              <span>Localização de Fácil Acesso</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rua Direita do Aeroporto, junto ao Banco BPC, Barrio TGFA, Soyo. Estacionamento amplo e seguro.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
