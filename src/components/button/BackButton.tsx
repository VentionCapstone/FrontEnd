import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{ 'padding': 1, 'color': 'secondary2.main', ':hover': { bgcolor: 'transparent' } }}
    >
      <ArrowBackIosRoundedIcon fontSize="small" />
    </IconButton>
  );
};

export default BackButton;
