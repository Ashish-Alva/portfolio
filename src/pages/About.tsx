import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Code, Database, Cpu, Layout } from "lucide-react";

const About = () => {
  const services = [
    {
      icon: <Code className="text-primary" size={32} />,
      title: "DevOps Engineering",
      description: "Building CI/CD pipelines using GitHub Actions, Jenkins, Docker, Kubernetes, and IaC.",
      accent: "#3b82f6", // Added accent
    },
    {
      icon: <Database className="text-primary" size={32} />,
      title: "Cloud & Infrastructure",
      description: "Deploying scalable applications on AWS using EC2, S3, IAM, VPC, and Terraform.",
      accent: "#8b5cf6", // Added accent
    },
    {
      icon: <Cpu className="text-primary" size={32} />,
      title: "Automation & Monitoring",
      description: "Automating deployments and monitoring systems with Prometheus and Grafana.",
      accent: "#ec4899", // Added accent
    },
    {
      icon: <Layout className="text-primary" size={32} />,
      title: "Full Stack Development",
      description: "Developing modern web applications using React, Node.js, Express, and MongoDB.",
      accent: "#10b981", // Added accent
    },
  ];

  // Fix: map the 'accent' property correctly
  const accents = useMemo(() => services.map((c) => c.accent), [services]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10"
    >
      {/* Header with background effect */}
      <div className="relative">
        <h2 className="text-3xl font-bold text-white relative inline-block">
          About Me
          <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-primary rounded-full"></span>
        </h2>

        <motion.div
          className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full opacity-[0.07] blur-[120px]"
          style={{
            background: `conic-gradient(from 0deg, ${accents.join(", ")}, ${accents[0]})`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        <p className="mt-8 text-primary font-medium text-lg">
          Aspiring DevOps & Cloud Engineer
        </p>

        <div className="mt-4 space-y-5 text-gray-400 leading-relaxed text-base">
          <p>
            I'm a passionate <strong className="text-white font-medium">DevOps & Cloud Engineer</strong> focused on building scalable infrastructure and automating software delivery.
          </p>
          <p>
            My expertise includes AWS, Docker, Kubernetes, Terraform, and Linux. I enjoy designing CI/CD pipelines and improving system reliability.
          </p>
          <p>
            Alongside DevOps, I have experience in Full Stack Development, enabling me to manage the complete application lifecycle.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">What I'm Doing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 bg-dark-800 rounded-2xl border border-dark-700 hover:border-primary/20 transition-all duration-300 group flex gap-4"
            >
              <div className="p-3 bg-dark-900 rounded-xl border border-dark-700/50 h-fit shrink-0 group-hover:scale-105 transition-transform">
                {service.icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">{service.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default About;