import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LoveLetter } from "../types";
import {
  Mail,
  Trash2,
  Plus,
  Check,
  FileText,
  BookOpen,
  RefreshCw,
  Heart,
  Palette,
  Eye,
} from "lucide-react";

interface LettersSectionProps {
  letters: LoveLetter[];
  onAddLetter: (letter: Omit<LoveLetter, "id" | "date">) => void;
  onDeleteLetter: (id: string) => void;
  onResetLetters: () => void;
}

export default function LettersSection({
  letters,
  onAddLetter,
  onDeleteLetter,
  onResetLetters,
}: LettersSectionProps) {
  const [selectedLetterId, setSelectedLetterId] = useState<string>(
    letters[0]?.id || "",
  );
  const [showEditor, setShowEditor] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [sender, setSender] = useState("Ele");
  const [recipient, setRecipient] = useState("Ela");
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState<
    "cream" | "midnight" | "blush" | "vintage"
  >("cream");
  const [stamp, setStamp] = useState<"heart" | "rose" | "wings" | "stars">(
    "heart",
  );

  const [formError, setFormError] = useState("");

  // Selected letter
  const activeLetter =
    letters.find((l) => l.id === selectedLetterId) || letters[0];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setFormError(
        "Por favor, defina um título e escreva uma mensagem antes de lacrar.",
      );
      return;
    }

    onAddLetter({
      title,
      sender,
      recipient,
      content,
      theme,
      stamp,
    });

    // Reset editor
    setTitle("");
    setContent("");
    setFormError("");
    setShowEditor(false);

    // Auto-select latest added
    if (letters.length > 0) {
      setSelectedLetterId(letters[letters.length - 1].id);
    }
  };

  // Theme styling definitions
  const themeStyles: Record<
    string,
    { bg: string; text: string; font: string; border: string }
  > = {
    cream: {
      bg: "bg-[#fbf8ee] text-[#2b2518]",
      text: "text-[#443825]",
      font: "font-serif leading-8 italic",
      border: "border-[#ebdcc3]",
    },
    midnight: {
      bg: "bg-brand-wine text-brand-blush",
      text: "text-[#fbdbde]/80",
      font: "font-serif leading-8 italic",
      border: "border-brand-gold/30",
    },
    blush: {
      bg: "bg-[#fef4f4] text-brand-wine-light",
      text: "text-brand-wine-light/90",
      font: "font-serif leading-8 italic",
      border: "border-brand-blush",
    },
    vintage: {
      bg: "bg-[#faf0d9] text-[#4d361b]",
      text: "text-[#614526]",
      font: "font-handy text-2xl leading-10 scroll-smooth",
      border: "border-[#dfc3a1]",
    },
  };

  // Stamp seal render helper
  const renderWaxSeal = (type: string) => {
    const symbols: Record<string, string> = {
      heart: "❤",
      rose: "🌹",
      wings: "🕊",
      stars: "✨",
    };
    return (
      <div
        className="relative w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl cursor-pointer select-none border-2 border-brand-gold/10 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 ml-auto"
        style={{
          background: "radial-gradient(circle at 35% 35%, #a13c3f, #410007)",
          boxShadow: "1px 3px 6px rgba(0,0,0,0.35)",
        }}
        title={`Selo de lacre de Cera: ${type}`}
      >
        <span className="text-white/40 drop-shadow-sm select-none select-none">
          {symbols[type] || "❤"}
        </span>
        {/* Border ring */}
        <div className="absolute inset-1 rounded-full border border-white/10 pointer-events-none" />
      </div>
    );
  };

  return (
    <div className="content-container py-8 sm:py-12">
      {/* Title */}
      <div className="text-center mb-10 sm:mb-12">
        <span className="font-sans text-[11px] text-brand-gold-dark dark:text-brand-gold uppercase tracking-[0.3em] font-semibold block mb-2">
          ESCRITO À MÃO
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-brand-wine dark:text-brand-cream leading-tight">
          Carta de Amor
        </h2>
        <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        <p className="font-sans text-xs md:text-sm text-brand-charcoal/60 dark:text-[#fbdbde]/60 mt-4 max-w-lg mx-auto">
          Confissões, do fundo do meu coração. Promessas e afetos selados no
          papel, esperando apenas pelos seus olhos.
        </p>
      </div>

      {/* Primary Row actions */}

      <div className="flex flex-col  gap-8 items-center justify-center">
        {/* Collapsible Selector Deck of Letters - 4 columns */}
        <div className="lg:col-span-4 space-y-3.5">
          {letters.map((letItem) => {
            const isSelected = letItem.id === (activeLetter?.id || "");
            return (
              <button
                key={letItem.id}
                onClick={() => {
                  setSelectedLetterId(letItem.id);
                  setShowEditor(false);
                }}
                className={`w-full flex items-center justify-between p-4 rounded-lg border text-left cursor-pointer transition-all ${
                  isSelected
                    ? "border-brand-gold bg-brand-wine text-white shadow-lg shadow-brand-gold/5"
                    : "border-brand-gold/15 bg-white dark:bg-brand-charcoal text-brand-charcoal dark:text-white hover:border-brand-gold/40"
                }`}
                id={`letter-select-item-${letItem.id}`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail
                    className={`w-5 h-5 flex-shrink-0 ${isSelected ? "text-brand-gold" : "text-brand-gold-dark"}`}
                  />
                  <div className="truncate flex flex-col items-center justify-center">
                    <p className="font-serif font-semibold text-sm truncate">
                      {letItem.title}
                    </p>
                    <p
                      className={`text-[10px] mt-0.5 font-sans uppercase tracking-widest ${isSelected ? "text-brand-blush/80" : "text-brand-charcoal/50 dark:text-[#fbdbde]/50 text-center"}`}
                    >
                      De: {"Robert"} ➔ Para: {"Maria"}
                    </p>
                  </div>
                </div>

                {/* Inline garbage button (if many items) */}
                {letters.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteLetter(letItem.id);
                      if (isSelected) {
                        const fallback = letters.find(
                          (l) => l.id !== letItem.id,
                        );
                        if (fallback) setSelectedLetterId(fallback.id);
                      }
                    }}
                    className="p-1 rounded text-brand-gold hover:text-red-500 transition-colors cursor-pointer ml-2"
                    title="Rasgar Carta"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Area / Letter Editor - 8 columns */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {showEditor ? (
              /* Create Letter Editor Form Segment */
              <motion.div
                key="editor"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="bg-white dark:bg-brand-charcoal p-6 md:p-8 rounded-xl border border-brand-gold/30 shadow-2xl"
              >
                <h3 className="font-serif text-xl font-bold text-brand-wine dark:text-brand-gold mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-gold" />
                  Sua Nova Correspondência Pessoal
                </h3>

                <form onSubmit={handleCreate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-brand-charcoal dark:text-[#fbdbde] font-semibold mb-1">
                        Quem Escreve (Remetente)
                      </label>
                      <input
                        type="text"
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                        className="w-full bg-brand-cream/30 dark:bg-brand-slate/40 border border-brand-gold/30 rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white focus:outline-hidden focus:border-brand-wine"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-brand-charcoal dark:text-[#fbdbde] font-semibold mb-1">
                        Destinatário
                      </label>
                      <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full bg-brand-cream/30 dark:bg-brand-slate/40 border border-brand-gold/30 rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white focus:outline-hidden focus:border-brand-wine"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-charcoal dark:text-[#fbdbde] font-semibold mb-1">
                      Título da Carta
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Doce lembrança do nosso ensaio fotográfico"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-brand-cream/30 dark:bg-brand-slate/40 border border-brand-gold/30 rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white focus:outline-hidden focus:border-brand-wine"
                    />
                  </div>

                  {/* Themes / Seals select slider */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-brand-charcoal dark:text-[#fbdbde] font-semibold mb-1">
                        Tema Visual do Papel
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        {[
                          {
                            id: "cream",
                            color: "bg-[#fbf8ee] border-brand-gold/20",
                          },
                          {
                            id: "midnight",
                            color: "bg-brand-wine border-brand-gold/30",
                          },
                          {
                            id: "blush",
                            color: "bg-[#fef4f4] border-brand-blush",
                          },
                          {
                            id: "vintage",
                            color: "bg-[#faf0d9] border-[#dfc3a1]",
                          },
                        ].map((pap) => (
                          <button
                            key={pap.id}
                            type="button"
                            onClick={() => setTheme(pap.id as any)}
                            className={`w-8 h-8 rounded border-2 transition-all cursor-pointer ${pap.color} ${theme === pap.id ? "ring-2 ring-brand-gold offset-2" : ""}`}
                            title={`Escolher papel: ${pap.id}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-brand-charcoal dark:text-[#fbdbde] font-semibold mb-1">
                        Estampa do Selo de Cera
                      </label>
                      <select
                        value={stamp}
                        onChange={(e: any) => setStamp(e.target.value)}
                        className="w-full bg-brand-cream/30 dark:bg-brand-slate/40 border border-brand-gold/30 rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white focus:outline-hidden focus:border-brand-wine mt-1"
                      >
                        <option value="heart">Coração Sagrado ❤</option>
                        <option value="rose">Rosa dos Desejos 🌹</option>
                        <option value="wings">Pomba da Paz 🕊</option>
                        <option value="stars">Brilho das Estrelas ✨</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-brand-charcoal dark:text-[#fbdbde] font-semibold mb-1 font-bold">
                      Conteúdo do Bilhete ou Carta
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Querida, escrevo esta mensagem para darmos risadas do quanto tudo valeu a pena..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full bg-brand-cream/30 dark:bg-brand-slate/40 border border-brand-gold/30 rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white focus:outline-hidden focus:border-brand-wine resize-y leading-relaxed font-serif italic"
                    />
                  </div>

                  {formError && (
                    <p className="text-red-500 text-xs italic font-medium">
                      {formError}
                    </p>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowEditor(false)}
                      className="px-4 py-2 border border-brand-gold/50 text-brand-charcoal dark:text-[#fbdbde] text-xs uppercase tracking-wider rounded font-bold cursor-pointer"
                    >
                      Voltar à Leitura
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 bg-brand-wine hover:bg-brand-wine-light text-white px-5 py-2 rounded text-xs uppercase tracking-wider font-bold cursor-pointer"
                    >
                      <Check className="w-4 h-4 text-brand-gold" /> Lacrar e
                      Selar Cartão
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              /* View and Read Selected Letter block */
              <motion.div
                key={activeLetter?.id || "none"}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`${themeStyles[activeLetter?.theme || "cream"].bg} p-8 md:p-14 rounded-sm border-2 ${themeStyles[activeLetter?.theme || "cream"].border} shadow-2xl relative overflow-hidden`}
              >
                {/* Vintage paper ornament */}
                <div className="absolute top-4 right-4 text-brand-gold/15 pointer-events-none select-none">
                  <Mail className="w-32 h-32 rotate-12" />
                </div>

                <div className="border-b border-brand-gold/25 pb-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="font-sans text-[10px] tracking-widest text-[#735c00] font-bold uppercase block mb-1">
                      CORRESPONDÊNCIA SELADA DE AMOR
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-wine dark:text-[#fcc4c2] leading-tight">
                      {activeLetter?.title}
                    </h3>
                  </div>
                  <span className="text-xs font-sans font-semibold text-brand-gold-dark dark:text-brand-gold tracking-widest bg-white/40 dark:bg-black/10 px-3 py-1 rounded border border-brand-gold/10">
                    {"12/06/2026"}
                  </span>
                </div>

                {/* Sub title info of sender */}

                {/* Letter Content Styled dynamically */}
                <div
                  className={`whitespace-pre-line ${themeStyles[activeLetter?.theme || "cream"].text} ${themeStyles[activeLetter?.theme || "cream"].font} leading-relaxed tracking-wide min-h-[16rem]`}
                  style={{ wordBreak: "break-word" }}
                >
                  {activeLetter?.content}
                </div>

                {/* Wax stamp footer segment */}
                <div className="mt-12 flex items-center justify-between pt-6 border-t border-brand-gold/20 flex-wrap gap-4">
                  <div>
                    <p className="font-serif italic text-sm opacity-85">
                      Assinado com amor,
                    </p>
                    <p className="font-serif font-black text-sm text-[11px] tracking-widest uppercase mt-1 text-brand-gold-dark dark:text-brand-gold">
                      {"Robert"}
                    </p>
                  </div>

                  {/* Wax Seal rendering */}
                  {renderWaxSeal(activeLetter?.stamp || "heart")}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
