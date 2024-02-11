import { Box, Typography, styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Booking } from '@src/types/accommodation.types';
import { CreateAccommodationRoute } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';
import formatDate from '../utils/formatDate';
import getRandomNumber from './../utils/randomNumber';
import { AccommodationBookingsStyles } from './styles';
function createData(
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
    return createData(
      data.user.firstName + ' ' + data.user.lastName,
      formatDate(data.startDate),
      formatDate(data.endDate),
      '$' + getRandomNumber(60, 200),
      data.id,
      colors[i],
      data.user.profile.imageUrl
    );
  });

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize: 17,
    },
  }));

  return (
    <TableContainer component={Paper} sx={AccommodationBookingsStyles.tableContainer}>
      {rows.length > 0 ? (
        <Table stickyHeader sx={AccommodationBookingsStyles.mainTable} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="tableHeadCell">User name</StyledTableCell>
              <StyledTableCell className="tableHeadCell" align="center">
                Start Date
              </StyledTableCell>
              <StyledTableCell className="tableHeadCell" align="center">
                End Date
              </StyledTableCell>
              <StyledTableCell className="tableHeadCell" align="center">
                Total Cost
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id} sx={AccommodationBookingsStyles.tableRow}>
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
              </StyledTableRow>
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
