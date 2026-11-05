export interface ServiceItem {
  id: string;
  title: string;
  category: 'dor' | 'fisioterapia' | 'odontologia';
  shortDesc: string;
  fullDesc: string;
  indications: string[];
  duration?: string;
  popular?: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: 'instalacoes' | 'dor' | 'odontologia' | 'exterior';
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'ozono' | 'dor' | 'fisioterapia' | 'geral';
}

export const CLINIC_INFO = {
  name: 'Clínica de Dor JJ 26 de Julho',
  shortName: 'JJ 26 de Julho',
  tagline: 'Centro Especializado em Tratamento da Dor, Ozonoterapia e Odontologia no Soyo',
  address: 'Barrio TGFA, Rua Direita do Aeroporto, junto ao Banco BPC',
  city: 'Soyo',
  province: 'Zaire',
  country: 'Angola',
  plusCode: 'V97C+3H4, Soyo',
  googleMapsUrl: 'https://maps.google.com/?q=V97C%2B3H4+Soyo+Angola',
  primaryPhone: '+244 926 242 725',
  secondaryPhones: ['+244 941 709 363', '+244 931 777 759'],
  primaryPhoneRaw: '244926242725',
  email: 'jj26dejulho@gmail.com',
  workingHours: {
    weekdays: 'Segunda a Sexta: 08:00 às 16:00',
    weekends: 'Sábado e Domingo: Encerrado',
    openHour: 8,
    closeHour: 16,
    openDays: [1, 2, 3, 4, 5], // 1=Mon, 5=Fri
  },
  logoSrc: '/assets/aistudio/unnamed__6__dafae67d.webp',
  exteriorSrc: '/assets/aistudio/unnamed__3__28205241.webp',
  receptionSrc: '/assets/aistudio/unnamed__1__b31fde1a.webp',
  treatmentChairSrc: '/assets/aistudio/unnamed__2__7626b021.webp',
};

// Check if clinic is open right now in Angola timezone (WAT = UTC+1)
export function getClinicCurrentStatus(): { isOpen: boolean; message: string; submessage: string } {
  const now = new Date();
  // Get time in UTC+1
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const angolaTime = new Date(utc + (3600000 * 1));
  
  const day = angolaTime.getDay(); // 0 is Sunday, 6 is Saturday
  const hour = angolaTime.getHours();
  const minutes = angolaTime.getMinutes();
  const timeInMinutes = hour * 60 + minutes;

  const openTime = CLINIC_INFO.workingHours.openHour * 60; // 08:00 = 480
  const closeTime = CLINIC_INFO.workingHours.closeHour * 60; // 16:00 = 960

  if (day >= 1 && day <= 5) {
    if (timeInMinutes >= openTime && timeInMinutes < closeTime) {
      return {
        isOpen: true,
        message: 'Aberto Agora',
        submessage: `Atendimento hoje até às 16:00 (Soyo, Angola)`,
      };
    } else if (timeInMinutes < openTime) {
      return {
        isOpen: false,
        message: 'Abre às 08:00',
        submessage: `Hoje abre às 08:00 · Barrio TGFA, Soyo`,
      };
    } else {
      return {
        isOpen: false,
        message: 'Encerrado por hoje',
        submessage: 'Reabre no próximo dia útil às 08:00',
      };
    }
  } else {
    return {
      isOpen: false,
      message: 'Encerrado aos fins-de-semana',
      submessage: 'Reabre segunda-feira às 08:00',
    };
  }
}

