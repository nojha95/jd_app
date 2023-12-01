import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

interface Props {
  answer: string;
}

const Answer = ({ answer }: Props) => {
  const parsedObject = JSON.parse(answer);
  const summary = Object.entries(parsedObject).slice(0, 2);
  const additional = Object.entries(parsedObject).slice(2);

  return (
    // <div
    //   style={{ whiteSpace: "pre-line" }}
    //   dangerouslySetInnerHTML={{ __html: answer }}
    // ></div>
    <Box>
      <Box>
        <Grid container spacing={2}>
          {summary.map(([key, value], index) => (
            <Grid item md={index == 0 ? 2 : 10}>
              <Card key={key} variant="outlined" style={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {key}
                  </Typography>
                  <Box
                    sx={
                      index == 0
                        ? {
                            display: "flex",
                            my: 5,
                            justifyContent: "center",
                          }
                        : {}
                    }
                  >
                    <Typography
                      variant={index == 0 ? "h5" : "body1"}
                      color="text.secondary"
                    >
                      {value as string}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {additional.map(([key, value]) => (
            <Grid item md={6}>
              <Card key={key} variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {key}
                  </Typography>
                  <Box>
                    <Typography
                      style={{ whiteSpace: "pre-line" }}
                      variant={"body1"}
                      color="text.secondary"
                    >
                      {value as string}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Answer;
