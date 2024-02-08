import { ReactNode } from 'react';

export type ErrorResponse = {
  success: boolean;
  error: Error;
};

export type Error = {
  message: string;
  error: string;
  statusCode: number;
};

export interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
