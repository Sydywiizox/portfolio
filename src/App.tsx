import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm.tsx";
import HeroBanner from "./components/HeroBanner.tsx";
import NavBar from "./components/Navbar.tsx";
import Project from "./components/Project.tsx";
import SkillBar from "./components/SkillBar.tsx";
import { ProjectData, projectService } from "./services/projectService.ts";
import { SkillData, skillService } from "./services/skillService.ts";

function App() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSorted, setIsSorted] = useState(false);

  const sortedSkills = isSorted
    ? [...skills].sort((a, b) => b.percentage - a.percentage)
    : skills;

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

    const fetchSkills = async () => {
      try {
        const data = await skillService.getSkills();
        setSkills(data);
      } catch (err) {
        setError("Erreur lors du chargement des compétences");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
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
                  images={project.images}
                  githubLink={project.githubLink}
                  previewLink={project.previewLink}
                  technologies={project.skills}
                />
              ))}
            </div>
          )}
        </section>

        <section id="skills" className="py-15 scroll-mt-[var(--navbar-height)]">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <h2 className="text-4xl font-bold text-center md:text-left">
              Mes compétences
            </h2>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <span className="text-gray-600">Tri par niveau</span>
              <button
                onClick={() => setIsSorted(!isSorted)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors duration-300"
                role="switch"
                aria-checked={isSorted}
              >
                <span
                  className={`${
                    isSorted
                      ? "translate-x-6 bg-blue-600"
                      : "translate-x-1 bg-white"
                  } inline-block h-4 w-4 transform rounded-full transition-transform duration-300 shadow-md`}
                />
                <span className="sr-only">
                  {isSorted ? "Désactiver le tri" : "Activer le tri"}
                </span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedSkills.map((skill) => (
              <SkillBar
                key={skill.objectId}
                name={skill.name}
                color={skill.color}
                percentage={skill.percentage}
              />
            ))}
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
