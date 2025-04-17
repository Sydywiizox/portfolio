import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useCallback, useState } from "react";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
interface ProjectProps {
  title: string;
  description: string;
  difficulties?: string;
  images: string[];
  githubLink: string;
  previewLink: string;
  technologies?: string[];
}

const Project: FC<ProjectProps> = ({
  title,
  description,
  difficulties,
  images,
  githubLink,
  previewLink,
  technologies,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickOutside = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        setIsModalOpen(false);
      }
    },
    []
  );

  const [carrouselIndex, setCarrouselIndex] = useState<number>(0); // Replace with your logic to determine the current image index

  // Fonction pour tronquer le texte à la première phrase
  const getTruncatedDescription = (text: string) => {
    const firstSentence = text.match(/^.*?[.!?](?:\s|$)/);
    return firstSentence ? firstSentence[0].trim() + "..." : text + "...";
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="relative">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 cursor-pointer py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Aperçu
            </button>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
          <p className="text-gray-600 mb-4">
            {getTruncatedDescription(description)}
          </p>
          <div className="space-y-4">
            {technologies && (
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-4 items-center mt-4">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Voir le projet{" "}
                <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
              </a>
              {previewLink && (
                <a
                  href={previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Voir le site
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    aria-hidden="true"
                    className="ml-2"
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleClickOutside}
        >
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 z-10 cursor-pointer p-1 bg-gray-700/80 rounded-full text-white hover:bg-gray-700/60"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Conteneur de l'image avec hauteur fixe et scroll */}
              <div className="h-72 sm:h-96 overflow-y-auto mb-2">
                <img
                  src={images[carrouselIndex]}
                  alt={title}
                  className="w-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className=" flex items-center justify-center gap-4 p-4">
                  {/* previous button */}
                  <button
                    onClick={() =>
                      setCarrouselIndex(
                        (prevIndex) =>
                          (prevIndex - 1 + images.length) % images.length
                      )
                    }
                    className="z-10 cursor-pointer p-1 bg-gray-700/80 rounded-full text-white hover:text-gray-400"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  {/* next button */}
                  <button
                    onClick={() =>
                      setCarrouselIndex(
                        (prevIndex) => (prevIndex + 1) % images.length
                      )
                    }
                    className=" z-10 cursor-pointer p-1 bg-gray-700/80 rounded-full text-white hover:text-gray-400"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}
              <div className="p-8 max-h-[40vh] overflow-y-auto">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <p className="text-gray-600 text-lg mb-6 whitespace-pre-line">
                  {description}
                </p>

                {/* Section Technologies */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">
                    Technologies utilisées :
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Nouvelle section Difficultés */}
                {difficulties && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3">
                      Difficultés rencontrées :
                    </h3>
                    <p className="text-gray-600 text-lg whitespace-pre-line">
                      {difficulties}
                    </p>
                  </div>
                )}

                {/* Section liens */}
                <div className="flex gap-4 items-center">
                  {githubLink && (
                    <a
                      href={githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Voir le projet{" "}
                      <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
                    </a>
                  )}
                  {previewLink && (
                    <a
                      href={previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Voir le site
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
