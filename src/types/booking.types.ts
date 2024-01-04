export interface BookingFormProps {
  onSubmit: (reservationData: {
    startDate: string;
    endDate: string;
    accommodationId: string;
  }) => Promise<void>;
  data: dataType | undefined;
  disabled?: boolean | undefined;
}
export interface dataType {
  availableDates: string[][];
  accommodationId: string;
}

export interface AvailableDatesResponse {
  data: dataType;
  status: boolean;
}
export interface BookingRoomProps {
  accommodationId: string;
}
