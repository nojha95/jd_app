import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import logo from "../../assets/DB_logo_crop.png";
import logo_hindi from "../../assets/DB_text_hindi.jpeg";
import { CssBaseline } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
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
              flexGrow: 1,
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
          {/* <img src={logo} style={{ height: "50px" }} /> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
