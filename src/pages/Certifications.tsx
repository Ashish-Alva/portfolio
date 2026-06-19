import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      title: "Salesforce Developer",
      issuer: "Salesforce Trailhead",
      date: "April 2026",
      description: "Completed comprehensive learning paths (Trailmixes) and maintained active development environments, focusing on cloud application architecture.",
      link: "#"
    },
    {
      title: "Associate Software Engineer Training",
      issuer: "Mphasis Learning Academy",
      date: "Feb 2026",
      description: "Successfully completed corporate training and 88-day internship module focusing on enterprise software standards.",
      link: "#"
    }
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
          Certifications
          <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-[#38bdf8] rounded-full"></span>
        </h2>
      </div>

      {/* Certifications List */}
      <div className="grid grid-cols-1 gap-6">
        {certifications.map((cert, index) => (
          <div 
            key={index} 
            className="p-6 md:p-8 bg-[#0f172a] border border-[#1e293b] rounded-2xl hover:border-[#38bdf8]/30 transition-all flex flex-col md:flex-row gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#1e293b] flex items-center justify-center text-[#38bdf8] shrink-0 border border-[#38bdf8]/10">
              <Award size={32} />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <h3 className="text-xl font-bold text-[#f8fafc]">{cert.title}</h3>
                <div className="flex items-center gap-4 text-sm text-[#64748b]">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>{cert.date}</span>
                  </div>
                  <a href={cert.link} className="flex items-center gap-1.5 text-[#38bdf8] hover:underline">
                    <ExternalLink size={14} />
                    <span>Verify</span>
                  </a>
                </div>
              </div>
              
              <p className="text-[#38bdf8] font-medium mb-3">{cert.issuer}</p>
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