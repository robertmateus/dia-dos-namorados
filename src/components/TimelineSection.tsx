import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TimelineEvent } from "../types";
import {
  Plus,
  Trash2,
  Calendar,
  Tag,
  Sparkle,
  Check,
  BookOpen,
} from "lucide-react";

interface TimelineSectionProps {
  events: TimelineEvent[];
  onAddEvent: (event: Omit<TimelineEvent, "id">) => void;
  onDeleteEvent: (id: string) => void;
  onResetEvents: () => void;
}

export default function TimelineSection({
  events,
  onAddEvent,
  onDeleteEvent,
  onResetEvents,
}: TimelineSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tag, setTag] = useState("");
  const [formError, setFormError] = useState("");

  const parseToTimestamp = (dateStr: string): number => {
    if (!dateStr) return 0;
    if (dateStr.includes("/")) {
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        const [day, month, year] = parts;
        return new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
        ).getTime();
      }
    }
    const fullYear = parseInt(dateStr);
    if (!isNaN(fullYear)) return new Date(fullYear, 0, 1).getTime();
    return 0;
  };

  const sortedEvents = [...events].sort(
    (a, b) => parseToTimestamp(a.year) - parseToTimestamp(b.year),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!year || !title || !description || !imageUrl) {
      setFormError(
        "Por favor, preencha o Ano, Título, Descrição e o Link da Imagem.",
      );
      return;
    }
    onAddEvent({ year, title, description, imageUrl, tag: tag || "Memória" });
    setYear("");
    setTitle("");
    setDescription("");
    setImageUrl("");
    setTag("");
    setFormError("");
    setShowAddForm(false);
  };

  return (
    <div className="content-container py-8 sm:py-12">
      {/* Page Title */}
      <div className="text-center mb-16">
        <span className="font-sans text-[11px] text-brand-gold-dark dark:text-brand-gold uppercase tracking-[0.3em] font-semibold block mb-2">
          LINHA DO TEMPO DO CORAÇÃO
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-brand-wine dark:text-brand-cream leading-tight">
          Nossa Jornada Juntos
        </h2>
        <div className="w-20 h-0.5 bg-brand-gold mx-auto mt-4" />
        <p className="font-sans text-xs md:text-sm text-brand-charcoal/60 dark:text-[#fbdbde]/60 mt-4 max-w-lg mx-auto">
          Nosso casamento é o resultado de duas pessoas que decidiram não
          desistir uma da outra, transformando dias ordinários em
          extraordinários.
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12 pb-6 border-b border-brand-gold/25 dark:border-brand-gold/15">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-brand-wine hover:bg-brand-wine-light text-white px-5 py-2.5 rounded font-sans text-xs uppercase tracking-wider font-semibold shadow-md active:scale-95 cursor-pointer"
          id="add-timeline-chapter-btn"
        >
          <Plus className="w-4 h-4 text-brand-gold" />
          {showAddForm ? "Fechar Painel" : "Escrever No Capitulo"}
        </button>
      </div>

      {/* Add Event Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-12 bg-white dark:bg-brand-charcoal p-6 md:p-8 rounded-lg border border-brand-gold/50 dark:border-brand-gold/25 shadow-xl overflow-hidden"
          >
            <h3 className="font-serif text-lg font-bold text-brand-wine dark:text-brand-gold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-gold" />
              Adicionar Novo Capítulo do nosso livro de Amor
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-xs uppercase text-brand-charcoal/70 dark:text-[#fbdbde]/70 tracking-wider font-semibold mb-1">
                    Ano da Memória
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 2021"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-brand-cream/30 dark:bg-brand-slate/40 border border-brand-gold/40 dark:border-brand-gold/30 rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white focus:outline-hidden focus:border-brand-wine"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase text-brand-charcoal/70 dark:text-[#fbdbde]/70 tracking-wider font-semibold mb-1">
                    Título do Capítulo
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Primeira viagem para Gramado"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-brand-cream/30 dark:bg-brand-slate/40 border border-brand-gold/40 dark:border-brand-gold/30 rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white focus:outline-hidden focus:border-brand-wine"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-brand-charcoal/70 dark:text-[#fbdbde]/70 tracking-wider font-semibold mb-1">
                    Categoria/Etiqueta
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Viagem, Sonho, Casamento"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full bg-brand-cream/30 dark:bg-brand-slate/40 border border-brand-gold/40 dark:border-brand-gold/30 rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white focus:outline-hidden focus:border-brand-wine"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase text-brand-charcoal/70 dark:text-[#fbdbde]/70 tracking-wider font-semibold mb-2">
                    Imagem das Bodas / Momento
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[10px] uppercase text-brand-charcoal/60 dark:text-[#fbdbde]/60 font-semibold mb-1">
                        Opção 1: Link da Internet
                      </span>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full bg-brand-cream/30 dark:bg-brand-slate/40 border border-brand-gold/40 dark:border-brand-gold/30 rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white focus:outline-hidden focus:border-brand-wine"
                      />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-brand-charcoal/60 dark:text-[#fbdbde]/60 font-semibold mb-1">
                        Opção 2: Carregar imagem local
                      </span>
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files?.[0];
                          if (file && file.type.startsWith("image/")) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result)
                                setImageUrl(event.target.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        onClick={() => {
                          const input = document.createElement("input");
                          input.type = "file";
                          input.accept = "image/*";
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement)
                              .files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result)
                                  setImageUrl(event.target.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          };
                          input.click();
                        }}
                        className="border-2 border-dashed border-brand-gold/40 hover:border-brand-gold/70 rounded-lg p-2 text-center cursor-pointer hover:bg-brand-gold/5 transition-all flex items-center justify-center h-[38px] group"
                      >
                        <span className="text-[11px] text-brand-gold-dark dark:text-brand-gold/80 font-sans font-semibold group-hover:text-brand-gold">
                          Arraste ou clique para enviar foto
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-brand-charcoal/70 dark:text-[#fbdbde]/70 tracking-wider font-semibold mb-1">
                  História Detalhada
                </label>
                <textarea
                  rows={3}
                  placeholder="Conte um pouco como foi essa conquista ou esse dia especial..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-brand-cream/30 dark:bg-brand-slate/40 border border-brand-gold/40 dark:border-brand-gold/30 rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white focus:outline-hidden focus:border-brand-wine resize-y"
                />
              </div>

              {formError && (
                <p className="text-red-500 text-xs italic font-medium">
                  {formError}
                </p>
              )}

              {imageUrl && (
                <div className="p-3 bg-brand-cream/20 rounded border border-brand-gold/30">
                  <span className="text-[10px] text-brand-gold-dark uppercase block mb-1">
                    Pré-visualização da imagem:
                  </span>
                  <div className="h-40 w-full overflow-hidden rounded">
                    <img
                      src={imageUrl}
                      alt="Pré-visualização"
                      className="w-full h-full object-cover"
                      onError={() =>
                        setFormError(
                          "Ocorreu um erro ao carregar a imagem deste link. Certifique-se de que é um link público válido.",
                        )
                      }
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-brand-gold/45 text-brand-charcoal/70 dark:text-[#fbdbde]/80 text-xs uppercase tracking-wider rounded font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-brand-wine hover:bg-brand-wine-light text-white px-6 py-2 rounded text-xs uppercase tracking-wider font-bold shadow-md cursor-pointer"
                >
                  <Check className="w-4 h-4 text-brand-gold" /> Gravar Memória
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline Node Chain */}
      <div className="relative mt-12 pl-6 md:pl-0">
        <div className="absolute top-0 bottom-0 left-0 md:left-1/2 w-0.5 bg-gradient-to-b from-brand-wine/20 via-brand-gold/40 to-brand-wine/20 md:-translate-x-1/2 pointer-events-none" />

        <div className="space-y-16">
          {sortedEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row items-stretch gap-6 md:gap-12 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Marker node */}
                <div className="absolute left-[-24px] md:left-1/2 w-8 h-8 rounded-full bg-brand-wine border-4 border-brand-cream flex items-center justify-center dark:border-brand-charcoal text-brand-gold shadow-lg z-10 md:-translate-x-1/2 mt-6">
                  <Calendar className="w-3 h-3 text-brand-gold" />
                </div>

                {/* Narrative block */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div
                    className={`p-6 md:p-8 bg-white dark:bg-brand-charcoal rounded-xl border border-brand-gold/50 dark:border-brand-gold/10 shadow-xl relative group hover:border-brand-gold transition-all duration-300 ${
                      isEven ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <button
                      onClick={() => onDeleteEvent(event.id)}
                      className="absolute top-4 right-4 p-1.5 rounded hover:bg-red-500/10 text-brand-gold-dark hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center"
                      title="Apagar esta memória"
                      id={`delete-timeline-event-${event.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div
                      className={`flex items-center gap-2 mb-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}
                    >
                      <span className="font-serif text-3xl font-black text-brand-gold tracking-tighter">
                        {event.year}
                      </span>
                      <div className="h-4 w-[1px] bg-brand-gold/30" />
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-cream text-brand-wine dark:bg-brand-gold/25 dark:text-brand-gold border border-brand-gold/40 dark:border-brand-gold/20 text-[10px] uppercase font-bold tracking-widest">
                        <Tag className="w-2.5 h-2.5 text-brand-gold fill-current" />
                        {event.tag || "Bodas"}
                      </div>
                    </div>

                    <h3 className="font-serif text-lg md:text-xl font-bold text-brand-wine dark:text-brand-cream group-hover:text-brand-gold transition-colors duration-300">
                      {event.title}
                    </h3>

                    <p className="font-sans text-xs md:text-sm text-brand-charcoal/70 dark:text-[#fbdbde]/70 mt-3 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Photo block */}
                <div className="w-full md:w-1/2 flex items-center justify-center">
                  <div className="h-64 w-full max-w-md overflow-hidden rounded-lg shadow-2xl border-4 border-brand-gold/40 dark:border-brand-slate flex justify-center items-center relative group">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-brand-wine/10 mix-blend-overlay group-hover:bg-transparent transition-all pointer-events-none" />
                    <div className="absolute top-3 left-3 bg-brand-wine/80 px-3 py-1 text-white border border-brand-gold/30 rounded-full font-serif text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                      <Sparkle className="w-3 h-3 text-brand-gold fill-current animate-pulse" />
                      Celebrando {event.year}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
