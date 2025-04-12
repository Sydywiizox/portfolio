import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm.tsx";
import HeroBanner from "./components/HeroBanner.tsx";
import NavBar from "./components/Navbar.tsx";
import Project from "./components/Project.tsx";
import SkillBar from "./components/SkillBar.tsx";
import { ProjectData, projectService } from "./services/projectService";

function App() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getProjects();
        setProjects(data);
      } catch (err) {
        setError("Erreur lors du chargement des projets");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <HeroBanner />
      <NavBar />
      <div className="container mx-auto px-4">
        <section
          id="projects"
          className="py-15 scroll-mt-[var(--navbar-height)]"
        >
          <h2 className="text-4xl font-bold mb-8 text-center">Mes projets</h2>
          {error && (
            <div className="text-red-500 text-center mb-8">{error}</div>
          )}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Project
                  key={project.objectId}
                  title={project.title}
                  description={project.description}
                  imageUrl={project.image.url}
                  link={project.githubLink}
                  technologies={project.skills}
                />
              ))}
            </div>
          )}
        </section>

        <section id="skills" className="py-15 scroll-mt-[var(--navbar-height)]">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Mes compétences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillBar name="HTML" color="#e34c26" percentage={80}></SkillBar>
            <SkillBar name="CSS" color="#264de4" percentage={80}></SkillBar>
            <SkillBar
              name="JavaScript"
              color="#f7df1e"
              percentage={70}
            ></SkillBar>
            <SkillBar name="React" color="#61DAFB" percentage={60}></SkillBar>
            <SkillBar name="Node.js" color="#679c58" percentage={30}></SkillBar>
            <SkillBar
              name="Tailwind CSS"
              color="#38B2AC"
              percentage={40}
            ></SkillBar>
            <SkillBar
              name="TypeScript"
              color="#007acc"
              percentage={30}
            ></SkillBar>
            <SkillBar name="Back4App" color="#222" percentage={50}></SkillBar>
            <SkillBar name="MongoDB" color="#002645" percentage={50}></SkillBar>
            <SkillBar name="SQL" color="#ff9800" percentage={50}></SkillBar>
            <SkillBar name="SEO" color="#ac33ff" percentage={60}></SkillBar>
            <SkillBar name="Git" color="#ffac33" percentage={50}></SkillBar>
          </div>
        </section>

        <section
          id="contact"
          className="py-15 scroll-mt-[var(--navbar-height)]"
        >
          <ContactForm />
        </section>
      </div>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Andréa DUHAMEL. Tous droits réservés.</p>
          <p>
            <a
              href="https://github.com/AndreaDuhamel"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
