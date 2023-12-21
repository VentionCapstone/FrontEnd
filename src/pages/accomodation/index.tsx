import Typography from '@mui/material/Typography';
import { Reviews } from './components/Reviews';

function Accomodation() {
  return (
    <>
      <Typography
        mb={{ xs: 4, md: 6, lg: 10 }}
        fontSize={{ xs: '1.5rem', md: '2rem' }}
        fontWeight={600}
        component={'h1'}
      >
        Accomadation
      </Typography>

      <Reviews />
    </>
  );
}

export default Accomodation;
