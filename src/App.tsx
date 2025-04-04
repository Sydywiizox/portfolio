import {
  Box,
  CircularProgress,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ProjectData, projectService } from "./services/projectService";

import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import Project from "./components/Project";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1A2642", // Bleu foncé, similaire à bg-gray-800
      dark: "#4F46E5", // Bleu vif pour les interactions hover, similaire à bg-blue-700
    },
    secondary: {
      main: "#3B82F6", // Bleu
    },
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#111827",
      secondary: "#4B5563",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: "none", // Évite les majuscules sur les boutons
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1A2642", // Équivalent à bg-gray-800
        },
      },
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <HeroBanner />
      <Header />
      <Box
        component="section"
        id="projects"
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, sm: 4, md: 6 },
          backgroundColor: "background.default",
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: "center",
            mb: { xs: 4, md: 6 },
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          Mes Projets
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: { xs: 3, md: 4 },
              maxWidth: "1200px",
              mx: "auto",
            }}
          >
            {projects.map((project) => (
              <Project
                key={project.objectId}
                title={project.title}
                link={project.githubLink}
                image={project.image.url}
                description={project.description}
                technos={project.skills}
              />
            ))}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
