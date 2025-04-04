import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition >= heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: "Mes projets", href: "#projects" },
    { label: "Mes compétences", href: "#skills" },
    { label: "Mon CV", href: "#cv" },
    { label: "Me contacter", href: "#contact" },
  ];

  return (
    <>
      <AppBar
        position={isSticky ? "fixed" : "relative"}
        sx={{
          top: isSticky ? 0 : "auto",
          bottom: isSticky ? "auto" : "0",
          backgroundColor: "primary.main",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Toolbar sx={{ height: "80px" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button
              color="inherit"
              href="#"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                padding: "12px 20px",
              }}
            >
              Andréa DUHAMEL
            </Button>
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleClick}
                sx={{
                  padding: "12px",
                  "& .MuiSvgIcon-root": {
                    fontSize: "2rem",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                PaperProps={{
                  sx: {
                    "& .MuiMenuItem-root": {
                      fontSize: "1.1rem",
                      padding: "12px 24px",
                    },
                  },
                }}
              >
                {menuItems.map((item) => (
                  <MenuItem key={item.label} onClick={handleClose}>
                    <a
                      href={item.href}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        fontSize: "1.1rem",
                      }}
                    >
                      {item.label}
                    </a>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 3 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  href={item.href}
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    padding: "8px 16px",
                    minWidth: "auto",
                    "&:hover": {
                      bgcolor: "primary.dark",
                      transition: "all 0.3s",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {isSticky && <Box sx={{ height: "64px" }} />}
    </>
  );
}

export default Header;
