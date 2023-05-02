import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Container, Grid } from "@mui/material";
import bgImage from "../../spacex-bg.jpg";
export default function LandingView() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <Container>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          paddingTop={40}
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Button sx={{ color: 'white', borderColor: "white" }} variant="outlined" onClick={() => navigate("allLaunches")}>
            View Launches
          </Button>
        </Grid>
      </Container>
    </div>
  );
}
