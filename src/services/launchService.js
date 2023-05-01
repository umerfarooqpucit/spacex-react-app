import Axios from "./axiosConfig";

export function getAllLaunches() {
  return Axios.get("/Launches");
}

export function getLaunchById(id) {
  return Axios.get(`/Launches/${id}`);
}