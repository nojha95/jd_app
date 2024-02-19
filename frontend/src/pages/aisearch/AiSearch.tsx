import { Box, InputBase, Typography } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
const AiSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>();

  return (
    <Box
      sx={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Candidate Search</Typography>
        <Box
          sx={{
            p: "0.5rem 0.75rem",
            display: "flex",

            width: "50rem",
            border: "2px solid grey",
            borderRadius: "8px",
            flexDirection: "column",
          }}
        >
          <InputBase
            placeholder="Ask Anything"
            sx={{ width: "100%" }}
            value={searchQuery}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchQuery(event.target.value);
            }}
          />
          <Box sx={{ marginLeft: "auto", cursor: "pointer" }}>
            <SendIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AiSearch;