export const CLINIC_SERVICES: ServiceItem[] = [
  // Dor & Ozonoterapia
  {
    id: 'hernias-discais',
    title: 'Tratamento Integral de Hérnias Discais',
    category: 'dor',
    popular: true,
    shortDesc: 'Abordagem médica avançada por secção para regeneração e descompressão discal sem necessidade de cirurgia invasiva.',
    fullDesc: 'Aplicação de ozonoterapia medicinal e técnicas de bloqueio direcionadas ao disco vertebral afetado. A ação anti-inflamatória e secante do ozono reduz o volume da hérnia, aliviando de imediato a pressão sobre as raízes nervosas.',
    indications: ['Hérnia discal lombar e cervical', 'Dores agudas e persistentes na coluna', 'Perda de mobilidade ou formigueiro nos membros'],
    duration: 'Secções personalizadas',
  },
  {
    id: 'nervo-ciatico',
    title: 'Tratamento de Dor no Nervo Ciático',
    category: 'dor',
    popular: true,
    shortDesc: 'Alívio rápido da dor irradiada para glúteos e pernas através de infiltração e bloqueio neural preciso.',
    fullDesc: 'Terapia focalizada para desinflamar o trajeto do nervo ciático, restaurando a marcha e eliminando o choque elétrico, dormência e queimação que impedem as atividades quotidianas.',
    indications: ['Ciatalgia aguda ou crónica', 'Dor que desce da lombar até ao pé', 'Fraqueza ou sensação de peso nas pernas'],
    duration: 'Avaliação clínica prévia',
  },
  {
    id: 'ozonoterapia-geral',
    title: 'Ozonoterapia Geral & Para-vertebral',
    category: 'dor',
    popular: true,
    shortDesc: 'Terapia com ozono medicinal (O3) para oxigenação celular profunda, modulação da imunidade e combate à inflamação.',
    fullDesc: 'Administração controlada de ozono médico em concentrações rigorosamente calibradas. Atua como potente antioxidante, melhora a microcirculação periférica e acelera a regeneração tecidular.',
    indications: ['Processos inflamatórios crónicos', 'Dores articulares e musculares', 'Fadiga, circulação deficiente e reforço imunitário'],
    duration: 'Sessões por secção',
  },
  {
    id: 'quimionucleose-discolise',
    title: 'Quimionucleose e Discolise com Ozono',
    category: 'dor',
    popular: false,
    shortDesc: 'Técnica intervencionista minimamente invasiva para redução e retração de discos herniados.',
    fullDesc: 'Injeção percutânea precisa de mistura de ozono no núcleo pulposo do disco intervertebral, desencadeando a dessecação gradual da hérnia sem danificar as estruturas adjacentes.',
    indications: ['Hérnias discais contidas', 'Lombociatalgias refratárias a analgésicos', 'Pacientes que evitam cirurgia aberta'],
    duration: 'Procedimento clínico especializado',
  },
  {
    id: 'bloqueio-neural',
    title: 'Bloqueio Neural Integral e Simples',
    category: 'dor',
    popular: false,
    shortDesc: 'Interrupção temporária e terapêutica dos estímulos de dor nos nervos afetados para alívio imediato.',
    fullDesc: 'Aplicação local de fármacos específicos e ozono que cessam a cascata dolorosa, permitindo ao paciente retomar a mobilidade e iniciar a reabilitação física sem sofrimento.',
    indications: ['Nevralgias agudas', 'Síndromes miofasciais graves', 'Dor refratária de origem nervosa'],
    duration: 'Ação rápida',
  },
  {
    id: 'dor-aguda-cronica',
    title: 'Tratamento da Dor Aguda, Subaguda e Crónica',
    category: 'dor',
    popular: false,
    shortDesc: 'Protocolos integrados para diagnóstico etiológico e erradicação de quadros dolorosos complexos.',
    fullDesc: 'Plano terapêutico individualizado combinando infiltrações, ozonoterapia e acompanhamento contínuo para devolver qualidade de vida e sono reparador ao paciente.',
    indications: ['Dores crónicas com mais de 3 meses', 'Fibromialgia e dor generalizada', 'Dores pós-traumáticas persistentes'],
    duration: 'Acompanhamento médico contínuo',
  },

  // Fisioterapia
  {
    id: 'reabilitacao-fraturas',
    title: 'Reabilitação Pós-Fraturas, Entorses e Luxações',
    category: 'fisioterapia',
    popular: true,
    shortDesc: 'Recuperação funcional completa da amplitude articular, força muscular e flexibilidade após lesões ortopédicas.',
    fullDesc: 'Exercícios terapêuticos assistidos, cinesioterapia e mobilização articular precoce para restabelecer os movimentos normais e prevenir sequelas ou rigidez articular.',
    indications: ['Pós-imobilização por gesso ou cirurgia ortopédica', 'Entorses de tornozelo e joelho', 'Luxações de ombro e cotovelo'],
    duration: 'Sessões de 45-60 min',
  },
  {
    id: 'dores-musculoesqueleticas',
    title: 'Tratamento de Dores Musculoesqueléticas',
    category: 'fisioterapia',
    popular: true,
    shortDesc: 'Terapia manual, liberação miofascial e fortalecimento postural para alívio duradouro de tensões e contraturas.',
    fullDesc: 'Intervenção fisioterapêutica para desativar pontos-gatilho dolorosos, corrigir desvios biomecânicos e fortalecer os grupos musculares estabilizadores da coluna e articulações.',
    indications: ['Dores no pescoço (cervicalgia)', 'Dor lombar ocupacional', 'Tendinites, bursites e fascite plantar'],
    duration: 'Sessões personalizadas',
  },
  {
    id: 'reabilitacao-avc',
    title: 'Tratamento e Reabilitação de AVC',
    category: 'fisioterapia',
    popular: true,
    shortDesc: 'Fisioterapia neurofuncional especializada para reaprendizagem motora, equilíbrio e marcha após Acidente Vascular Cerebral.',
    fullDesc: 'Protocolos de neuroplasticidade com exercícios adaptados para recuperação de movimentos nos membros paralisados (hemiplegia/hemiparesia), treino de equilíbrio e marcha funcional.',
    indications: ['Sequelas de AVC isquémico ou hemorrágico', 'Dificuldade de equilíbrio e marcha', 'Rigidez muscular espástica'],
    duration: 'Sessões regulares intensivas',
  },
  {
    id: 'reabilitacao-paralisias',
    title: 'Reabilitação Motora para Paralisias e Neuropatias',
    category: 'fisioterapia',
    popular: false,
    shortDesc: 'Estimulação neuromuscular para reativação de vias motoras e prevenção de atrofias.',
    fullDesc: 'Recuperação motora focada em neuropatias periféricas e paralisias faciais ou periféricas através de estimulação sensório-motora e cinesioterapia guiada.',
    indications: ['Paralisia facial de Bell', 'Neuropatia diabética ou compressiva', 'Perda de força em extremidades'],
    duration: 'Plano de reabilitação estruturado',
  },

  // Odontologia
  {
    id: 'ortodontia',
    title: 'Ortodontia (Aparelhos Dentários)',
    category: 'odontologia',
    popular: true,
    shortDesc: 'Alinhamento dos dentes e correção da mordida para estética impecável e saúde funcional da mastigação.',
    fullDesc: 'Diagnóstico dentofacial completo com planeamento e colocação de aparelhos fixos ou removíveis, com manutenções regulares no gabinete do Soyo.',
    indications: ['Dentes apinhados ou desalinhados', 'Mordida cruzada, aberta ou profunda', 'Dificuldade na mastigação ou fonética'],
    duration: 'Consultas mensais de manutenção',
  },
  {
    id: 'proteses-dentarias',
    title: 'Colocação e Conserto de Próteses',
    category: 'odontologia',
    popular: true,
    shortDesc: 'Reabilitação oral com próteses totais ou parciais para devolução do sorriso e capacidade mastigatória.',
    fullDesc: 'Confeção personalizada de próteses dentárias com materiais duráveis e anatómicos, além de serviço rápido de conserto e ajuste de próteses desadaptadas.',
    indications: ['Perda parcial ou total de dentes', 'Dificuldade para mastigar alimentos sólidos', 'Prótese antiga solta ou partida'],
    duration: 'Moldagem e prova personalizada',
  },
  {
    id: 'destartarizacao-profilaxia',
    title: 'Destartarização e Limpeza com Flúor',
    category: 'odontologia',
    popular: true,
    shortDesc: 'Remoção minuciosa de tártaro e placa bacteriana com ultrassom e aplicação tópica de flúor protetor.',
    fullDesc: 'Higiene oral clínica profissional para prevenir cáries, gengivite e periodontite, deixando os dentes polidos e a cavidade oral fresca e saudável.',
    indications: ['Sangramento das gengivas ao escovar', 'Presença de tártaro visível', 'Prevenção semestral de rotina'],
    duration: 'Aproximadamente 40 min',
  },
  {
    id: 'restauracao-extracao',
    title: 'Extração e Restauração de Dentes',
    category: 'odontologia',
    popular: false,
    shortDesc: 'Restauração com resina composta na cor natural do dente e exodontias seguras e sem dor.',
    fullDesc: 'Eliminação de cáries e reconstrução estética da estrutura dentária com resinas de alta resistência. Extrações realizadas com anestesia local eficiente e total conforto.',
    indications: ['Cáries dentárias ativas', 'Dentes partidos ou cavitados', 'Dentes sem viabilidade de conservação'],
    duration: 'Procedimento único por dente',
  },
  {
    id: 'tratamento-canal',
    title: 'Tratamento de Canal (Endodontia)',
    category: 'odontologia',
    popular: false,
    shortDesc: 'Tratamento do nervo infectado para salvar o dente natural e cessar imediatamente a dor de dente severa.',
    fullDesc: 'Remoção cuidadosa da polpa dentária inflamada ou necrosada, desinfecção meticulosa do canal radicular e selamento hermético para evitar reinfecção.',
    indications: ['Dor de dente aguda pulsátil', 'Sensibilidade intensa ao quente e frio', 'Abcesso dentário ou inchaço'],
    duration: '1 a 2 sessões clínicas',
  },
  {
    id: 'branqueamento-dental',
    title: 'Branqueamento Dental Profissional',
    category: 'odontologia',
    popular: false,
    shortDesc: 'Clareamento dos dentes para remoção de manchas profundas e conquista de um sorriso luminoso.',
    fullDesc: 'Procedimento odontológico com agentes clareadores clinicamente testados para clarear vários tons com segurança para o esmalte e gengiva.',
    indications: ['Dentes escurecidos por café, chá ou tabaco', 'Insatisfação com o tom amarelado dos dentes', 'Eventos especiais e melhoria estética'],
    duration: 'Sessão em consultório',
  },
];

