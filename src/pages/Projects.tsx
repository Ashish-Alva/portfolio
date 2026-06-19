import { motion } from "framer-motion";
import { ExternalLink, Cpu, Bot, FileText } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Telegram Media Automation",
      category: "Python Automation",
      icon: <Bot className="text-[#38bdf8]" size={24} />,
      description:
        "Python-based automation using the Telethon library to efficiently download and archive media content from specific Telegram channels.",
      tags: ["Python", "Telethon", "API"],
    },
    {
      title: "Doc Merger Script",
      category: "Google Apps Script",
      icon: <FileText className="text-[#38bdf8]" size={24} />,
      description:
        "Automated batch processing tool to merge 100+ Microsoft Word files into a master Google Doc, streamlining administrative workflows.",
      tags: ["Apps Script", "Automation", "Google Drive"],
    },
    {
      title: "AUTO AGRO AIRCRAFT",
      category: "Innovation Project",
      icon: <Cpu className="text-[#38bdf8]" size={24} />,
      description:
        "Prototype development for agricultural technology within the K-Tech NAIN Incubation Center program at MITE.",
      tags: ["Hardware", "Innovation", "Prototype"],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10"
    >
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-[#f8fafc] relative inline-block">
          Projects
          <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#38bdf8] rounded-full"></span>
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-6 bg-[#0f172a] border border-[#1e293b] rounded-2xl hover:border-[#38bdf8]/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#1e293b] flex items-center justify-center border border-[#38bdf8]/10">
                {project.icon}
              </div>
              <div className="flex gap-2">
                {/* <Github
                  size={18}
                  className="text-[#64748b] hover:text-[#38bdf8] cursor-pointer"
                /> */}
                <ExternalLink
                  size={18}
                  className="text-[#64748b] hover:text-[#38bdf8] cursor-pointer"
                />
              </div>
            </div>

            <h3 className="text-lg font-bold text-[#f8fafc] mb-1">
              {project.title}
            </h3>
            <p className="text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-3">
              {project.category}
            </p>

            <p className="text-sm text-[#94a3b8] leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold uppercase text-[#64748b] bg-[#1e293b] px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
