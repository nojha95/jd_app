import { Box, InputBase, Typography } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { SearchRequest } from "../../api/models";
import { aiSearchApi } from "../../api/api";
import people_search from "../../assets/search.svg";
const AiSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const makeApiRequest = async () => {
    if (searchQuery) {
      const request: SearchRequest = {
        query: searchQuery,
      };
      const result = await aiSearchApi(request);
      setResult(result);
      setSearchQuery("");
    }
  };
  const onPressEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action to avoid any form submission or other unwanted behavior
      // Logic to execute on Enter press
      console.log("Enter pressed");
      // For example, call a function to handle the action you want to perform
      makeApiRequest();
    }
  };

  return (
    <>
      <Box
        sx={{
          // minHeight: "75vh",
          display: "flex",
          paddingTop: result ? "3rem" : "13rem",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {!result && <img src={people_search} style={{ width: "100px" }} />}
        <Typography variant="h3">Candidate Search</Typography>
      </Box>
      <Box sx={{ mx: "4rem", my: "2rem" }}>
        <Typography>{result}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            p: "0.5rem 0.75rem",
            display: "flex",
            position: "fixed",
            bottom: 0,
            width: "80vw",
            border: "2px solid grey",
            borderRadius: "8px",
            flexDirection: "column",
            my: "2rem",
          }}
        >
          <InputBase
            placeholder="Ask Anything"
            sx={{ width: "100%" }}
            value={searchQuery}
            onKeyDown={onPressEnter}
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
      </Box>
    </>
  );
};

export default AiSearch;