export const CLINIC_GALLERY: GalleryImage[] = [
  {
    id: 'gal-reception',
    src: '/assets/aistudio/unnamed__1__b31fde1a.webp',
    title: 'Recepção e Atendimento',
    category: 'instalacoes',
    description: 'Área de recepção acolhedora com marca oficial da Clínica JJ 26 de Julho e atendimento humanizado.',
  },
  {
    id: 'gal-treatment-room',
    src: '/assets/aistudio/unnamed__2__7626b021.webp',
    title: 'Gabinete Clínico e Cadeira de Procedimentos',
    category: 'instalacoes',
    description: 'Equipamento moderno com ergonomia para procedimentos de dor, ozonoterapia e odontologia no Soyo.',
  },
  {
    id: 'gal-procedure-in-action',
    src: '/assets/aistudio/unnamed_f9cc8fcd.webp',
    title: 'Atendimento Clínico Especializado',
    category: 'dor',
    description: 'Procedimento assistido por especialista garantindo total segurança, higiene e conforto ao utente.',
  },
  {
    id: 'gal-treatment-session',
    src: '/assets/aistudio/unnamed__7__8f140144.webp',
    title: 'Procedimentos de Alta Precisão',
    category: 'dor',
    description: 'Ambiente controlado com equipa devidamente paramentada para tratamento de alívio e intervenção.',
  },
  {
    id: 'gal-dental-procedure',
    src: '/assets/aistudio/unnamed__5__4e311ea1.webp',
    title: 'Cuidados Odontológicos e Intervenção',
    category: 'odontologia',
    description: 'Equipa de saúde dentária no tratamento de canal, restaurações e cirurgias com máxima biossegurança.',
  },
  {
    id: 'gal-exterior',
    src: '/assets/aistudio/unnamed__3__28205241.webp',
    title: 'Fachada da Clínica no Soyo',
    category: 'exterior',
    description: 'Localização de fácil acesso na Rua Direita do Aeroporto, Barrio TGFA, junto ao Banco BPC.',
  },
  {
    id: 'gal-service-board',
    src: '/assets/aistudio/unnamed__4__5f6c9297.webp',
    title: 'Painel Informativo de Serviços',
    category: 'instalacoes',
    description: 'Quadro oficial detalhando todas as valências de dor, fisioterapia e odontologia da clínica.',
  },
];

