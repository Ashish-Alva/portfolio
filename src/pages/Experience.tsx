import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { PanInfo } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  accent: string;
}

const experiences: ExperienceEntry[] = [
  {
    role: "Trainee Associate Software Engineer",
    company: "Mphasis",
    period: "Feb 2026 — Present",
    location: "Remote / Hybrid",
    description:
      "Developing and deploying enterprise-level software solutions. Participating in intensive training modules at the Mphasis Learning Academy, focusing on full-stack development and cloud-native architectures.",
    accent: "#38bdf8",
  },
  {
    role: "Webmaster",
    company: "IEEE MITE Student Branch",
    period: "2024 — 2025",
    location: "Moodabidri, India",
    description:
      "Managed the official online presence for the student branch, streamlining communication channels and maintaining technical documentation for organizational events.",
    accent: "#a78bfa",
  },
  {
    role: "Incubatee",
    company: "K-Tech NAIN Incubation Center",
    period: "2025 — Present",
    location: "MITE Campus",
    description:
      "Collaborating on innovation projects including prototype development and patent documentation. Focus on bridge-line circuits and smart storage solutions.",
    accent: "#fb923c",
  },
  {
    role: "Incubatee",
    company: "K-Tech NAIN Incubation Center",
    period: "2025 — Present",
    location: "MITE Campus",
    description:
      "Collaborating on innovation projects including prototype development and patent documentation. Focus on bridge-line circuits and smart storage solutions.",
    accent: "#fb923c",
  },
];

// ---------------------------------------------------------------------------
// A single card in the 3D deck.
// ---------------------------------------------------------------------------

interface DeckCardProps {
  entry: ExperienceEntry;
  depth: number; // 0 = front/active, 1 = next, 2 = next-next ...
  isActive: boolean;
  onDragEnd: (info: PanInfo) => void;
}

const DeckCard: React.FC<DeckCardProps> = ({
  entry,
  depth,
  isActive,
  onDragEnd,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 20 });
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 10);
    tiltX.set(-py * 10);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const stackScale = 1 - depth * 0.05;
  const stackY = depth * 14;
  const stackOpacity = depth === 0 ? 1 : depth === 1 ? 0.55 : 0.25;
  const stackBlur = depth === 0 ? 0 : depth * 2;

  return (
    <motion.div
      ref={cardRef}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={(_, info) => onDragEnd(info)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={false}
      animate={{
        scale: stackScale,
        y: stackY,
        opacity: stackOpacity,
        filter: `blur(${stackBlur}px)`,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      style={{
        rotateX: isActive ? springTiltX : 0,
        rotateY: isActive ? springTiltY : 0,
        zIndex: 10 - depth,
        transformStyle: "preserve-3d",
        cursor: isActive ? "grab" : "default",
        touchAction: "pan-y",
        pointerEvents: isActive ? "auto" : "none",
      }}
      whileTap={
        isActive ? { cursor: "grabbing", scale: stackScale * 0.98 } : undefined
      }
      className="absolute inset-0 flex select-none flex-col rounded-3xl border border-[#1e293b] bg-[#0f172a] p-6 md:p-8"
    >
      {isActive && (
        <div
          className="pointer-events-none absolute inset-x-6 -bottom-3 h-6 rounded-full opacity-30 blur-xl"
          style={{ background: entry.accent }}
        />
      )}

      {isActive && (
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-30"
          style={{
            background: `radial-gradient(380px circle at 50% 30%, ${entry.accent}14, transparent 70%)`,
          }}
        />
      )}

      <div
        className="relative flex h-full flex-col"
        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
              style={{
                background: `${entry.accent}14`,
                borderColor: `${entry.accent}33`,
                color: entry.accent,
              }}
            >
              <Briefcase size={22} />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold leading-snug text-[#f8fafc] md:text-xl">
                {entry.role}
              </h3>
              <div
                className="mt-0.5 flex items-center gap-2 font-medium"
                style={{ color: entry.accent }}
              >
                <Building2 size={15} className="shrink-0" />
                <span>{entry.company}</span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-1.5 text-xs text-[#64748b] sm:items-end">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Calendar size={13} />
              <span>{entry.period}</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <MapPin size={13} />
              <span>{entry.location}</span>
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-[#94a3b8] md:mt-6">
          {entry.description}
        </p>
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

const Experience: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (next: number) => {
    const clamped = (next + experiences.length) % experiences.length;
    setActiveIndex(clamped);
  };

  const handleDragEnd = (info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x < -threshold) {
      goTo(activeIndex + 1);
    } else if (info.offset.x > threshold) {
      goTo(activeIndex - 1);
    }
  };

  const ordered = experiences.map((exp, i) => {
    const depth = (i - activeIndex + experiences.length) % experiences.length;
    return { exp, depth };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-8"
    >
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 className="relative inline-block text-3xl font-bold text-[#f8fafc]">
          Experience
          <span className="absolute -bottom-2 left-0 h-1 w-12 rounded-full bg-[#38bdf8]" />
        </h2>
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#475569]">
          Drag to browse
        </span>
      </div>

      {/* 3D Deck — height set generously so the longest description always fits */}
      <div
        className="relative w-full min-h-90 sm:min-h-80 md:min-h-75"
        style={{ perspective: "1200px" }}
      >
        <AnimatePresence>
          {ordered
            .filter(({ depth }) => depth < 3)
            .sort((a, b) => b.depth - a.depth)
            .map(({ exp, depth }) => (
              <DeckCard
                key={exp.company + exp.role}
                entry={exp}
                depth={depth}
                isActive={depth === 0}
                onDragEnd={handleDragEnd}
              />
            ))}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous experience"
          className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#1e293b] bg-[#0f172a] text-[#64748b] transition-all duration-200 hover:border-[#38bdf8]/40 hover:text-[#38bdf8] active:scale-90"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-2">
          {experiences.map((exp, i) => (
            <button
              key={exp.company}
              onClick={() => goTo(i)}
              aria-label={`Go to ${exp.company}`}
              className="relative h-2 rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 22 : 8,
                background: i === activeIndex ? exp.accent : "#1e293b",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next experience"
          className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#1e293b] bg-[#0f172a] text-[#64748b] transition-all duration-200 hover:border-[#38bdf8]/40 hover:text-[#38bdf8] active:scale-90"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default Experience;
