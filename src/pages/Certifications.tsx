import { motion } from "framer-motion";
import { Award, Calendar } from "lucide-react";

const Certifications = () => {
  const certifications = [
    {
      title: "Oracle Cloud Infrastructure AI Foundations",
      issuer: "Oracle University",
      date: "2026",
      description:
        "Foundational certification in AI concepts, machine learning workflows, and OCI infrastructure services.",
      link: "#",
    },
    {
      title: "Salesforce Developer",
      issuer: "Salesforce Trailhead",
      date: "April 2026",
      description:
        "Completed comprehensive learning paths (Trailmixes) and maintained active development environments, focusing on cloud application architecture.",
      link: "#",
    },
    {
      title: "Associate Software Engineer Training",
      issuer: "Mphasis Learning Academy",
      date: "Feb 2026",
      description:
        "Successfully completed corporate training and an 90-day internship module focusing on enterprise software development standards.",
      link: "#",
    },
    {
      title: "Tech Kabaddi: Referee Support System",
      issuer: "Govt. of Karnataka (NAIN)",
      date: "2025",
      description:
        "Designed and implemented an AI-driven step and zone detection system for automated match officiating under the NAIN incubation program.",
      link: "#",
    },
    {
      title: "Entrepreneurial Thinking",
      issuer: "IUCEE",
      date: "2025",
      description:
        "Coursework on innovation methodology, product-market fit, and entrepreneurial leadership.",
      link: "#",
    },
    {
      title: "IEEE Student Branch Coordinator",
      issuer: "IEEE MITE",
      date: "2023 – 2025",
      description:
        "Organized large-scale technical events and hackathons to foster community engagement and technical growth.",
      link: "#",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 sm:space-y-10"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc] relative inline-block">
          Certifications
          <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#38bdf8] rounded-full"></span>
        </h2>
      </div>

      {/* Certifications List */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="p-5 sm:p-6 md:p-8 bg-[#0f172a] border border-[#1e293b] rounded-2xl hover:border-[#38bdf8]/30 transition-all flex flex-col md:flex-row gap-4 sm:gap-6"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#1e293b] flex items-center justify-center text-[#38bdf8] shrink-0 border border-[#38bdf8]/10">
              <Award size={28} className="sm:hidden" />
              <Award size={32} className="hidden sm:block" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg sm:text-xl font-bold text-[#f8fafc]">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-4 text-xs sm:text-sm text-[#64748b] shrink-0">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>{cert.date}</span>
                  </div>
                </div>
              </div>

              <p className="text-[#38bdf8] font-medium mb-3 text-sm sm:text-base">
                {cert.issuer}
              </p>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                {cert.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Certifications;
//done