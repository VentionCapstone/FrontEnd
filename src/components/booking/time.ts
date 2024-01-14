// time.ts
import { Dayjs } from 'dayjs';

export const DateFormat = 'YYYY-MM-DD';

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
    startDate: startDate?.format(DateFormat) || '',
    endDate: endDate?.format(DateFormat) || '',
    accommodationId: accommodationId || '',
  };
};
