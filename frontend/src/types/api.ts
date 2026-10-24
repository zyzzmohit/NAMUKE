export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: ApiError;
  meta?: {
    source: 'live' | 'mock' | 'cached';
    timestamp: string;
  };
}

export type DataSourceType = 'live' | 'mock' | 'cached';
