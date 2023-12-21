import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Review } from './Review';
import { WriteReview } from './WriteReview';

const REVIEWS = [
  {
    username: 'Rebecca',
    country: 'Reckenroth, Germany',
    comment:
      'Ulrike and Alfred are both wonderful individuals. We had an incredibly pleasant stay with the perfect 3 night stay to enjoy the surroundings and relax to the fullest . Ulrike is the definition of the perfect host - directly available to help and incredibly responsive to make sure you have the best experience during your trip. 11/10 would recommend. Ulrike and Alfred are both wonderful individuals. We had an incredibly pleasant stay with the perfect 3 night stay to enjoy the surroundings and relax to the fullest . Ulrike is the definition of the perfect host - directly available to help and incredibly responsive to make sure you have the best experience during your trip. 11/10 would recommend.Ulrike and Alfred are both wonderful individuals. We had an incredibly pleasant stay with the perfect 3 night stay to enjoy the surroundings and relax to the fullest . Ulrike is the definition of the perfect host - directly available to help and incredibly responsive to make sure you have the best experience during your trip. 11/10 would recommend.',
  },
  {
    username: 'Teresa',
    country: 'Kottmar, Germany',
    comment: 'Wir hatten eine sehr schöne Zeit im Zirkuswagen und bei den Schafen.',
  },
  {
    username: 'Susanne',
    country: 'Cologne, Germany',
    comment:
      'Ich war schon zum zweiten Mal im Schäferwagen. Es war wieder ein super entspannendes Wochenende. Ich liebe die Zeit ganz nah bei den Schafen. Lesen in der Hängematte unter Bäumen. Schöne Aussicht ins Siegtal. Total nette Vermieter. Tip: Antimückenspray für abends nicht vergessen. Ihr seid in der Natur.',
  },
  {
    username: 'Rebecca',
    country: 'Reckenroth, Germany',
    comment:
      'Ulrike and Alfred are both wonderful individuals. We had an incredibly pleasant stay with the perfect 3 night stay to enjoy the surroundings and relax to the fullest . Ulrike is the definition of the perfect host - directly available to help and incredibly responsive to make sure you have the best experience during your trip. 11/10 would recommend. Ulrike and Alfred are both wonderful individuals. We had an incredibly pleasant stay with the perfect 3 night stay to enjoy the surroundings and relax to the fullest . Ulrike is the definition of the perfect host - directly available to help and incredibly responsive to make sure you have the best experience during your trip. 11/10 would recommend.Ulrike and Alfred are both wonderful individuals. We had an incredibly pleasant stay with the perfect 3 night stay to enjoy the surroundings and relax to the fullest . Ulrike is the definition of the perfect host - directly available to help and incredibly responsive to make sure you have the best experience during your trip. 11/10 would recommend.',
  },
  {
    username: 'Teresa',
    country: 'Kottmar, Germany',
    comment:
      'Wir hatten eine sehr schöne Zeit im Zirkuswagen und bei den Schafen. Die Gastgeber sind sehr freundlich und die Unterkunft ist sehr, sehr liebevoll eingerichtet mit vielen Details und es fehlt an nichts. Selbst bei regnerischem Wetter ist die Unterkunft gemütlich und der Blick aus dem Fenster wunderschön. Es war auch ein Highlight für uns, gemeinsam mit Ulrike die Schafe zu füttern. Wir empfehlen die Unterkunft auf jeden Fall weiter und hoffen, dass wir bald noch einmal kommen können.',
  },
  {
    username: 'Susanne',
    country: 'Cologne, Germany',
    comment:
      'Ich war schon zum zweiten Mal im Schäferwagen. Es war wieder ein super entspannendes Wochenende. Ich liebe die Zeit ganz nah bei den Schafen. Lesen in der Hängematte unter Bäumen. Schöne Aussicht ins Siegtal. Total nette Vermieter. Tip: Antimückenspray für abends nicht vergessen. Ihr seid in der Natur.',
  },
];

export const Reviews = () => {
  return (
    <>
      <WriteReview />

      <Grid container spacing={{ xs: 8, lg: 16 }}>
        {REVIEWS.map((review, index) => (
          <Grid key={index} item xs={12} lg={6}>
            <Review review={review} />
          </Grid>
        ))}
      </Grid>

      <Button
        variant={'outlined'}
        sx={{ display: 'block', fontWeight: 600, mt: { xs: 8, lg: 16 }, mx: 'auto' }}
      >
        Load more
      </Button>
    </>
  );
};
