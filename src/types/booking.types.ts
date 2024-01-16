export interface DataType {
  availableDates: string[][];
  accommodationId: string;
}

export interface AvailableDatesResponse {
  data: DataType;
  status: boolean;
}

export interface BookResponse {
  success: boolean;
  data: { id: string; startDate: string; endDate: string; status: string };
}
