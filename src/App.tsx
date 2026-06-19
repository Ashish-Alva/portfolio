import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";

import About from "./pages/About";
import Skills from "./pages/Skills";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import Blog from "./pages/Blog";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/about" replace />} />

        <Route path="about" element={<About />} />
        <Route path="skills" element={<Skills />} />
        <Route path="education" element={<Education />} />
        <Route path="experience" element={<Experience />} />
        <Route path="projects" element={<Projects />} />
        <Route path="certifications" element={<Certifications />} />
        <Route path="blog" element={<Blog />} />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/about" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
