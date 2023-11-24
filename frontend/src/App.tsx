import { useCallback, useState } from 'react'
import './App.css'
import { Backdrop, Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import NavBar from './components/NavBar/Navbar'
import DropZone from './components/DropZone/DropZone'
import { AnswerResponse } from './api/models'


function App() {
  const [count, setCount] = useState(0)
  const [resumeFile ,setResumeFile] = useState<File | null>(null)
  const [jdFile, setJdFile] = useState<File | null>(null)
  const [output, setOutput] = useState<AnswerResponse>({"answer": ""})
  const [isLoading ,setIsLoading] = useState<boolean>(false)
  const onDropJd = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    setJdFile(acceptedFiles[0])
    console.log(acceptedFiles[0].name);
  }, []);

  const onDropResume = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    setResumeFile(acceptedFiles[0])
    console.log(acceptedFiles[0].name);
    console.log(resumeFile?.name);
  }, []);

  const handleUpload = async () => {
    if (resumeFile && jdFile) {
      try {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('jd-file', jdFile);
        formData.append('cv-file',resumeFile)

        // Replace 'YOUR_BACKEND_API_URL' with the actual backend API endpoint
        const response = await fetch('/match', {
          method: 'POST',
          body: formData,
        });
        
        const response_data: AnswerResponse = await response.json()
        setOutput(response_data)
        // Handle the response from the backend as needed
        console.log('Upload successful:', response.json());
      } catch (error) {
        console.error('Error uploading file:', error);
      }finally {
        setIsLoading(false)
      }
    } else {
      console.warn('No file selected');
    }
  };

  
  return (
<Box>
<NavBar/>
  {output.answer == "" ?
  (
    <Box>
    
    <Box sx={{m: 4}}>
    <Typography variant='h5'>Upload JD and CV to get started</Typography>
    <Grid container spacing={4} sx={{my: 2}}>
      <Grid item md={6}>
    <Box sx={{border: "2px dashed #ccc", borderRadius: '16px',height: 300}}> 
      <DropZone acceptedFile={jdFile} onDrop={onDropJd} lable={"JD"}/>
    </Box>
    </Grid>
    <Grid item md={6}>
    <Box sx={{border: "2px dashed #ccc", borderRadius: '16px', height: 300}}> 
      <DropZone acceptedFile={resumeFile} onDrop={onDropResume} lable={"Resume"}/>
    </Box>
    </Grid>

    </Grid>
    <Button variant="contained" sx={{display: "flex", margin: "auto", width: 400}} onClick={handleUpload}>Submit</Button>
    </Box>
    </Box>):(
    <Box sx={{my: 2, mx: 4}}>
    <Typography style={{ whiteSpace: 'pre-line' }}>{output.answer}</Typography>
    </Box>)
}
<Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={isLoading}
  // onClick={handleClose}
>
  <CircularProgress color="inherit" />
</Backdrop>
</Box>
  )
}

export default App
