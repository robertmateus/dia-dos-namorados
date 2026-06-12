import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Calendar,
  Mail,
  Users,
  BookOpen,
  X,
  Moon,
  Sun,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  datingDate?: string;
}

export default function CollapsibleSidebar({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  isDarkMode,
  toggleDarkMode,
  datingDate,
}: SidebarProps) {
  const yearsTogether = (() => {
    try {
      const startYear = new Date(datingDate || "2018-05-24").getFullYear();
      const currentYear = new Date().getFullYear();
      return Math.max(1, currentYear - startYear);
    } catch {
      return 8;
    }
  })();

  const menuItems = [
    {
      id: "dashboard",
      label: "Painel Geral",
      icon: Heart,
      desc: "Nossa celebração",
    },
    {
      id: "timeline",
      label: "Nossa História",
      icon: Calendar,
      desc: "Linha do tempo",
    },
    {
      id: "letters",
      label: "Cartas de Amor",
      icon: Mail,
      desc: "Correspondência íntima",
    },
    {
      id: "family",
      label: "Nossa Família",
      icon: Users,
      desc: "Coração de nossas vidas",
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-brand-wine text-white dark:bg-brand-charcoal dark:border-r dark:border-brand-gold/15 transition-colors duration-300">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10 dark:border-brand-gold/10 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="min-w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold/30">
            <Heart className="w-5 h-5 text-brand-gold fill-brand-gold/60 animate-pulse" />
          </div>
          {(!collapsed || mobileOpen) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              <span className="font-serif font-bold text-lg tracking-wide text-brand-gold">
                Nossa História
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#fbdbde]/70">
                {yearsTogether} Anos Juntos
              </span>
            </motion.div>
          )}
        </div>

        {/* Collapse Button for Desktop */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-1.5 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 select-none cursor-pointer"
          title={collapsed ? "Expandir Menu" : "Recolher Menu"}
          id="collapse-sidebar-btn"
        >
          <BookOpen className="w-4 h-4" />
        </button>

        {/* Close button for Mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 rounded hover:bg-white/15 text-white/80 cursor-pointer"
          id="close-mobile-menu-btn"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded transition-all text-left group cursor-pointer relative ${
                isActive
                  ? "bg-brand-gold text-brand-wine font-semibold shadow-lg shadow-brand-gold/10"
                  : "hover:bg-white/5 text-[#fbdbde]/80 hover:text-white"
              }`}
              title={collapsed ? item.label : undefined}
              id={`nav-tab-${item.id}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-1 top-3.5 bottom-3.5 w-1 bg-brand-wine rounded-full"
                />
              )}
              <div className="flex items-center justify-center">
                <Icon
                  className={`w-5 h-5 transition-transform ${collapsed ? "scale-110" : "group-hover:scale-110"} ${isActive ? "text-brand-wine" : "text-brand-gold"}`}
                />
              </div>
              {(!collapsed || mobileOpen) && (
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-sans tracking-wide truncate">
                    {item.label}
                  </span>
                  <span
                    className={`text-[10px] tracking-wide truncate font-light ${isActive ? "text-brand-wine/70" : "text-[#fbdbde]/50 group-hover:text-[#fbdbde]/80"}`}
                  >
                    {item.desc}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Control Deck */}
      <div className="p-4 border-t border-white/10 dark:border-brand-gold/10 space-y-3">
        {/* Dark Mode switcher */}
        <button
          onClick={toggleDarkMode}
          className={`w-full flex items-center p-2.5 rounded hover:bg-white/5 text-[#fbdbde]/80 hover:text-white transition-all cursor-pointer ${
            !collapsed || mobileOpen ? "justify-center gap-4" : "justify-center"
          }`}
          title="Alternar Modo Escuro"
          id="mode-toggle-btn"
        >
          {(!collapsed || mobileOpen) && (
            <span className="text-xs font-sans tracking-wide truncate">
              {isDarkMode ? "Modo Escuro Ativo" : "Modo Claro Ativo"}
            </span>
          )}
          <div className="flex items-center justify-center p-1.5 rounded-full bg-white/5 text-brand-gold shrink-0">
            {isDarkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </div>
        </button>

        {(!collapsed || mobileOpen) && (
          <div className="text-center pt-1">
            <p className="text-[10px] text-brand-gold/60 tracking-widest font-serif font-semibold">
              12 DE JUNHO DE 2026
            </p>
            <p className="text-[9px] text-[#fbdbde]/40 mt-1 uppercase">
              Sempre &amp; Para Sempre
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 z-[80] md:hidden cursor-pointer backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-72 z-[90] md:hidden shadow-2xl h-full"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
      <motion.div
        animate={{ width: collapsed ? "80px" : "260px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:block h-screen fixed top-0 left-0 bottom-0 z-40 shrink-0 shadow-xl overflow-hidden border-r border-[#630d16]/10"
      >
        {sidebarContent}
      </motion.div>

      {/* Spacing holder for desktop */}
      <div
        className={`hidden md:block select-none pointer-events-none transition-all duration-300 shrink-0 ${collapsed ? "w-[80px]" : "w-[260px]"}`}
      />
    </>
  );
}
