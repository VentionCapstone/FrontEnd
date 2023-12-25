import { Box } from '@mui/system';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import httpClient from '../../api/httpClient';
import LoadingPrimary from '../../components/loader/LoadingPrimary';
import { AccommodationResponse } from '../../types/accommodation.types';

function Accommodation() {
  const accommodationId = useParams().id;

  const { isPending, data, isError } = useQuery({
    queryKey: ['accommodation', accommodationId],
    queryFn: async () => {
      const { data } = await httpClient.get<AccommodationResponse>(
        `/accommodations/${accommodationId}`
      );
      return data.data;
    },
  });

  if (isPending) {
    return (
      <Box>
        <LoadingPrimary />
      </Box>
    );
  }
  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <Box>
      <Box>
        {data.media.map((media) => (
          <Box key={media.id}>
            <img src={media.imageUrl} alt={media.accommodationId} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Accommodation;
