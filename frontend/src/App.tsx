import { useCallback, useState } from "react";
import "./App.css";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import NavBar from "./components/NavBar/Navbar";
import DropZone from "./components/DropZone/DropZone";
import { AnswerResponse } from "./api/models";
import logo from "./assets/DB_logo.png";

function App() {
  // const [count, setCount] = useState(0);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [output, setOutput] = useState<AnswerResponse>({
    answer: `<b>1. JD & CV Match Percentage:</b> 30%
    <b>2. JD & CV Comparison Summary:</b> The candidate has relevant work experience in the media industry and has worked in Gujarat, which aligns with the preferences mentioned in the JD. However, the candidate's current position as the Head of Sales and Marketing does not specifically mention experience in handling an SBU or profit center of the desired scale. The candidate does have experience in business development, marketing, sales, and relationship management, which are important skills for the role. The candidate also has experience in team management, strategic planning, and channel management, which are mentioned in the JD as desired attributes.
    
    Additional Information:
    
    1. Resume Key Highlights: The candidate has over 19 years of experience in strategy planning, business development, marketing, sales, relationship management, and team management. They have experience in the real estate and finance sectors, and have successfully launched new branches and products. They have achieved consistent growth and have been recognized for their performance.
    
    2. Strengths and Weaknesses of Resume based on Job Description:
    Strengths:
    - Relevant industry experience in media, real estate, and finance.
    - Experience in business development, marketing, sales, and relationship management.
    - Success in launching new branches, products, and achieving growth.
    
    Weaknesses:
    - No specific mention of experience in handling an SBU or profit center of the desired scale.
    - Limited experience in brand management and understanding of the editorial side.
    
    3. Interview Questions:
    - Can you provide examples of how you have successfully developed business in new territories?
    - How have you managed and retained existing customers while also developing new customers?
    - Can you share your experience in establishing sales strategies and implementing them?
    - How have you increased brand awareness and brand image in your previous roles?
    - Can you discuss your approach to conducting market research and analyzing trends?
    - How have you managed sales promotions and events targeted at specific audiences?
    
    4. Personalized Suggestions for Future Learning Pathways:
    - Business/Profit Center Management: Since the candidate does not have specific experience in handling an SBU or profit center, they can consider learning more about managing the financials, operations, and overall performance of a business/profit center.
    - Brand Management: To strengthen their understanding of brand management, the candidate can explore courses or resources on creating brand strategies, building brand equity, and managing brand perception.
    - Editorial Understanding: Since the JD mentions the importance of understanding the content of the editorial side, the candidate can try to gain more knowledge and insights into the editorial processes and content creation in the media industry.
    
    5. Culture Fit:
    Based on the information provided in the resume, it is difficult to assess the candidate's culture fit with the company's core values. However, the candidate's strengths in relationship management, team building, and proven success in achieving goals align with the core values of being result-oriented, having emotional connect, and being a ground connector. Additionally, the candidate's experience in strategic planning and innovative thinking aligns with the core value of being a trendsetter.
    
    Overall, the candidate's resume shows relevant experience and skills for the position of State Head in Gujarat. They have demonstrated success in business development, sales, and marketing, and have experience in team management. Some areas for improvement include gaining more experience in handling an SBU or profit center and deepening their understanding of brand management and the editorial side in the media industry.`,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onDropJd = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    setJdFile(acceptedFiles[0]);
    console.log(acceptedFiles[0].name);
  }, []);

  const onDropResume = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    setResumeFile(acceptedFiles[0]);
    console.log(acceptedFiles[0].name);
    console.log(resumeFile?.name);
  }, []);

  const onClickReset = () => {
    setOutput({ answer: "" });
    setResumeFile(null);
    setJdFile(null);
  };

  const handleUpload = async () => {
    if (resumeFile && jdFile) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("jd-file", jdFile);
        formData.append("cv-file", resumeFile);

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
      <NavBar />
      {output.answer == "" ? (
        <Box>
          <Box sx={{ mx: 4, my: 1 }}>
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
              <Grid container columnSpacing={20} spacing={4} sx={{ my: 2 }}>
                <Grid item md={6}>
                  <Box
                    sx={{
                      border: "2px dashed #ccc",
                      borderRadius: "16px",
                      height: 200,
                    }}
                  >
                    <DropZone
                      acceptedFile={jdFile}
                      onDrop={onDropJd}
                      lable={"JD"}
                    />
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box
                    sx={{
                      border: "2px dashed #ccc",
                      borderRadius: "16px",
                      height: 200,
                    }}
                  >
                    <DropZone
                      acceptedFile={resumeFile}
                      onDrop={onDropResume}
                      lable={"Resume"}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box
                sx={{
                  my: 6,
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
            <Button variant="contained" onClick={onClickReset}>
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
            <div
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: output.answer }}
            ></div>
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

export default App;
