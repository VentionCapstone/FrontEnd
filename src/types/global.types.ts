export type Coordinates = [number, number];

export enum Status {
  pending = 'PENDING',
  upcoming = 'UPCOMING',
  active = 'ACTIVE',
  completed = 'COMPLETED',
}

export enum AccommodationSteps {
  accommodationForm = 1,
  media,
  amenities,
}
