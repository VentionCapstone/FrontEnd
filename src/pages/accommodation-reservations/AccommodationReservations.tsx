import { Box, useMediaQuery } from '@mui/material';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useParams } from 'react-router-dom';

import { useGetAccommodationReservations } from '@src/api/queries/accommodation/useGetAccommodationBookings';
import BackButton from '@src/components/button/BackButton';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import DataFetchError from '@src/components/shared/DataFetchError';
import { ErrorTypes } from '@src/types/i18n.types';
import BasicTable from './components/Table';
import { AccommodationBookingsStyles } from './components/styles';
import './index.css';
import getRandomColor from './utils/generateColor';

import colors from './components/colorsConstant';

export default function AccommodationReservations() {
  const isMdScreen = useMediaQuery('(min-width:650px) and (max-width:1023px)');
  const { id } = useParams();

  const { isPending, data, isError } = useGetAccommodationReservations(id as string);

  if (isPending) {
    return (
      <Box>
        <LoadingPrimary />
      </Box>
    );
  }

  if (isError) {
    return <DataFetchError errorKey={ErrorTypes.accommodation_failed_to_get_list} />;
  }

  const newArr = data.data.map((item, i: number) => {
    if (!colors[i]) {
      colors.push(getRandomColor());
    }

    return {
      startDate: new Date(item.startDate),
      endDate: new Date(item.endDate),
      key: item.id,
    };
  });

  return (
    <>
      <BackButton />
      <Box sx={AccommodationBookingsStyles.mainContainer}>
        <BasicTable data={data.data} colors={colors} />
        <Box sx={AccommodationBookingsStyles.dateRangeContainer} className="customDatePickerWidth">
          <DateRange
            dragSelectionEnabled={true}
            showDateDisplay={false}
            months={2}
            direction={isMdScreen ? 'horizontal' : 'vertical'}
            ranges={newArr}
            rangeColors={colors}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
}