export const CLINIC_FAQS: FAQItem[] = [
  {
    category: 'ozono',
    question: 'O que é a Ozonoterapia e como ela alivia a dor?',
    answer: 'A ozonoterapia medicinal consiste na aplicação de uma mistura calibrada de oxigénio e ozono médico (O3). O ozono atua como potente anti-inflamatório natural, melhora a oxigenação dos tecidos, acelera a cicatrização e promove a dessecação e redução de hérnias discais, retirando a compressão dos nervos sem necessidade de corte cirúrgico.',
  },
  {
    category: 'dor',
    question: 'Como funciona o tratamento da hérnia discal e da dor ciática na clínica?',
    answer: 'Após uma avaliação clínica detalhada da secção vertebral acometida, utilizamos técnicas combinadas de infiltração, bloqueio neural/para-vertebral e aplicação de ozono medicinal (discolise). O objetivo é desinflamar o nervo ciático e reduzir o volume da hérnia, proporcionando alívio progressivo e recuperação da marcha.',
  },
  {
    category: 'geral',
    question: 'Qual é o horário de atendimento e preciso de marcar consulta antes?',
    answer: 'Atendemos de Segunda a Sexta-feira, das 08:00 às 16:00 (Sábados e Domingos estamos encerrados). Recomendamos vivamente o agendamento prévio através do telefone/WhatsApp (+244 926 242 725) para garantir atendimento pontual sem longas esperas.',
  },
  {
    category: 'geral',
    question: 'Onde se localiza exatamente a clínica no Soyo?',
    answer: 'Estamos situados no Barrio TGFA, na Rua Direita do Aeroporto, mesmo junto ao Banco BPC no Soyo, província do Zaire. A localização é central e com excelente acesso e estacionamento.',
  },
  {
    category: 'fisioterapia',
    question: 'Como a fisioterapia da clínica auxilia pacientes pós-AVC ou pós-fraturas?',
    answer: 'Dispomos de programas de cinesioterapia e neuro-reabilitação que estimulam a neuroplasticidade no caso de AVC (recuperação de movimentos paralisados e treino de marcha) e a mobilização precoce articular no caso de fraturas e entorses, prevenindo rigidez e atrofia muscular.',
  },
  {
    category: 'geral',
    question: 'A clínica também tem serviço de dentista completo?',
    answer: 'Sim! Possuímos consultório odontológico com cadeira moderna e equipamentos para ortodontia (aparelhos), próteses dentárias, desvitalização (canal), restaurações, extrações, destartarização com ultrassom e branqueamento.',
  },
];

