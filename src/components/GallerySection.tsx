import { useState } from 'react';
import { CLINIC_GALLERY, GalleryImage } from '../data/clinicData';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function GallerySection() {
  const [filter, setFilter] = useState<'all' | 'instalacoes' | 'dor' | 'odontologia' | 'exterior'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const filteredImages = filter === 'all' 
    ? CLINIC_GALLERY 
    : CLINIC_GALLERY.filter((img) => img.category === filter);

  const openLightbox = (image: GalleryImage) => {
    const idx = CLINIC_GALLERY.findIndex((img) => img.id === image.id);
    setSelectedImage(image);
    setSelectedIndex(idx >= 0 ? idx : 0);
  };

  const handlePrev = () => {
    const nextIdx = (selectedIndex - 1 + CLINIC_GALLERY.length) % CLINIC_GALLERY.length;
    setSelectedIndex(nextIdx);
    setSelectedImage(CLINIC_GALLERY[nextIdx]);
  };

  const handleNext = () => {
    const nextIdx = (selectedIndex + 1) % CLINIC_GALLERY.length;
    setSelectedIndex(nextIdx);
    setSelectedImage(CLINIC_GALLERY[nextIdx]);
  };

  return (
    <section id="instalacoes" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
              <ImageIcon className="w-3.5 h-3.5 text-teal-600" />
              <span>Tour Visual pelas Nossas Instalações</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight text-balance">
              Conheça a Nossa Clínica no Soyo
            </h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Fotografias reais das nossas instalações no Barrio TGFA, gabinetes modernos de atendimento, 
              cadeira de procedimentos clínicos e ambiente acolhedor.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('instalacoes')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'instalacoes'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gabinete & Recepção
            </button>
            <button
              onClick={() => setFilter('dor')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'dor'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tratamentos
            </button>
            <button
              onClick={() => setFilter('exterior')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'exterior'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fachada Externa
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => openLightbox(img)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xs hover:shadow-md transition-all"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              {/* Hover overlay with title */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 transition-opacity p-4 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold font-display">{img.title}</h3>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                  {img.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition-colors z-50"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition-colors z-50"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition-colors z-50"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center text-white max-w-lg">
              <h4 className="text-base font-bold font-display">{selectedImage.title}</h4>
              <p className="text-xs text-slate-300 mt-1">{selectedImage.description}</p>
              <div className="text-[11px] text-teal-400 mt-1 font-mono">
                {selectedIndex + 1} de {CLINIC_GALLERY.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
