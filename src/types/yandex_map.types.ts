import { AddressWatchType, SelectAddress } from './accommodation.types';
import { Coordinates } from './global.types';

export interface SelectedAddress {
  metaDataProperty: MetaDataProperty;
  name: string;
  description: string;
  boundedBy: BoundedBy;
  uri: string;
  Point: Point;
}

export interface MetaDataProperty {
  GeocoderMetaData: GeocoderMetaData;
}

export interface GeocoderMetaData {
  precision: string;
  text: string;
  kind: string;
  Address: Address;
  AddressDetails: AddressDetails;
}

export interface Address {
  country_code: string;
  formatted: string;
  Components: Component[];
}

export interface Component {
  kind: string;
  name: string;
}

export interface AddressDetails {
  Country: Country;
}

export interface Country {
  AddressLine: string;
  CountryNameCode: string;
  CountryName: string;
  AdministrativeArea: AdministrativeArea;
}

export interface AdministrativeArea {
  AdministrativeAreaName: string;
  SubAdministrativeArea: SubAdministrativeArea;
}

export interface SubAdministrativeArea {
  SubAdministrativeAreaName: string;
  Locality: Locality;
}

export interface Locality {
  LocalityName: string;
}

export interface BoundedBy {
  Envelope: Envelope;
}

export interface Envelope {
  lowerCorner: string;
  upperCorner: string;
}

export interface Point {
  pos: string;
}

export interface SuggestionsResponse {
  response: Response;
}

export interface Response {
  GeoObjectCollection: GeoObjectCollection;
}

export interface GeoObjectCollection {
  metaDataProperty: MetaDataProperty;
  featureMember: FeatureMember[];
}

export interface MetaDataProperty {
  GeocoderResponseMetaData: GeocoderResponseMetaData;
}

export interface GeocoderResponseMetaData {
  request: string;
  results: string;
  found: string;
}

export interface FeatureMember {
  GeoObject: GeoObject;
}

export interface GeoObject {
  metaDataProperty: MetaDataProperty2;
  name: string;
  description: string;
  boundedBy: BoundedBy;
  uri: string;
  Point: Point;
}

export interface MetaDataProperty2 {
  GeocoderMetaData: GeocoderMetaData;
}

export interface GeocoderMetaData {
  precision: string;
  text: string;
  kind: string;
  Address: Address;
  AddressDetails: AddressDetails;
}

export interface Address {
  country_code: string;
  formatted: string;
  Components: Component[];
}

export interface Component {
  kind: string;
  name: string;
}

export interface AddressDetails {
  Country: Country;
}

export interface Country {
  AddressLine: string;
  CountryNameCode: string;
  CountryName: string;
  AdministrativeArea: AdministrativeArea;
}

export interface AdministrativeArea {
  AdministrativeAreaName: string;
  Locality: Locality;
}

export interface DependentLocality {
  DependentLocalityName: string;
  Thoroughfare: Thoroughfare;
}

export interface Thoroughfare {
  ThoroughfareName: string;
}

export interface MapViewProps {
  address: GeoObject | null;
  setAddress: (address: GeoObject) => void;
  onCoordsChange: (coords: Coordinates) => void;
  addressWatch: AddressWatchType;
  onAddressChange: (address: SelectAddress) => void;
}

export interface SerachLocationProps {
  address: GeoObject | null;
  setAddress: (address: GeoObject) => void;
  onCoordsChange: (coords: Coordinates) => void;
  onAddressChange: (address: SelectAddress) => void;
  addressWatch: AddressWatchType;
}

export interface SelectLocationProps {
  onCoordsChange: (coords: Coordinates) => void;
  onAddressChange: (address: SelectAddress) => void;
  addressWatch: AddressWatchType;
}

export interface SearchResultsProps {
  items: FeatureMember[];
  onItemClick: (item: GeoObject) => void;
}

export interface MapMouseEvent {
  originalEvent: {
    domEvent: string;
    position: Coordinates;
    target: {
      geometry: {
        getCoordinates: () => Coordinates;
      };
    };
    type: string;
  };
}
