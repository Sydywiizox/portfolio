import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition >= heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  return (
    <nav
      className={`bg-gray-800 p-6 ${
        isSticky ? "sticky top-0" : "block top-0"
      } w-full transition-all duration-300 z-50`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white text-3xl font-bold">
            <a href="#">Andréa DUHAMEL</a>
          </div>

          {/* Bouton burger pour mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded cursor-pointer"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Menu desktop */}
          <ul className="hidden text-xl lg:flex space-x-4 font-bold">
            <li>
              <a href="#projects" className="text-white hover:text-gray-300">
                Mes projets
              </a>
            </li>
            <li>
              <a href="#skills" className="text-white hover:text-gray-300">
                Mes compétences
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white hover:text-gray-300">
                Me contacter
              </a>
            </li>
            <li className="text-white hover:text-gray-300">|</li>
            <li>
              <a
                href="https://github.com/Sydywiizox"
                className="text-white hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visiter mon profil GitHub"
              >
                <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/andr%C3%A9a-duhamel-9538ab35b/"
                className="text-white hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visiter mon profil LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} aria-hidden="true" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Menu mobile */}
        <div
          id="mobile-menu"
          className={`${isOpen ? "block" : "hidden"} lg:hidden mt-4`}
        >
          <ul className="flex flex-col space-y-2 font-bold">
            <li>
              <a
                href="#projects"
                className="block text-white hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Mes projets
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="block text-white hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Mes compétences
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block text-white hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Me contacter
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Sydywiizox"
                className="block text-white hover:text-gray-300"
                onClick={() => setIsOpen(false)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
                <FontAwesomeIcon icon={faGithub} className="ml-2" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/andr%C3%A9a-duhamel-9538ab35b/"
                className="block text-white hover:text-gray-300"
                onClick={() => setIsOpen(false)}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <FontAwesomeIcon icon={faLinkedin} className="ml-2" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
