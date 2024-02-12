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
  data: BookType;
}

export interface BookListResponse {
  data: BookType[];
  success: boolean;
  totalCount: number;
}

export interface BookType {
  id: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  status: string;
  accommodationId: string;
  paymentId: string;
  accommodation: {
    title: string;
    thumbnailUrl: string;
    previewImgUrl: string;
    price: number;
  };
}
