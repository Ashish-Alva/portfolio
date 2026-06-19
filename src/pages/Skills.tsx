import React, { useRef, useState, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { Code2, Database, Globe, Cloud, type LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface SkillCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  accent: string; // hex
  skills: string[];
  blurb: string;
}

const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    icon: Code2,
    accent: "#38bdf8",
    skills: ["Python", "JavaScript", "TypeScript", "HTML/CSS"],
    blurb: "What I think in",
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    accent: "#fb923c",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    blurb: "What I ship with",
  },
  {
    id: "backend",
    title: "Backend & DB",
    icon: Database,
    accent: "#a78bfa",
    skills: ["Node.js", "MongoDB", "PostgreSQL", "Firebase"],
    blurb: "What I build on",
  },
  {
    id: "frontend",
    title: "Frontend & Tools",
    icon: Globe,
    accent: "#34d399",
    skills: ["React.js", "Tailwind", "Git", "Framer Motion"],
    blurb: "What I craft with",
  },
];

// ---------------------------------------------------------------------------
// Magnetic skill chip — drifts toward the cursor slightly, settles back
// ---------------------------------------------------------------------------

interface ChipProps {
  label: string;
  accent: string;
  index: number;
  active: boolean;
}

const SkillChip: React.FC<ChipProps> = ({ label, accent, index, active }) => {
  const chipRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18 });
  const springY = useSpring(y, { stiffness: 250, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = chipRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.25);
    y.set(relY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={chipRef}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={
        active
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 12, filter: "blur(4px)" }
      }
      transition={{
        duration: 0.45,
        delay: active ? index * 0.06 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative inline-flex cursor-default select-none items-center rounded-full px-4 py-1.5 text-sm font-medium"
      // css={undefined}
      // inline style for dynamic accent color since Tailwind can't do arbitrary per-item colors at runtime easily
      // eslint-disable-next-line react/forbid-dom-props
      data-accent={accent}
    >
      <span
        className="absolute inset-0 rounded-full border"
        style={{
          borderColor: `${accent}33`,
          background: `${accent}14`,
        }}
      />
      <span className="relative" style={{ color: accent }}>
        {label}
      </span>
    </motion.span>
  );
};

// ---------------------------------------------------------------------------
// One orbit node — icon, title, blurb, chips. Connects to a vertical spine.
// ---------------------------------------------------------------------------

interface NodeProps {
  category: SkillCategory;
  index: number;
  total: number;
}

const SkillNode: React.FC<NodeProps> = ({ category, index, total }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const Icon = category.icon;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 0.9", "0 0.4"],
  });

  const reveal = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  const opacity = useTransform(reveal, [0, 1], [0, 1]);
  const x = useTransform(reveal, [0, 1], [index % 2 === 0 ? -60 : 60, 0]);
  const nodeScale = useTransform(reveal, [0, 1], [0.92, 1]);

  // Pulse ring driven by scroll progress so the dot "arrives" with energy
  const ringScale = useTransform(reveal, [0, 0.6, 1], [0.4, 1.6, 1]);
  const ringOpacity = useTransform(reveal, [0, 0.5, 1], [0, 0.5, 0]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[1fr] items-center gap-6 py-10 md:grid-cols-[1fr_56px_1fr]"
    >
      {/* Spine dot */}
      <div className="relative hidden h-full items-center justify-center md:flex md:order-2">
        <motion.span
          style={{
            scale: ringScale,
            opacity: ringOpacity,
            borderColor: category.accent,
          }}
          className="absolute h-4 w-4 rounded-full border-2"
        />
        <motion.span
          style={{ scale: nodeScale, backgroundColor: category.accent }}
          className="h-3 w-3 rounded-full shadow-[0_0_12px_currentColor]"
        />
      </div>

      {/* Card — alternates sides on desktop */}
      <motion.div
        style={{ opacity, x, scale: nodeScale }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className={`group relative order-1 overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#0b1120] p-7 md:p-8 ${
          isEven ? "md:order-1" : "md:order-3"
        }`}
      >
        {/* Animated gradient wash on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{
            background: hovered
              ? `radial-gradient(420px circle at var(--mx,50%) var(--my,50%), ${category.accent}1f, transparent 70%)`
              : "radial-gradient(420px circle at 50% 50%, transparent, transparent)",
          }}
          transition={{ duration: 0.4 }}
          onMouseMove={(e) => {
            const rect = (e.target as HTMLElement).getBoundingClientRect();
            const mx = ((e.clientX - rect.left) / rect.width) * 100;
            const my = ((e.clientY - rect.top) / rect.height) * 100;
            (e.currentTarget as HTMLElement).style.setProperty(
              "--mx",
              `${mx}%`,
            );
            (e.currentTarget as HTMLElement).style.setProperty(
              "--my",
              `${my}%`,
            );
          }}
        />

        {/* Faint index number, large, bleeding off the edge */}
        <span
          className="pointer-events-none absolute -right-2 -top-6 select-none text-[88px] font-black leading-none text-white/[0.03]"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative z-10">
          <div className="mb-5 flex items-center gap-4">
            <motion.div
              animate={hovered ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
              style={{
                borderColor: `${category.accent}33`,
                background: `${category.accent}14`,
              }}
            >
              <Icon size={22} style={{ color: category.accent }} />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-slate-50">
                {category.title}
              </h3>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                {category.blurb}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, sIdx) => (
              <SkillChip
                key={skill}
                label={skill}
                accent={category.accent}
                index={sIdx}
                active={true}
              />
            ))}
          </div>
        </div>

        {/* Bottom progress thread tied to this node's own scroll progress */}
        <motion.div
          style={{ scaleX: reveal, backgroundColor: category.accent }}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left opacity-40"
        />
      </motion.div>

      {/* spacer for the off-side column on desktop so the spine stays centered */}
      <div
        className={`hidden md:block ${isEven ? "md:order-3" : "md:order-1"}`}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Section — vertical spine line that draws itself as you scroll through
// ---------------------------------------------------------------------------

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.6"],
  });

  const lineHeight = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
    { stiffness: 60, damping: 20 },
  );

  // const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  // const headingY = useTransform(scrollYProgress, [0, 0.15], [24, 0]);

  const accents = useMemo(() => skillCategories.map((c) => c.accent), []);

  return (
    <>
      <h2 className="relative inline-block text-3xl font-bold text-white">
        Technical skills
        <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-primary rounded-full"></span>
      </h2>

      <section
        ref={sectionRef}
        className="relative mx-auto max-w-5xl px-6 py-6"
      >
        {/* Ambient background glow, very subtle, drifts slowly */}

        <motion.div
          className="pointer-events-none absolute -top-40 left-1/2 h-120 w-120 -translate-x-1/2 rounded-full opacity-[0.07] blur-[120px]"
          style={{
            background: `conic-gradient(from 0deg, ${accents.join(", ")}, ${accents[0]})`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        {/* Spine track + animated fill, desktop only */}
        <div className="pointer-events-none absolute left-1/2 top-[180px] hidden h-[calc(100%-220px)] w-px -translate-x-1/2 bg-white/[0.06] md:block">
          <motion.div
            style={{ height: lineHeight }}
            className="w-px bg-gradient-to-b from-sky-400 via-fuchsia-400 to-emerald-400"
          />
        </div>

        <div className="relative z-10">
          {skillCategories.map((cat, idx) => (
            <SkillNode
              key={cat.id}
              category={cat}
              index={idx}
              total={skillCategories.length}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Skills;
