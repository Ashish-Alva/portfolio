import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  ChevronRight,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface EducationEntry {
  id: string;
  institution: string;
  short: string;
  degree: string;
  period: string;
  location: string;
  details: string;
  icon: typeof GraduationCap;
  accent: string;
  tag: string;
}

const education: EducationEntry[] = [
  {
    id: "mite",
    institution: "Mangalore Institute of Technology & Engineering",
    short: "MITE",
    degree: "B.E. Electronics & Communication Engineering",
    period: "2022 — 2026",
    location: "Moodabidri, India",
    details:
      "Focusing on embedded systems, cloud infrastructure, and modern engineering practices within the ECE department.",
    icon: GraduationCap,
    accent: "#38bdf8",
    tag: "Undergraduate",
  },
  {
    id: "PUC",
    institution: "Alva's Pre University College",
    short: "Alva's",
    degree: "11 - 12",
    period: "2020 - 2022",
    location: "Moodabidri, India",
    details: "Studied by PU life in Computer Science Stream",
    icon: Briefcase,
    accent: "#fb923c",
    tag: "PUC",
  },
  {
    id: "school",
    institution: "Our Lady of Pompie English Medium School",
    short: "Pompie",
    degree: "1st - 10th std",
    period: "2010 - 2020",
    location: "Mangalore, India",
    details: "Studied from 1st std to 10th",
    icon: Briefcase,
    accent: "#fb923c",
    tag: "Schooling",
  },
];

// ---------------------------------------------------------------------------
// Institution selector tab — animated underline indicator + hover lift
// ---------------------------------------------------------------------------

interface TabProps {
  entry: EducationEntry;
  active: boolean;
  onSelect: () => void;
}

const Tab: React.FC<TabProps> = ({ entry, active, onSelect }) => {
  const Icon = entry.icon;

  return (
    <button
      onClick={onSelect}
      className="group relative flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-colors md:w-auto md:flex-col md:items-start md:gap-2 md:px-5 md:py-4"
      style={{
        background: active ? `${entry.accent}14` : "transparent",
      }}
    >
      {/* hover backdrop, separate from active state so both can coexist visually */}
      <span className="absolute inset-0 rounded-xl bg-white/3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <span className="relative flex items-center gap-3 md:gap-2.5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 group-hover:scale-110"
          style={{
            borderColor: active ? `${entry.accent}55` : "#1e293b",
            background: active ? `${entry.accent}1f` : "#0f172a",
            color: active ? entry.accent : "#64748b",
          }}
        >
          <Icon size={16} />
        </span>
        <span className="flex flex-col">
          <span
            className="text-sm font-semibold transition-colors duration-200"
            style={{ color: active ? "#f8fafc" : "#64748b" }}
          >
            {entry.short}
          </span>
          <span className="hidden text-[11px] text-[#475569] md:block">
            {entry.period}
          </span>
        </span>
      </span>

      {/* active indicator bar */}
      {active && (
        <motion.span
          layoutId="tab-indicator"
          className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full md:bottom-0 md:left-5 md:right-5"
          style={{ background: entry.accent }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}

      <ChevronRight
        size={16}
        className="relative ml-auto text-[#334155] transition-transform duration-200 group-hover:translate-x-0.5 md:hidden"
      />
    </button>
  );
};

// ---------------------------------------------------------------------------
// Detail panel — morphs content between selected entries, magnetic meta row
// ---------------------------------------------------------------------------

interface MetaPillProps {
  icon: typeof Calendar;
  label: string;
  accent: string;
}

const MetaPill: React.FC<MetaPillProps> = ({ icon: Icon, label, accent }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20 });
  const sy = useSpring(y, { stiffness: 260, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.18);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group flex items-center gap-1.5 rounded-full border border-[#1e293b] bg-[#0f172a] px-3 py-1.5 text-xs text-[#94a3b8] transition-colors duration-200 hover:border-(--accent)/40 hover:text-[#f8fafc]"
    >
      <Icon
        size={12}
        className="transition-colors duration-200"
        style={{ color: accent }}
      />
      <span>{label}</span>
    </motion.div>
  );
};

const DetailPanel: React.FC<{ entry: EducationEntry }> = ({ entry }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#1e293b] bg-[#0f172a] p-6 md:p-8">
      {/* accent glow corner, intensifies on panel hover */}
      <motion.div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[80px]"
        style={{ background: entry.accent }}
        initial={{ opacity: 0.06 }}
        whileHover={{ opacity: 0.14 }}
        transition={{ duration: 0.4 }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <span
            className="mb-3 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
            style={{
              color: entry.accent,
              background: `${entry.accent}14`,
              border: `1px solid ${entry.accent}33`,
            }}
          >
            {entry.tag}
          </span>

          <h3 className="text-xl font-bold leading-snug text-[#f8fafc] md:text-2xl">
            {entry.institution}
          </h3>
          <p className="mt-1 font-medium" style={{ color: entry.accent }}>
            {entry.degree}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <MetaPill
              icon={Calendar}
              label={entry.period}
              accent={entry.accent}
            />
            <MetaPill
              icon={MapPin}
              label={entry.location}
              accent={entry.accent}
            />
          </div>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#94a3b8]">
            {entry.details}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Achievement strip — expands on hover to reveal full text
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

const Education: React.FC = () => {
  const [activeId, setActiveId] = useState(education[0].id);
  const activeEntry = education.find((e) => e.id === activeId)!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-end justify-between">
        <h2 className="relative inline-block text-3xl font-bold text-[#f8fafc]">
          Education
          <span className="absolute -bottom-2 left-0 h-1 w-12 rounded-full bg-[#38bdf8]" />
        </h2>
      </div>

      {/* Tab selector + detail panel */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr] md:gap-6">
        <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
          {education.map((entry) => (
            <Tab
              key={entry.id}
              entry={entry}
              active={entry.id === activeId}
              onSelect={() => setActiveId(entry.id)}
            />
          ))}
        </div>

        <DetailPanel entry={activeEntry} />
      </div>

      {/* Achievement strip */}
    </motion.div>
  );
};

export default Education;
