import { Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Booking } from '@src/types/accommodation.types';
import { CreateAccommodationRoute } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';
import formatDate from '../utils/formatDate';
import getRandomIntegerFromRange from '../utils/randomIntegerFromRange';
import { AccommodationBookingsStyles } from './styles';
function createReservationRowData(
  fullname: string,
  startDate: string,
  endDate: string,
  totalCost: string,
  id: string,
  specificColor: string,
  imgUrl: string
) {
  return { fullname, startDate, endDate, totalCost, id, specificColor, imgUrl };
}
type Props = {
  data: Booking[];
  colors: string[];
};

export default function BasicTable({ data, colors }: Props) {
  const { t } = useTranslation();

  const rows = data.map((data, i) => {
    return createReservationRowData(
      data.user.firstName + ' ' + data.user.lastName,
      formatDate(data.startDate),
      formatDate(data.endDate),
      '$' + getRandomIntegerFromRange(60, 200),
      data.id,
      colors[i],
      data.user.profile.imageUrl
    );
  });

  return (
    <TableContainer component={Paper} sx={AccommodationBookingsStyles.tableContainer}>
      {rows.length > 0 ? (
        <Table stickyHeader sx={AccommodationBookingsStyles.mainTable} aria-label="simple table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell className="table-head__cell">User name</TableCell>
              <TableCell className="table-head__cell" align="center">
                Start Date
              </TableCell>
              <TableCell className="table-head__cell" align="center">
                End Date
              </TableCell>
              <TableCell className="table-head__cell" align="center">
                Total Cost
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                className="table-body__row"
                key={row.id}
                sx={AccommodationBookingsStyles.tableRow}
              >
                <TableCell component="th" scope="row" sx={AccommodationBookingsStyles.tableCell}>
                  <Box sx={AccommodationBookingsStyles.imageContainer(row.specificColor)}>
                    <img src={row.imgUrl} style={{ borderRadius: '50%' }} alt="User Avatar" />
                  </Box>
                  <Box>
                    <Box sx={AccommodationBookingsStyles.coloredLine(row.specificColor)}></Box>
                    <Box
                      sx={{
                        marginTop: '9px',
                      }}
                    >
                      {row.fullname}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">{row.startDate}</TableCell>
                <TableCell align="center">{row.endDate}</TableCell>
                <TableCell align="center">{row.totalCost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body1" sx={AccommodationBookingsStyles.notFoundText}>
          {t(CreateAccommodationRoute.no_results)}
        </Typography>
      )}
    </TableContainer>
  );
}
