import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Button, CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

// import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
  const theme = useTheme();
  const onClickLogout = async () => {
    await fetch("/logout");
    window.location.reload();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static" sx={{ bgcolor: "white" }}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",

              // justifyContent: "center",

              mx: 4,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                // margin: "auto",
                color: "black",
              }}
            >
              AI SkillSync by{" "}
              <span style={{ fontWeight: 600, fontSize: "1.25rem" }}>
                Dainik Bhaskar
              </span>
            </Typography>

            {/* <img src={logo_hindi} style={{ height: "30px" }} /> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              flexGrow: 1,
              marginLeft: "20vw",
              [theme.breakpoints.down("md")]: {
                marginLeft: "20px",
              },
            }}
          >
            <Link to="/">
              <Box
                sx={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}
              >
                <HomeIcon sx={{ color: "#000" }} />
                <Typography color={"black"}>Home</Typography>
              </Box>
            </Link>
            <Link to="aisearch">
              <Box
                sx={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}
              >
                <SearchIcon sx={{ color: "#000" }} />
                <Typography color={"black"}>Search</Typography>
              </Box>
            </Link>
          </Box>
          <Button onClick={onClickLogout} sx={{ mx: 4, color: "black" }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
