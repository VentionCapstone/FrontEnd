// time.ts
import { DATE_FORMAT_MONTH_FIRST } from '@src/constants';
import { Dayjs } from 'dayjs';

export type selectDatesType = [Dayjs | null, Dayjs | null];
export type selectedDateType = Dayjs | null;
export interface ReservationData {
  startDate: string;
  endDate: string;
  accommodationId: string;
}

export const createReservationData = (
  startDate: Dayjs | null,
  endDate: Dayjs | null,
  accommodationId: string
): ReservationData => {
  return {
    startDate: startDate?.format(DATE_FORMAT_MONTH_FIRST) || '',
    endDate: endDate?.format(DATE_FORMAT_MONTH_FIRST) || '',
    accommodationId: accommodationId || '',
  };
};
