import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingView from "../../containers/mainView/LandingView";
import LaunchDetailView from "../../containers/launchDetailView/LaunchDetailView";
import LaunchesGridView from "../../containers/launchesGridView/LaunchesGridView";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route path="allLaunches" element={<LaunchesGridView />} />
        <Route path="launchDetail" element={<LaunchDetailView />} />
        <Route path="*" element={<LandingView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
