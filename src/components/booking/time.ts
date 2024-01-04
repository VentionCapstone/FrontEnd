// time.ts
import { Dayjs } from 'dayjs';

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
    startDate: startDate?.format('YYYY-MM-DD') || '',
    endDate: endDate?.format('YYYY-MM-DD') || '',
    accommodationId: accommodationId || '',
  };
};
