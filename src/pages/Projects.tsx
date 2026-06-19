import { motion } from "framer-motion";
import { ExternalLink, Cloud, Activity, Zap, FileCode2 } from "lucide-react";

const Projects = () => {
  const projects = [
    {
    title: "CI/CD Pipeline: Containerized Deployment",
    category: "DevOps & Cloud",
    icon: <Cloud className="text-[#38bdf8]" size={24} />,
    description: "Built a GitHub Actions CI/CD pipeline for automated Docker image delivery. Orchestrated scalable deployments on AWS EC2 using Terraform for infrastructure provisioning and Kubernetes for container management.",
    tags: ["AWS", "Docker", "Terraform", "Kubernetes", "CI/CD"],
  },
  {
    title: "Document Conversion Web App",
    category: "Full Stack (MERN)",
    icon: <FileCode2 className="text-[#38bdf8]" size={24} />,
    description: "Developed a full-stack MERN document conversion platform with an integrated admin panel for workflow management. Features include Docker containerization, CI/CD automated deployment, and efficient file processing.",
    tags: ["React", "Node.js", "MongoDB", "Docker", "CI/CD"],
  },
  {
    title: "Referee Support Monitoring System",
    category: "AI/ML & IoT",
    icon: <Activity className="text-[#fb923c]" size={24} />,
    description: "Developed an intelligent step and zone detection system for real-time player tracking, enhancing referee decision-making accuracy and gameplay transparency.",
    tags: ["Real-time Tracking", "Monitoring", "IoT"],
  },
  {
    title: "Smart Appliance & Carbon Monitor",
    category: "IoT & Embedded Systems",
    icon: <Zap className="text-[#a78bfa]" size={24} />,
    description: "Designed an IoT system using ESP32 with current (ACS712) and voltage (zmPT101B) sensors to track real-time power consumption and calculate carbon footprint metrics.",
    tags: ["ESP32", "IoT", "Embedded", "Energy Analysis"],
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
