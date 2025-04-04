import GitHubIcon from "@mui/icons-material/GitHub";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface ProjectProps {
  title: string;
  link: string;
  image: string;
  description: string;
  technos: string[];
}

function Project({ title, link, image, description, technos }: ProjectProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
        },
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={imageError ? "/path/to/fallback-image.jpg" : image}
        alt={title}
        onError={() => {
          console.error(
            `Erreur de chargement de l'image pour ${title}:`,
            image
          );
          setImageError(true);
        }}
        sx={{
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            minHeight: "60px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            mt: 2,
          }}
        >
          {technos.map((techno) => (
            <Chip
              key={techno}
              label={techno}
              size="small"
              sx={{
                backgroundColor: "primary.main",
                color: "white",
              }}
            />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ padding: 2, pt: 0 }}>
        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          sx={{
            textTransform: "none",
          }}
        >
          Voir sur GitHub
        </Button>
      </CardActions>
    </Card>
  );
}

export default Project;
