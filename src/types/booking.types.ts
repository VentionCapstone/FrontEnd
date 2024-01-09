export interface DataType {
  availableDates: string[][];
  accommodationId: string;
}

export interface AvailableDatesResponse {
  data: DataType;
  status: boolean;
}
