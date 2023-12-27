export interface BookingFormProps {
  onSubmit: (reservationData: {
    startDate: string;
    endDate: string;
    accommodationId: string;
  }) => void;
  data: dataType | undefined;
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
