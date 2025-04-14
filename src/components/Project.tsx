import { FC, useCallback, useState } from "react";

interface ProjectProps {
  title: string;
  description: string;
  imageUrl: string;
  githubLink: string;
  previewLink: string;
  technologies?: string[];
}

const Project: FC<ProjectProps> = ({
  title,
  description,
  imageUrl,
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

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="relative">
          <img
            src={imageUrl}
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
          <p className="text-gray-600 mb-4">{description}</p>
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
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Voir le projet
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleClickOutside}
        >
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 cursor-pointer p-1 bg-gray-700/80 rounded-full text-white hover:text-gray-400"
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
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-96 object-cover rounded-t-lg"
              />
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <p className="text-gray-600 text-lg mb-6">{description}</p>
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
                <div className="flex gap-4 items-center">
                  {githubLink && (
                    <a
                      href={githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Voir le projet sur GitHub
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
