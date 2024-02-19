import { useCallback, useState } from "react";

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import DropZone from "../../components/DropZone/DropZone";
import { AnswerResponse } from "../../api/models";
import logo from "../../assets/DB_logo.png";
import Answer from "../../components/Answer/Answer";

function CVMatch() {
  // const [count, setCount] = useState(0);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [output, setOutput] = useState<AnswerResponse>({
    answer: "",
  });
  const [jdName, setJdName] = useState<string | null>(null);
  const [personName, setPersonName] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onDropJd = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    setJdFile(acceptedFiles[0]);
    setJdName(acceptedFiles[0].name.replace(".pdf", ""));
    console.log(acceptedFiles[0].name);
  }, []);

  const onDropResume = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    setResumeFile(acceptedFiles[0]);
    setPersonName(acceptedFiles[0].name.replace(".pdf", ""));
    console.log(acceptedFiles[0].name);
    console.log(resumeFile?.name);
  }, []);

  const onClickReset = () => {
    setOutput({ answer: "" });
    setResumeFile(null);
    setJdName(null);
    setPersonName(null);
    setJdFile(null);
  };

  const handleUpload = async () => {
    if (resumeFile && jdFile && jdName && personName) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("jd-file", jdFile);
        formData.append("cv-file", resumeFile);
        formData.append("jdName", jdName);
        formData.append("personName", personName);

        // Replace 'YOUR_BACKEND_API_URL' with the actual backend API endpoint
        const response = await fetch("/match", {
          method: "POST",
          body: formData,
        });

        const response_data: AnswerResponse = await response.json();
        setOutput(response_data);
        // Handle the response from the backend as needed
        console.log("Upload successful:", response.json());
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.warn("No file selected");
    }
  };

  return (
    <Box>
      {output.answer == "" ? (
        <Box>
          <Box sx={{ mx: 4, marginTop: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img src={logo} />
              <Typography variant="h5">
                Upload JD and CV to get started
              </Typography>
            </Box>
            <Box sx={{ mx: 16 }}>
              <Grid container columnSpacing={20} spacing={4} sx={{ my: 1 }}>
                <Grid item md={6}>
                  <Box
                    sx={{
                      border: "2px dashed #ccc",
                      borderRadius: "16px",
                      height: 200,
                      borderTop: "6px solid #000",
                    }}
                  >
                    <DropZone
                      acceptedFile={jdFile}
                      onDrop={onDropJd}
                      lable={"JD"}
                    />
                  </Box>
                  <TextField
                    sx={{ marginTop: 2, width: "100%" }}
                    required
                    id="outlined-required"
                    label="Job Role Name"
                    InputLabelProps={{
                      shrink: jdName != null,
                    }}
                    value={jdName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setJdName(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <Box
                    sx={{
                      border: "2px dashed #ccc",
                      borderRadius: "16px",
                      height: 200,
                      borderTop: "6px solid #000",
                    }}
                  >
                    <DropZone
                      acceptedFile={resumeFile}
                      onDrop={onDropResume}
                      lable={"Resume"}
                    />
                    <TextField
                      sx={{ marginTop: 2, width: "100%" }}
                      required
                      id="outlined-required"
                      label="Candidate Name"
                      value={personName}
                      InputLabelProps={{
                        shrink: personName != null,
                      }}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setPersonName(event.target.value);
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box
                sx={{
                  my: 3,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ display: "flex", width: 400, marginBottom: 3 }}
                  onClick={handleUpload}
                  disabled={!(jdName && jdFile && resumeFile && personName)}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    display: "flex",
                    width: 250,
                    bgcolor: "red",
                  }}
                  onClick={onClickReset}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              borderRadius: "16px",
              mx: 15,
              marginTop: 3,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              onClick={onClickReset}
              sx={{ bgcolor: "red" }}
            >
              Reset
            </Button>
          </Box>
          <Box
            sx={{
              my: 4,
              mx: 8,
              borderRadius: "15px",
              bgcolor: "#FDFFEC",
              p: 4,
            }}
          >
            {/* <Typography style={{ whiteSpace: "pre-line" }}>
              {output.answer}
            </Typography> */}
            <Answer answer={output.answer} />
          </Box>
        </>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default CVMatch;
