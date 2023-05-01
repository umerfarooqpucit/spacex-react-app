import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import * as launchService from "../../services/launchService";

const columns = [];

const rows = [];

export default function LaunchesGridView() {
  const [launches, setLaunches] = React.useState([]);

  React.useEffect(() => {
    launchService.getAllLaunches().then((response) => setLaunches(response.data));
  }, []);
  return (
    <Container>
      <h2>All Past and Upcoming Launches</h2>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={{ page: 0, pageSize: 5 }}
          checkboxSelection
        />
      </div>
    </Container>
  );
}
