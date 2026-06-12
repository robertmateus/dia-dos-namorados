import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Menu } from "lucide-react";

import {
  INITIAL_TIMELINE_EVENTS,
  INITIAL_LOVE_LETTERS,
  INITIAL_FAMILY_MEMBERS,
  INITIAL_LOVE_REASONS,
} from "./data";
import { TimelineEvent, LoveLetter, FamilyMember, LoveReason } from "./types";

// Asset Imports
import capa from "./assets/images/capa.webp";

// Component Imports
import CollapsibleSidebar from "./components/CollapsibleSidebar";
import MainDashboard from "./components/MainDashboard";
import TimelineSection from "./components/TimelineSection";
import LettersSection from "./components/LettersSection";
import FamilySection from "./components/FamilySection";
import ReasonsSection from "./components/ReasonsSection.tsx";

export default function App() {
  // Navigation & Layout States
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl] = useState("/musica.mp3");
  const [currentTrack] = useState("John Legend - All of Me");

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Core Customization Settings
  const [names, setNames] = useState<{ groom: string; bride: string }>(() => {
    const saved = localStorage.getItem("always_yours_names");
    return saved ? JSON.parse(saved) : { groom: "Robert", bride: "Maria" };
  });

  const [dates, setDates] = useState<{ wedding: string; dating: string }>(
    () => {
      const migrated = localStorage.getItem("always_yours_dates_migrated_v3");
      if (!migrated) {
        localStorage.setItem("always_yours_dates_migrated_v3", "true");
        const defaults = { wedding: "2019-06-15", dating: "2018-05-24" };
        localStorage.setItem("always_yours_dates", JSON.stringify(defaults));
        return defaults;
      }
      const saved = localStorage.getItem("always_yours_dates");
      return saved
        ? JSON.parse(saved)
        : { wedding: "2019-06-15", dating: "2018-05-24" };
    },
  );

  const [heroImage, setHeroImage] = useState<string>(() => {
    const saved = localStorage.getItem("always_yours_hero");
    if (
      !saved ||
      saved.includes("lh3.googleusercontent.com/aida-public/") ||
      saved.includes("/src/assets/images/")
    ) {
      localStorage.setItem("always_yours_hero", capa);
      return capa;
    }
    return saved;
  });

  // Dynamic Content Lists
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(
    INITIAL_TIMELINE_EVENTS,
  );
  const [loveLetters, setLoveLetters] =
    useState<LoveLetter[]>(INITIAL_LOVE_LETTERS);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(
    INITIAL_FAMILY_MEMBERS,
  );
  const [loveReasons, setLoveReasons] =
    useState<LoveReason[]>(INITIAL_LOVE_REASONS);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("always_yours_names", JSON.stringify(names));
  }, [names]);

  useEffect(() => {
    localStorage.setItem("always_yours_dates", JSON.stringify(dates));
  }, [dates]);

  useEffect(() => {
    localStorage.setItem("always_yours_hero", heroImage);
  }, [heroImage]);

  useEffect(() => {
    localStorage.setItem(
      "always_yours_timeline",
      JSON.stringify(timelineEvents),
    );
  }, [timelineEvents]);

  useEffect(() => {
    localStorage.setItem("always_yours_letters", JSON.stringify(loveLetters));
  }, [loveLetters]);

  useEffect(() => {
    localStorage.setItem("always_yours_family", JSON.stringify(familyMembers));
  }, [familyMembers]);

  useEffect(() => {
    localStorage.setItem("always_yours_reasons", JSON.stringify(loveReasons));
  }, [loveReasons]);

  // Dark mode — padrão escuro, respeita preferência salva
  useEffect(() => {
    const savedTheme = localStorage.getItem("always_yours_theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      // dark é o padrão (sem preferência salva ou salvo como "dark")
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("always_yours_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("always_yours_theme", "light");
      }
      return next;
    });
  };

  // Timeline handlers
  const handleAddTimelineEvent = (newEvent: Omit<TimelineEvent, "id">) => {
    setTimelineEvents((prev) => [
      ...prev,
      { ...newEvent, id: `timeline-${Date.now()}` },
    ]);
  };

  const handleDeleteTimelineEvent = (id: string) => {
    setTimelineEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleResetTimeline = () => {
    if (
      window.confirm(
        "Deseja restaurar as memórias originais da linha do tempo? suas alterações locais serão sobrepostas.",
      )
    ) {
      setTimelineEvents(INITIAL_TIMELINE_EVENTS);
    }
  };

  // Letters handlers
  const handleAddLoveLetter = (newLetter: Omit<LoveLetter, "id" | "date">) => {
    const letter: LoveLetter = {
      ...newLetter,
      id: `letter-${Date.now()}`,
      date: new Date().toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    setLoveLetters((prev) => [...prev, letter]);
  };

  const handleDeleteLoveLetter = (id: string) => {
    setLoveLetters((prev) => prev.filter((l) => l.id !== id));
  };

  const handleResetLetters = () => {
    if (
      window.confirm(
        "Deseja resetar sua caixa de cartas para a correspondência original?",
      )
    ) {
      setLoveLetters(INITIAL_LOVE_LETTERS);
    }
  };

  // Reasons handlers
  const handleAddLoveReason = (newReason: Omit<LoveReason, "id">) => {
    setLoveReasons((prev) => [
      ...prev,
      { ...newReason, id: `reason-${Date.now()}` },
    ]);
  };

  const handleDeleteLoveReason = (id: string) => {
    setLoveReasons((prev) => prev.filter((re) => re.id !== id));
  };

  const handleResetLoveReasons = () => {
    if (window.confirm("Restaurar motivos de afeto originais?")) {
      setLoveReasons(INITIAL_LOVE_REASONS);
    }
  };

  // Family handlers
  const handleUpdateFamilyMember = (
    id: string,
    updated: Omit<FamilyMember, "id">,
  ) => {
    setFamilyMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m)),
    );
  };

  const handleResetFamilyMembers = () => {
    if (window.confirm("Restaurar fotos e informações originais da família?")) {
      setFamilyMembers(INITIAL_FAMILY_MEMBERS);
    }
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <MainDashboard
            names={names}
            setNames={setNames}
            dates={dates}
            setDates={setDates}
            heroImage={heroImage}
            setHeroImage={setHeroImage}
            setActiveTab={setActiveTab}
            setIsPlaying={setIsPlaying}
            isPlaying={isPlaying}
            currentTrack={currentTrack}
          />
        );
      case "timeline":
        return (
          <TimelineSection
            events={timelineEvents}
            onAddEvent={handleAddTimelineEvent}
            onDeleteEvent={handleDeleteTimelineEvent}
            onResetEvents={handleResetTimeline}
          />
        );
      case "letters":
        return (
          <LettersSection
            letters={loveLetters}
            onAddLetter={handleAddLoveLetter}
            onDeleteLetter={handleDeleteLoveLetter}
            onResetLetters={handleResetLetters}
          />
        );
      case "reasons":
        return (
          <ReasonsSection
            reasons={loveReasons}
            onAddReason={handleAddLoveReason}
            onDeleteReason={handleDeleteLoveReason}
            onResetReasons={handleResetLoveReasons}
          />
        );
      case "family":
        return (
          <FamilySection
            members={familyMembers}
            onUpdateMember={handleUpdateFamilyMember}
            onResetMembers={handleResetFamilyMembers}
          />
        );
      default:
        return <div>Oops! Tela desconhecida.</div>;
    }
  };

  return (
    <div className="min-h-screen flex text-brand-charcoal bg-brand-cream/10 dark:bg-[#111] dark:text-[#eee] transition-colors duration-300">
      {/* Audio Global - persiste entre abas */}
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />
      <CollapsibleSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        datingDate={dates.dating}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative overflow-hidden">
        <header className="sticky top-0 z-30 bg-white/70 dark:bg-[#151313]/70 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 flex items-center border-b border-brand-gold/15 transition-colors touch-target">
          {/* Hamburger - esquerda */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2.5 rounded text-[#735c00] hover:bg-brand-wine/10 cursor-pointer flex items-center justify-center outline-hidden select-none touch-target-sm shrink-0"
            title="Abrir navegação lateral"
            id="expand-sidebar-btn"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Título - centralizado */}
          <div className="flex-1 flex justify-center">
            <h1 className="font-serif text-sm sm:text-base md:text-xl font-bold tracking-tight text-brand-wine dark:text-brand-gold flex items-center gap-1.5 sm:gap-2 leading-snug">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold fill-brand-gold shrink-0" />
              <span className="text-sm sm:text-base md:text-xl">
                Para Sempre, Robert & {names.bride}
              </span>
            </h1>
          </div>

          {/* Espaço balanceador direito (mesmo tamanho do hamburger) */}
          <div className="md:hidden w-10 shrink-0" />
        </header>

        <main className="flex-1 relative overflow-x-hidden w-full max-w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full h-full max-w-full"
            >
              {renderActiveSection()}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="py-6 sm:py-8 bg-white dark:bg-[#151313] border-t border-brand-gold/15 text-center mt-8 sm:mt-12 transition-colors px-4">
          <p className="font-serif italic text-xs sm:text-sm text-[#735c00] dark:text-brand-gold">
            "A nossa história foi escrita pelas mãos de Deus"
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px] uppercase text-brand-charcoal/50 dark:text-white/40 tracking-widest mt-2">
            <span>© 2026</span>
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-brand-gold" />
            <span>Feito por Robert com muito carinho</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
