import { Box, InputBase, Typography } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { SearchRequest } from "../../api/models";
import { aiSearchApi } from "../../api/api";
const AiSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>();
  const [result, setResult] = useState<string>();

  const makeApiRequest = async () => {
    if (searchQuery) {
      const request: SearchRequest = {
        query: searchQuery,
      };
      const result = await aiSearchApi(request);
      setResult(result);
    }
  };

  return (
    <Box
      sx={{
        // minHeight: "75vh",
        display: "flex",
        paddingTop: result ? "3rem" : "13rem",
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
          <Box
            sx={{ marginLeft: "auto", cursor: "pointer" }}
            onClick={makeApiRequest}
          >
            <SendIcon />
          </Box>
        </Box>
        <Typography>{result}</Typography>
      </Box>
    </Box>
  );
};

export default AiSearch;
