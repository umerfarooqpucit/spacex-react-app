import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useParams, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import * as launchService from "../../services/launchService";
import Container from "@mui/material/Container";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function LaunchDetailView() {
  // Converting camelCase to Sentence Case to get full text.
  function getFullText(field) {
    const result = field.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  }

  let { id } = useParams();
  const navigate = useNavigate();
  const [launch, setLaunch] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // Setting Loader before fetching the data.
    setLoading(true);

    // Getting specific launch details from the API.
    launchService.getLaunchById(id).then(({ data }) => {
      setLaunch({
        flightNumber: data.flight_number,
        missionName: data.mission_name,
        launchYear: data.launch_year,
        launchDate: new Date(data.launch_date_utc),
        siteName: data.launch_site.site_name,
        siteNameLong: data.launch_site.site_name_long,
        type: data.upcoming ? "Upcoming" : "Past",
        missionId:
          data.mission_id?.length > 0 ? data.mission_id.join(", ") : "",
        isTentative: data.is_tentative ? "Yes" : "No",
        launchWindow: data.launch_window,
        launchSuccess: data.launch_success ? "Yes" : "No",
        rocketId: data.rocket.rocket_id,
        rocketName: data.rocket.rocket_name,
        details: data.details,
      });

      // Disabling the loader after data is fetched.
      setLoading(false);
    });
  }, [id]);
  return (
    <Container>
      <h2>Launch Details for Flight Number {id}</h2>
      <Button
        onClick={() => navigate(`/allLaunches`)}
        variant="outlined"
        startIcon={<ArrowBack />}
      >
        All Launches
      </Button>
      <div style={{ height: 500, width: "100%" }}>
        {loading ? (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <List>
            {Object.keys(launch).map((key, index) => (
              <ListItem key={index + 1}>
                <ListItemIcon>
                  <RocketLaunchIcon></RocketLaunchIcon>
                </ListItemIcon>
                <ListItemText
                  primary={`${getFullText(key)} - ${launch[key]}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </Container>
  );
}
