import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import * as launchService from "../../services/launchService";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { IconButton } from "@mui/material";

//Hiding the Id column in toggle columns toolbar.
const getTogglableColumns = (columns) => {
  return columns
    .filter((column) => column.field !== "id")
    .map((column) => column.field);
};

export default function LaunchesGridView() {
  const columns = [
    { field: "id", filterable: false },
    { field: "flightNumber", headerName: "Flight Number", width: 90, flex: 1 },
    {
      field: "missionName",
      headerName: "Mission Name",
      minWidth: 70,
      flex: 1,
    },
    {
      field: "launchYear",
      headerName: "Launch Year",
      minWidth: 30,
      flex: 0.7,
    },
    {
      field: "siteName",
      headerName: "Site Name",
      minWidth: 30,
      flex: 0.7,
    },
    {
      field: "upcoming",
      headerName: "Type",
      minWidth: 30,
      flex: 0.7,
      valueGetter: ({ value }) => (value ? "Upcoming" : "Past"),
    },
    {
      field: "actions",
      headerName: "View Launch",
      minWidth: 20,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton>
          <RocketLaunchIcon
            onClick={() => navigate(`/launchDetail/${params.row.flightNumber}`)}
          ></RocketLaunchIcon>
        </IconButton>
      ),
      flex: 1,
    },
  ];

  const navigate = useNavigate();
  const [launches, setLaunches] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (launches.length === 0) {
      // Setting Loader before fetching the data.
      setLoading(true);

      // Getting all launches from the API.
      launchService.getAllLaunches().then((response) => {
        setLaunches(
          response.data.map((d, index) => {
            return {
              id: index + 1, // Setting a different property as unique id, because flight number does not appear to be unique.
              flightNumber: d.flight_number,
              missionName: d.mission_name,
              launchYear: d.launch_year,
              siteName: d.launch_site.site_name,
              upcoming: d.upcoming,
            };
          })
        );

        // Disabling the loader after data is fetched.
        setLoading(false);
      });
    }
  }, [launches]);
  return (
    <Container>
      <h2>All Past and Upcoming Launches</h2>
      <div style={{ height: "80vh", width: "100%" }}>
        <DataGrid
          loading={loading}
          slotProps={{
            columnsPanel: {
              getTogglableColumns,
            },
          }}
          // Hiding the id column at initial render.
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          rows={launches}
          columns={columns}
          pageSizeOptions={[10, 20, 30]}
        />
      </div>
    </Container>
  );
}
