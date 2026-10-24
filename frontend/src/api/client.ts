import { ApiResponse } from '../types/api';

const DEFAULT_BASE_URL = 'http://localhost:8000/api/v1';

export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) || DEFAULT_BASE_URL;

export const FORCE_MOCK_DATA =
  import.meta.env.VITE_USE_MOCK_DATA === 'true' ||
  import.meta.env.USE_MOCK_DATA === 'true';

interface RequestOptions extends RequestInit {
  timeoutMs?: number;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { timeoutMs = 4000, ...customConfig } = options;

  // If force mock is enabled, throw immediately to trigger fallback
  if (FORCE_MOCK_DATA) {
    throw new Error('FORCE_MOCK_ENABLED');
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...customConfig.headers,
  };

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...customConfig,
      headers,
      signal: controller.signal,
    });

    clearTimeout(id);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      return {
        success: false,
        data: null as unknown as T,
        error: {
          code: `HTTP_${response.status}`,
          message: errorBody.detail || errorBody.message || `Request failed with status ${response.status}`,
          details: errorBody,
        },
        meta: {
          source: 'live',
          timestamp: new Date().toISOString(),
        },
      };
    }

    const json = await response.json();
    return {
      success: true,
      data: json.data !== undefined ? json.data : json,
      meta: {
        source: 'live',
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error: any) {
    clearTimeout(id);
    throw error;
  }
}
