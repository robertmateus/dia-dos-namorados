import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FamilyMember } from "../types";
import {
  Users,
  Trash2,
  Plus,
  Edit2,
  Check,
  RefreshCw,
  Heart,
  Sparkle,
  Image as ImageIcon,
  Smile,
  ListPlus,
} from "lucide-react";

interface FamilySectionProps {
  members: FamilyMember[];
  onUpdateMember: (id: string, updated: Omit<FamilyMember, "id">) => void;
  onResetMembers: () => void;
}

export default function FamilySection({
  members,
  onUpdateMember,
  onResetMembers,
}: FamilySectionProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  // Editing state form
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [favoriteThingsStr, setFavoriteThingsStr] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [formError, setFormError] = useState("");

  const startEdit = (mem: FamilyMember) => {
    setEditingId(mem.id);
    setName(mem.name);
    setRole(mem.role);
    setQuote(mem.quote);
    setFavoriteThingsStr(mem.favoriteThings.join(", "));
    setImageUrl(mem.imageUrl);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !quote || !imageUrl) {
      setFormError("Por favor preencha Nome, Função, Frase e o Link da Foto.");
      return;
    }

    const favoritesArray = favoriteThingsStr
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onUpdateMember(editingId!, {
      name,
      role,
      quote,
      imageUrl,
      favoriteThings: favoritesArray,
    });

    setEditingId(null);
    setFormError("");
  };

  return (
    <div className="content-container py-8 sm:py-12">
      {/* Title */}
      <div className="text-center mb-10 sm:mb-16">
        <span className="font-sans text-[11px] text-brand-gold-dark dark:text-brand-gold uppercase tracking-[0.3em] font-semibold block mb-2">
          O CORAÇÃO DA NOSSA JORNADA
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-brand-wine dark:text-brand-cream leading-tight">
          Nossa Pequena &amp; Doce Família
        </h2>
        <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        <p className="font-sans text-xs md:text-sm text-brand-charcoal/60 dark:text-[#fbdbde]/60 mt-4 max-w-lg mx-auto">
          "Onde a nossa história deu o fruto mais puro e bonito que poderíamos
          sonhar."
        </p>
      </div>

      <div className="flex justify-end gap-3 mb-8">
        <button
          onClick={onResetMembers}
          className="text-xs text-brand-gold-dark hover:text-brand-wine dark:text-brand-gold flex items-center gap-1.5 border border-brand-gold/25 px-3 py-1.5 rounded uppercase font-semibold active:scale-95 cursor-pointer"
          id="reset-family-members-btn"
        >
          <RefreshCw className="w-3" /> Restaurar Retratos Originais
        </button>
      </div>

      {/* Editing overlay panel */}
      <AnimatePresence>
        {editingId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 z-[99] flex items-center justify-center p-4 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-brand-charcoal p-6 md:p-8 rounded-xl border-2 border-brand-gold max-w-xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="font-serif text-lg font-bold text-brand-wine dark:text-brand-gold mb-6 flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-brand-gold" />
                Personalizar Foto e Informações de: {name}
              </h3>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-brand-charcoal dark:text-[#fbdbde] font-semibold mb-1">
                    Nome Completo ou Apelido
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-brand-cream/30 dark:bg-brand-slate/40 border border-[#dfc3a1] rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wide text-brand-charcoal dark:text-[#fbdbde] font-semibold mb-1">
                    Função / Papel na Família
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-brand-cream/30 dark:bg-brand-slate/40 border border-[#dfc3a1] rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wide text-brand-charcoal dark:text-[#fbdbde] font-semibold mb-1">
                    Frase ou Pensamento Favorito
                  </label>
                  <input
                    type="text"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full bg-brand-cream/30 dark:bg-brand-slate/40 border border-[#dfc3a1] rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wide text-brand-charcoal dark:text-[#fbdbde] font-semibold mb-1">
                    Coisas Favoritas (separe por vírgula)
                  </label>
                  <input
                    type="text"
                    placeholder="Café da manhã, Violão, Praia..."
                    value={favoriteThingsStr}
                    onChange={(e) => setFavoriteThingsStr(e.target.value)}
                    className="w-full bg-brand-cream/30 dark:bg-brand-slate/40 border border-[#dfc3a1] rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wide text-brand-charcoal dark:text-[#fbdbde] font-semibold mb-2">
                    Foto de Perfil
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* URL Option */}
                    <div>
                      <span className="block text-[10px] uppercase text-brand-charcoal/60 dark:text-[#fbdbde]/60 font-semibold mb-1">
                        Opção 1: Link da Internet
                      </span>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://exemplo.com/foto.jpg"
                        className="w-full bg-brand-cream/30 dark:bg-brand-slate/40 border border-[#dfc3a1] rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white"
                      />
                    </div>
                    {/* Drag and Drop */}
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
                        className="border-2 border-dashed border-brand-gold/30 hover:border-brand-gold/70 rounded-lg p-2 text-center cursor-pointer hover:bg-brand-gold/5 transition-all flex items-center justify-center h-[38px] group"
                      >
                        <span className="text-[11px] text-brand-gold-dark dark:text-brand-gold/80 font-sans font-semibold group-hover:text-brand-gold">
                          Arraste ou clique para enviar foto
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {formError && (
                  <p className="text-red-500 text-xs italic">{formError}</p>
                )}

                {imageUrl && (
                  <div className="p-3 bg-brand-cream/10 rounded border border-[#dfc3a1]">
                    <span className="text-[10px] text-brand-gold-dark uppercase block mb-1 font-bold">
                      Imagem Carregada:
                    </span>
                    <div className="h-32 w-32 overflow-hidden rounded-full mx-auto border-2 border-brand-gold">
                      <img
                        src={imageUrl}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFormError("");
                    }}
                    className="px-4 py-2 border border-brand-gold/40 text-brand-charcoal dark:text-[#fbdbde] text-xs uppercase font-bold cursor-pointer"
                  >
                    Descartar
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1 px-5 py-2 bg-brand-wine text-white text-xs uppercase font-bold rounded cursor-pointer"
                  >
                    <Check className="w-4 h-4 text-brand-gold" /> Gravar
                    Alterações
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Row Block Cards for family profiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {members.map((mem) => (
          <motion.div
            key={mem.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative bg-white dark:bg-brand-charcoal rounded-2xl border border-brand-gold/15 dark:border-brand-gold/5 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center p-6 text-center"
          >
            {/* Quick edit floating icon */}
            <button
              onClick={() => startEdit(mem)}
              className="absolute top-4 right-4 p-2 rounded-full bg-brand-cream/60 dark:bg-brand-slate text-brand-wine border border-brand-gold/20 hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
              title="Ajustar Perfil"
              id={`edit-family-profile-${mem.id}`}
            >
              <Edit2 className="w-3.5 h-3.5 text-brand-gold-dark" />
            </button>

            {/* Profile Photo Circular with high borders */}
            <div className="relative w-36 h-36 rounded-full border-[6px] border-white dark:border-brand-slate shadow-xl overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-500 flex justify-center items-center">
              <img
                src={mem.imageUrl}
                alt={mem.name}
                className="w-full h-full object-cover filter brightness-[97%] hover:brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-wine/10 bg-blend-multiply group-hover:bg-transparent transition-all pointer-events-none" />
            </div>

            {/* Names & Role */}
            <h3 className="font-serif text-xl font-bold text-brand-wine dark:text-brand-cream tracking-tight">
              {mem.name}
            </h3>
            <span className="inline-flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-brand-gold bg-brand-wine/10 dark:bg-brand-gold/20 px-3 py-1 rounded-full border border-brand-gold/15 mt-1">
              <Smile className="w-3 h-3 text-brand-gold" />
              {mem.role}
            </span>

            {/* Quote Block */}
            <p className="font-serif italic text-brand-charcoal/70 dark:text-[#fbdbde]/70 text-xs mt-6 leading-relaxed bg-brand-cream/30 dark:bg-brand-slate/40 p-4 border border-brand-gold/10 rounded w-full quote-text">
              "{mem.quote}"
            </p>

            {/* Favorite things stack */}
            <div className="w-full pt-4 mt-4 border-t border-brand-gold/10 text-left">
              <span className="font-sans text-[9px] uppercase font-bold tracking-widest text-[#735c00] block mb-2">
                Coisas que Ama:
              </span>
              <ul className="space-y-1.5 list-none">
                {mem.favoriteThings.slice(0, 4).map((thing, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-xs text-brand-charcoal/80 dark:text-[#fbdbde]/85 truncate"
                  >
                    <Heart className="w-3 h-3 text-brand-gold fill-brand-gold shrink-0 animate-pulse" />
                    <span>{thing}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
