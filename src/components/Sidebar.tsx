import { NavLink } from "react-router-dom";
import {
  Mail,
  MapPin,
  Code2,
  GraduationCap,
  Briefcase,
  FolderKanban,
  Award,
  BookOpen,
  User,
} from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const contactInfo = [
    {
      icon: <Mail className="text-primary" size={16} />,
      label: "EMAIL",
      value: "ashishalva1234@gmail.com",
      href: "mailto:ashishalva1234@gmail.com",
    },
    {
      icon: <MapPin className="text-primary" size={16} />,
      label: "LOCATION",
      value: "Karnataka, India",
    },
  ];

  const navLinks = [
    {
      path: "/about",
      label: "About",
      icon: <User size={18} />,
    },
    {
      path: "/skills",
      label: "Skills",
      icon: <Code2 size={18} />,
    },
    {
      path: "/education",
      label: "Education",
      icon: <GraduationCap size={18} />,
    },
    {
      path: "/experience",
      label: "Experience",
      icon: <Briefcase size={18} />,
    },
    {
      path: "/projects",
      label: "Projects",
      icon: <FolderKanban size={18} />,
    },
    {
      path: "/certifications",
      label: "Certifications",
      icon: <Award size={18} />,
    },
    {
      path: "/blog",
      label: "Blog",
      icon: <BookOpen size={18} />,
    },

  ];

  return (
    <aside className="fixed top-6 bottom-6 bg-dark-800 border border-dark-700 rounded-4xl px-5 py-3 flex flex-col">
      {/* Profile */}
      <div className="flex flex-col items-center text-center">
        <h1 className="mt-3 text-3xl font-bold text-white">Ashish Alva</h1>

        <p className="mt-2 px-3 bg-dark-700 rounded-lg text-xs font-medium text-gray-300 border border-dark-700">
          DevOps & Cloud Engineer
        </p>
      </div>

      <hr className="my-2 border-dark-700" />

      {/* Navigation */}
      <nav className="flex-1 ">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-dark-900 text-primary border border-dark-700"
                  : "text-gray-400 hover:text-white hover:bg-dark-700/30"
              }`
            }
          >
            {link.icon}
            <span className="font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <hr className="my-4 border-dark-700" />

      {/* Contact */}
      <div className="space-y-3">
        {contactInfo.map((info, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-dark-900 border border-dark-700 flex items-center justify-center">
              {info.icon}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                {info.label}
              </p>

              {info.href ? (
                <a
                  href={info.href}
                  className="text-xs text-gray-300 hover:text-primary truncate block"
                >
                  {info.value}
                </a>
              ) : (
                <p className="text-xs text-gray-300">{info.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
