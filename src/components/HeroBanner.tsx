import { Box, Typography } from "@mui/material";
import Banner from "../assets/bg.avif";

function HeroBanner() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        position: "relative",
        "& img": {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        },
      }}
    >
      <img src={Banner} alt="Banner" />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, sm: 3 }, // espace entre les textes
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            color: "white",
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            lineHeight: { xs: 1.2, sm: 1.3 },
          }}
        >
          Andréa DUHAMEL
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: "white",
            fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
            textAlign: "center",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            lineHeight: { xs: 1.4, sm: 1.5 },
            maxWidth: { xs: "300px", sm: "500px", md: "600px" },
            margin: "0 auto",
          }}
        >
          " Développeur Web React/NodeJS, je crée des sites web modernes et
          responsives "
        </Typography>
      </Box>
    </Box>
  );
}

export default HeroBanner;
