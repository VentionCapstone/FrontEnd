import { Box } from '@mui/system';
import { useParams } from 'react-router';

import { Grid } from '@mui/material';
import useGetHostProfileQuery from '@src/api/queries/host/useGetHostProfileQuery';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import DataFetchError from '@src/components/shared/DataFetchError';
import HostAbout from './components/HostAbout';
import HostListings from './components/HostListings';
import HostProfileCard from './components/HostProfileCard';
import HostReviews from './components/HostReviews';
import HostVerifiedInfo from './components/HostVerifiedInfo';

function Host() {
  const { id: hostId } = useParams();

  const { isPending, data, isError } = useGetHostProfileQuery(hostId as string);

  if (isPending) {
    return (
      <Box>
        <LoadingPrimary />
      </Box>
    );
  }

  if (isError) return <DataFetchError position="center" />;

  const host = data.data;

  return (
    <Grid
      container
      spacing={{ lg: '4rem', xs: '2rem' }}
      columns={{ xs: 1, md: 2, lg: 10 }}
      alignItems={'start'}
      pt={{ xs: '0.5rem', lg: '2rem' }}
    >
      <Grid
        item
        xs={1}
        md={2}
        lg={3}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row', lg: 'column' },
          gap: '2rem',
          position: { lg: 'sticky' },
          top: '2rem',
        }}
      >
        <HostProfileCard host={host} />
        <HostVerifiedInfo host={host} />
      </Grid>
      <Grid
        item
        xs={1}
        md={2}
        lg={7}
        sx={{
          '& > *:not(:last-child)': {
            borderBottom: '1px solid #e0e0e0',
          },
        }}
      >
        <HostAbout host={host} />
        <HostReviews host={host} />
        <HostListings host={host} />
      </Grid>
    </Grid>
  );
}

export default Host;
