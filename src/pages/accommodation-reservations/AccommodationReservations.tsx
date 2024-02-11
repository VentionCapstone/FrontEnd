import { Box, useMediaQuery } from '@mui/material';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useParams } from 'react-router-dom';

import { useGetAccommodationReservations } from '@src/api/queries/accommodation/useGetAccommodationBookings';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import DataFetchError from '@src/components/shared/DataFetchError';
import { ErrorTypes } from '@src/types/i18n.types';
import BasicTable from './components/Table';
import { AccommodationBookingsStyles } from './components/styles';
import './index.css';
import getRandomColor from './utils/generateColor';

const colors = [
  '#ff913d',
  '#8ed13e',
  '#3d91ff',
  '#fed14c',
  '#3ecf8e',
  '#ff3d91',
  '#8e3ecf',
  '#cf8e3e',
  '#ff3d4c',
  '#f06d8c',
  '#68d8d6',
  '#b36ae2',
  '#64c6b1',
  '#fc8b3d',
  '#2f80ed',
  '#e7a336',
  '#3f9b0b',
  '#c54857',
  '#51b56b',
  '#f18d05',
  '#67a4d1',
  '#b145a2',
  '#74d497',
  '#f29c9c',
  '#96c69d',
  '#e25d5d',
  '#437ef3',
  '#9e74e7',
  '#65c4f3',
  '#f7745b',
  '#67d5f2',
  '#f0a2a2',
  '#6be67a',
  '#df628a',
  '#c3bc59',
  '#5fd26c',
  '#f6b262',
  '#4cfed1',
  '#91ff3d',
  '#d14cfe',
  '#f7a05f',
  '#7cf383',
  '#f09af6',
  '#3cf2b7',
  '#e2963d',
  '#69c0e2',
  '#d26969',
  '#6ed09f',
  '#f2659c',
  '#f5c766',
  '#6f99f2',
  '#f09e68',
  '#7de1f8',
  '#e54b5d',
  '#5ce78c',
  '#f283c2',
  '#82e1b4',
  '#f28758',
  '#70cbf3',
  '#ff3d3d',
];

export default function AccommodationReservations() {
  const isMdScreen = useMediaQuery('(min-width:650px) and (max-width:1023px)');
  const { id } = useParams();

  // const currentMonth = dayjs();
  // const nextMonth = currentMonth.add(1, 'month');

  const { isPending, data, isError } = useGetAccommodationReservations(
    id as string
    //      {
    //     currentMonth: currentMonth.format('YYYY-MM-DD'),
    //     nextMonth: nextMonth.format('YYYY-MM-DD'),

    // }
  );

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
      // disabled: true,
      // autoFocus: false,
      showDateDisplay: true,
    };
  });

  return (
    <Box sx={AccommodationBookingsStyles.mainContainer}>
      <BasicTable data={data.data} colors={colors} />
      <Box sx={AccommodationBookingsStyles.dateRangeContainer} className="customDatePickerWidth">
        <DateRange
          dragSelectionEnabled={true}
          showDateDisplay={false}
          months={2}
          direction={isMdScreen ? 'horizontal' : 'vertical'}
          onShownDateChange={(elem) => {
            console.log('AccommodationBookings ~ elem:', elem);
            // // setMyCurrentMonth(Math.random());
            // setMyCurrentMonth(dayjs(elem));
          }}
          onRangeFocusChange={() => console.log('SASASASS')}
          onChange={(item) => console.log(item)}
          ranges={newArr}
          rangeColors={colors}
        />
      </Box>
    </Box>
  );
}
