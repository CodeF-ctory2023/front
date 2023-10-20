import { ReactNode } from 'react';

export interface InputProps {
  inputType: string;
  inputValue: string | number;
  inputPlaceholder: string;
  inputDisabled: boolean;
  inputOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputIcon: ReactNode;
}

export interface UserLocation {
  locationCoords: number[];
  locationName: string;
  showMarker: boolean;
  activeLocation: boolean;
  circleRadius: number;
  showCircle: boolean;
  locationError: boolean;
}

export interface DestinationLocation {
  destinationCoords: number[];
  destinationName: string;
  destinationError: boolean;
}
