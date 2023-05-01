import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
export default function LandingView() {
  const navigate = useNavigate();
  return (
    <div>
      Landing View
      <Button variant="outlined" onClick={() => navigate('allLaunches')}>View Launches</Button>
    </div>
  );
}
