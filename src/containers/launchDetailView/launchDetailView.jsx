import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Container from '@mui/material/Container';

const columns = [];

const rows = [];

export default function LaunchDetailView() {
  return (
    <Container>
      <h2>Launch Detail for Flight Number</h2>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={{ page: 0, pageSize: 5 }}
        />
      </div>
    </Container>
  );
}
