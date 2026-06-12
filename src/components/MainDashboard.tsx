import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import capa1 from "../assets/images/capa1.webp";
import {
  Heart,
  Clock,
  Music,
  Sparkle,
  Edit,
  Check,
  Play,
  Pause,
  Calendar,
  Volume2,
  ArrowRight,
} from "lucide-react";

interface MainDashboardProps {
  names: { groom: string; bride: string };
  setNames: (names: { groom: string; bride: string }) => void;
  dates: { wedding: string; dating: string };
  setDates: (dates: { wedding: string; dating: string }) => void;
  heroImage: string;
  setHeroImage: (url: string) => void;
  setActiveTab: (tab: string) => void;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
  currentTrack: string;
}

export default function MainDashboard({
  names,
  setNames,
  dates,
  setDates,
  heroImage,
  setHeroImage,
  setActiveTab,
  isPlaying,
  setIsPlaying,
  currentTrack,
}: MainDashboardProps) {
  const [showConfig, setShowConfig] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [tempGroom, setTempGroom] = useState(names.groom);
  const [tempBride, setTempBride] = useState(names.bride);
  const [tempWedding, setTempWedding] = useState(dates.wedding);
  const [tempDating, setTempDating] = useState(dates.dating);
  const [tempHero, setTempHero] = useState(heroImage);

  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [dateDating, setDateDating] = useState({
    totalDays: 0,
    years: 0,
    months: 0,
    days: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const parseLocalDate = (
        dateStr: string,
        hour = 12,
        minute = 0,
        second = 0,
      ) => {
        const parts = dateStr.split("-");
        return new Date(
          Number(parts[0]),
          Number(parts[1]) - 1,
          Number(parts[2]),
          hour,
          minute,
          second,
        );
      };

      const now = new Date();
      const wedDate = parseLocalDate(dates.wedding, 18, 30, 0);
      const datDate = parseLocalDate(dates.dating, 12, 0, 0);

      let diffMs = now.getTime() - wedDate.getTime();
      if (diffMs < 0) diffMs = 0;

      const totalSecs = Math.floor(diffMs / 1000);
      const seconds = totalSecs % 60;
      const totalMins = Math.floor(totalSecs / 60);
      const minutes = totalMins % 60;
      const totalHours = Math.floor(totalMins / 60);
      const hours = totalHours % 24;

      let years = now.getFullYear() - wedDate.getFullYear();
      let months = now.getMonth() - wedDate.getMonth();
      let days = now.getDate() - wedDate.getDate();

      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setTimeElapsed({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours,
        minutes,
        seconds,
      });

      const todayAtNoon = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        12,
        0,
        0,
      );
      const diffDatingMs = todayAtNoon.getTime() - datDate.getTime();
      const totalDatingDays = Math.round(diffDatingMs / (1000 * 60 * 60 * 24));

      let datYears = now.getFullYear() - datDate.getFullYear();
      let datMonths = now.getMonth() - datDate.getMonth();
      let datDays = now.getDate() - datDate.getDate();

      if (datDays < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        datDays += prevMonth.getDate();
        datMonths--;
      }
      if (datMonths < 0) {
        datMonths += 12;
        datYears--;
      }

      setDateDating({
        totalDays: totalDatingDays,
        years: Math.max(0, datYears),
        months: Math.max(0, datMonths),
        days: Math.max(0, datDays),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [dates]);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setNames({ groom: tempGroom, bride: tempBride });
    setDates({ wedding: tempWedding, dating: tempDating });
    setHeroImage(tempHero);
    setShowConfig(false);
  };

  const [sparkles, setSparkles] = useState(
    [] as { id: number; left: string; size: string; delay: string }[],
  );

  useEffect(() => {
    const list = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 95}%`,
      size: `${Math.random() * 4 + 3}px`,
      delay: `${Math.random() * 5}s`,
    }));
    setSparkles(list);
  }, []);

  const isTodayAnniversary = () => {
    const now = new Date();
    const wedDate = new Date(dates.wedding);
    return (
      now.getMonth() === wedDate.getMonth() &&
      now.getDate() === wedDate.getDate()
    );
  };

  const getBodasName = (years: number) => {
    switch (years) {
      case 1:
        return "BODAS DE PAPEL";
      case 2:
        return "BODAS DE ALGODÃO";
      case 3:
        return "BODAS DE TRIGO OU COURO";
      case 4:
        return "BODAS DE FLORES E FRUTAS";
      case 5:
        return "BODAS DE MADEIRA OU FERRO";
      case 6:
        return "BODAS DE PERFUME OU AÇÚCAR";
      case 7:
        return "BODAS DE LÃ OU LATÃO";
      case 8:
        return "BODAS DE PAPOULA OU BARRO";
      case 9:
        return "BODAS DE CERÂMICA OU VIME";
      case 10:
        return "BODAS DE ESTANHO OU ZINCO";
      default:
        return `BODAS DE CASAMENTO (${years} ANOS)`;
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-brand-cream/40 dark:bg-[#151313] transition-colors duration-300">
      {/* Decorative Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {sparkles.map((sp) => (
          <div
            key={sp.id}
            className="absolute bg-brand-gold rounded-full opacity-60 animate-float"
            style={{
              left: sp.left,
              top: `${Math.random() * 90}%`,
              width: sp.size,
              height: sp.size,
              animationDelay: sp.delay,
              animationDuration: `${Math.random() * 3 + 4}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Header */}
      <div className="relative h-[45vh] sm:h-[55vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Imagem Desktop */}
          <motion.img
            key={heroImage}
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1.02, opacity: 0.9 }}
            transition={{ duration: 1.5 }}
            className="hidden sm:block w-full h-full object-cover dark:brightness-75 brightness-95 filter"
            src={heroImage}
            alt="Aniversário de Casamento - Hero"
          />
          {/* Imagem Mobile */}
          <motion.img
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1.02, opacity: 0.9 }}
            transition={{ duration: 1.5 }}
            className="block sm:hidden w-full h-full object-cover dark:brightness-75 brightness-95 filter"
            src={capa1}
            alt="Aniversário de Casamento - Hero Mobile"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-cream/10 via-transparent to-brand-wine/10 dark:from-[#151313] dark:to-black/60 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-cream/100 dark:from-[#151313] to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-brand-wine/10 dark:bg-black/30 pointer-events-none" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-wine text-brand-gold dark:bg-brand-gold dark:text-brand-wine border border-brand-gold/30 mb-6 shadow-xl"
          >
            <Sparkle className="w-3.5 h-3.5 animate-spin-slow text-brand-gold dark:text-brand-wine fill-current" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em]">
              Feliz dia dos Namorados
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-brand-wine dark:text-brand-gold leading-tight tracking-tight drop-shadow-md"
          >
            {names.groom} &amp; {names.bride}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-handy text-2xl sm:text-4xl text-brand-gold-dark dark:text-brand-gold/70 mt-4"
          >
            "Eternos Namorados"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center justify-center gap-4 mt-8 flex-wrap"
          >
            <button
              onClick={() => setActiveTab("timeline")}
              className="flex items-center gap-2 bg-brand-wine hover:bg-brand-wine-light text-white px-6 py-3 font-sans text-xs uppercase tracking-widest rounded-sm border border-brand-gold/30 hover:shadow-xl transition-all font-semibold active:scale-95 cursor-pointer"
            >
              Nossa História <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container -mt-20 md:-mt-24 relative z-20 pb-20">
        {isTodayAnniversary() && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 p-6 rounded bg-gradient-to-r from-brand-wine to-brand-wine-light text-white text-center shadow-2xl border border-brand-gold/45 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 text-brand-gold/15 pointer-events-none">
              <Heart className="w-32 h-32 fill-current -rotate-12" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-gold mb-2 flex items-center justify-center gap-2">
              <Sparkle className="w-6 h-6 animate-pulse fill-brand-gold" />
              Feliz Aniversário de Bodas!
              <Sparkle className="w-6 h-6 animate-pulse fill-brand-gold" />
            </h2>
            <p className="font-sans text-sm md:text-base text-[#fbdbde] max-w-2xl mx-auto leading-relaxed">
              Hoje é dia{" "}
              <strong>
                {new Date(dates.wedding + "T12:00:00").toLocaleDateString(
                  "pt-BR",
                  {
                    day: "numeric",
                    month: "long",
                  },
                )}
              </strong>
              ! Dia de celebrar exatamente {timeElapsed.years} anos desde que
              disseram "Sim" no altar. Um brinde ao amor eterno!
            </p>
          </motion.div>
        )}

        {/* Live Clock Widget */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-brand-charcoal p-8 md:p-12 rounded-xl shadow-2xl border border-brand-gold/50 dark:border-brand-gold/10 text-center mb-12 relative overflow-hidden"
        >
          <div className="absolute top-4 left-4 text-brand-gold/30">
            <Clock className="w-5 h-5 animate-spin-slow" />
          </div>
          <span className="font-sans text-[11px] text-brand-gold-dark dark:text-brand-gold uppercase tracking-[0.3em] font-semibold">
            {getBodasName(timeElapsed.years)} ({timeElapsed.years} ANOS DE
            CASADOS)
          </span>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-brand-wine dark:text-brand-cream mt-2 mb-8">
            Tempo que estamos casados
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {[
              {
                label: "ANOS",
                value: timeElapsed.years,
                color: "text-brand-wine dark:text-brand-gold",
              },
              {
                label: "MESES",
                value: timeElapsed.months,
                color: "text-brand-wine dark:text-brand-gold",
              },
              {
                label: "DIAS",
                value: timeElapsed.days,
                color: "text-brand-wine dark:text-brand-gold",
              },
              {
                label: "HORAS",
                value: timeElapsed.hours,
                color: "text-brand-gold-dark dark:text-brand-cream",
              },
              {
                label: "MINUTOS",
                value: timeElapsed.minutes,
                color: "text-brand-gold-dark dark:text-brand-cream",
              },
              {
                label: "SEGUNDOS",
                value: timeElapsed.seconds,
                color: "text-brand-gold-light animate-pulse",
              },
            ].map((metric) => (
              <div
                key={metric.label}
                className="bg-brand-cream/35 dark:bg-brand-slate/40 p-5 rounded border border-brand-gold/40 dark:border-brand-gold/10 hover:border-brand-gold/70 transition-all group hover:-translate-y-1"
              >
                <div
                  className={`font-serif text-3xl md:text-5xl font-extrabold ${metric.color}`}
                >
                  {metric.value.toString().padStart(2, "0")}
                </div>
                <div className="font-sans text-[10px] text-brand-charcoal/60 dark:text-[#fbdbde]/60 tracking-widest mt-2">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-brand-gold/20 font-sans text-xs text-brand-charcoal/60 dark:text-[#fbdbde]/60 max-w-sm mx-auto">
            Casados solenemente em{" "}
            <strong className="text-brand-wine dark:text-brand-gold">
              {new Date(dates.wedding + "T12:00:00").toLocaleDateString(
                "pt-BR",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                },
              )}
            </strong>
            .
          </div>
        </motion.div>

        {/* Configuration Panel */}
        <AnimatePresence>
          {showConfig && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-brand-cream dark:bg-brand-slate p-6 md:p-8 rounded-xl border border-brand-gold/30 mb-12 shadow-inner overflow-hidden"
            >
              <h3 className="font-serif text-lg font-bold text-brand-wine dark:text-brand-gold mb-4 flex items-center gap-2">
                <Edit className="w-4 h-4" /> Personalizar Painel de Amor
              </h3>
              <form
                onSubmit={handleSaveConfig}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-xs text-brand-charcoal dark:text-[#fbdbde] uppercase tracking-wide font-semibold mb-1">
                    Nome dele
                  </label>
                  <input
                    type="text"
                    value={tempGroom}
                    onChange={(e) => setTempGroom(e.target.value)}
                    className="w-full bg-white dark:bg-brand-charcoal border border-brand-gold/30 rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white focus:outline-hidden focus:border-brand-wine"
                  />
                </div>
                <div>
                  <label className="block text-xs text-brand-charcoal dark:text-[#fbdbde] uppercase tracking-wide font-semibold mb-1">
                    Nome dela
                  </label>
                  <input
                    type="text"
                    value={tempBride}
                    onChange={(e) => setTempBride(e.target.value)}
                    className="w-full bg-white dark:bg-brand-charcoal border border-brand-gold/30 rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white focus:outline-hidden focus:border-brand-wine"
                  />
                </div>
                <div>
                  <label className="block text-xs text-brand-charcoal dark:text-[#fbdbde] uppercase tracking-wide font-semibold mb-1">
                    Data de Casamento
                  </label>
                  <input
                    type="date"
                    value={tempWedding}
                    onChange={(e) => setTempWedding(e.target.value)}
                    className="w-full bg-white dark:bg-brand-charcoal border border-brand-gold/30 rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white focus:outline-hidden focus:border-brand-wine"
                  />
                </div>
                <div>
                  <label className="block text-xs text-brand-charcoal dark:text-[#fbdbde] uppercase tracking-wide font-semibold mb-1">
                    Data de Namoro (Início)
                  </label>
                  <input
                    type="date"
                    value={tempDating}
                    onChange={(e) => setTempDating(e.target.value)}
                    className="w-full bg-white dark:bg-brand-charcoal border border-brand-gold/30 rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white focus:outline-hidden focus:border-brand-wine"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs text-brand-charcoal dark:text-[#fbdbde] uppercase tracking-wide font-semibold mb-2">
                    Imagem de Fundo (Capa / Hero)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[10px] uppercase text-brand-charcoal/60 dark:text-[#fbdbde]/60 font-semibold mb-1">
                        Opção 1: Link da Internet
                      </span>
                      <input
                        type="url"
                        value={tempHero}
                        onChange={(e) => setTempHero(e.target.value)}
                        placeholder="https://exemplo.com/foto.jpg"
                        className="w-full bg-white dark:bg-brand-charcoal border border-brand-gold/30 rounded px-3 py-2 text-sm text-brand-charcoal dark:text-white focus:outline-hidden focus:border-brand-wine"
                      />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-brand-charcoal/60 dark:text-[#fbdbde]/60 font-semibold mb-1">
                        Opção 2: Carregar do Dispositivo
                      </span>
                      <div
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
                                  setTempHero(event.target.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          };
                          input.click();
                        }}
                        className="border-2 border-dashed border-brand-gold/30 hover:border-brand-gold/70 rounded-lg p-2 text-center cursor-pointer hover:bg-brand-gold/5 transition-all flex items-center justify-center h-[38px] group"
                      >
                        <span className="text-[11px] text-brand-gold-dark dark:text-brand-gold/80 font-sans font-semibold">
                          Clique para enviar foto
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowConfig(false)}
                    className="px-4 py-2 border border-brand-gold/40 text-brand-gold-dark text-xs uppercase tracking-wider rounded font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2 bg-brand-wine text-white text-xs uppercase tracking-wider rounded font-bold cursor-pointer hover:bg-brand-wine-light"
                  >
                    <Check className="w-4 h-4" /> Aplicar Mudanças
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Dating Counter */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-brand-charcoal p-6 md:p-8 rounded-xl border border-brand-gold/50 dark:border-brand-gold/10 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-brand-gold-dark dark:text-brand-gold">
                <Calendar className="w-5 h-5 text-brand-gold" />
                <span className="font-sans text-[11px] font-bold uppercase tracking-widest">
                  Nossa Linha do tempo
                </span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-wine dark:text-brand-cream">
                O Início de Tudo
              </h3>
              <p className="text-sm text-brand-charcoal/60 dark:text-[#fbdbde]/60 mt-2">
                <strong className="text-brand-wine dark:text-brand-gold">
                  {new Date(dates.dating + "T12:00:00").toLocaleDateString(
                    "pt-BR",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </strong>
                {", "}o dia em que a nossa história ganhou o primeiro capítulo e
                eu te pedi em namoro.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-3 rounded bg-brand-cream/40 dark:bg-brand-slate/40 border border-brand-gold/40 dark:border-brand-gold/15">
                  <span className="text-xs font-sans text-brand-charcoal dark:text-[#fbdbde] font-semibold">
                    Total de dias vividos:
                  </span>
                  <span className="text-serif text-lg font-bold text-brand-wine dark:text-brand-gold">
                    {dateDating.totalDays} dias de puro carinho
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded bg-brand-cream/40 dark:bg-brand-slate/40 border border-brand-gold/40 dark:border-brand-gold/15">
                  <span className="text-xs font-sans text-brand-charcoal dark:text-[#fbdbde] font-semibold">
                    Tempo total aproximado:
                  </span>
                  <span className="text-serif text-sm font-bold text-brand-wine dark:text-brand-gold">
                    {dateDating.years} anos, {dateDating.months} meses,{" "}
                    {dateDating.days} dias
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab("letters")}
              className="mt-6 flex items-center justify-center gap-1.5 w-full py-2.5 bg-brand-cream/70 dark:bg-brand-slate text-brand-wine dark:text-brand-gold text-xs font-bold uppercase tracking-widest rounded border border-brand-gold/40 dark:border-brand-gold/25 hover:bg-brand-wine hover:text-white transition-all cursor-pointer"
            >
              Ler Promessas Escritas 💌
            </button>
          </motion.div>

          {/* Music Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-brand-charcoal p-6 md:p-8 rounded-xl border border-brand-gold/50 dark:border-brand-gold/10 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-brand-gold-dark dark:text-brand-gold">
                <Music className="w-5 h-5 text-brand-gold" />
                <span className="font-sans text-[11px] font-bold uppercase tracking-widest">
                  Trilha Sonora
                </span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-wine dark:text-brand-cream">
                Melodia do Nosso Amor
              </h3>
              <p className="text-sm text-brand-charcoal/60 dark:text-[#fbdbde]/60 mt-2">
                Uma melodia para tocar seu coração enquanto você viaja pela
                nossa história.
              </p>

              <div className="mt-6 p-4 rounded-lg bg-brand-cream/40 dark:bg-brand-slate/40 border border-brand-gold/40 dark:border-brand-gold/20 flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-brand-wine dark:bg-brand-gold flex items-center justify-center text-white dark:text-brand-wine shadow-md hover:scale-105 active:scale-95 transition-all outline-hidden select-none cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-sans text-brand-gold-dark dark:text-brand-gold uppercase tracking-widest font-semibold">
                    Aperte o Play
                  </p>
                  <p className="text-sm text-brand-charcoal dark:text-white font-medium tracking-tight truncate mt-0.5">
                    {currentTrack}
                  </p>
                </div>
              </div>

              {isPlaying && (
                <div className="flex items-center gap-1.5 justify-center mt-6 h-6">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, Math.random() * 20 + 8, 4] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                      className="w-1 bg-brand-wine dark:bg-brand-gold rounded-full"
                    />
                  ))}
                  <Volume2 className="w-4 h-4 text-brand-wine dark:text-brand-gold ml-2 animate-bounce" />
                </div>
              )}
            </div>

            <div className="mt-6 text-center italic font-serif text-xs text-brand-wine dark:text-brand-gold/80 max-w-xs mx-auto">
              "Amar é escolher caminhar lado a lado, um dia de cada vez."
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