export const PATIENT_TESTIMONIALS = [
  {
    name: 'Mendonça Sebastião',
    location: 'Soyo, Barrio Pangala',
    treatment: 'Tratamento de Hérnia Discal & Ozonoterapia',
    text: 'Estava há mais de 8 meses sem conseguir trabalhar por causa de uma hérnia lombar que me prendia a perna esquerda. Depois das sessões de ozonoterapia e bloqueio na Clínica JJ 26 de Julho, voltei a andar sem dores. Recomendo a toda a gente do Soyo.',
  },
  {
    name: 'Esperança Mabiala',
    location: 'Soyo, Centro',
    treatment: 'Fisioterapia Neurofuncional Pós-AVC',
    text: 'A minha mãe teve um AVC e perdeu a força no braço e perna direita. Com a dedicação e paciência dos fisioterapeutas da clínica, em poucas semanas ela voltou a apoiar o pé e recuperar a sua autonomia.',
  },
  {
    name: 'António Luvualu',
    location: 'Soyo, Rua do Aeroporto',
    treatment: 'Alívio de Dor no Nervo Ciático',
    text: 'A dor no ciático era insuportável ao sentar ou levantar. Fui atendido no mesmo dia junto ao BPC. O atendimento médico é atencioso, o espaço é limpíssimo e o alívio foi quase imediato.',
  },
];
