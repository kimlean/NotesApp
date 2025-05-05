import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const fetchApi = async <T = any>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
  const { params, ...fetchOptions } = options;

  // Add query parameters
  let url = `${API_URL}${endpoint}`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }

  // Set default headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  // Add authentication token
  const token = Cookies.get('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Merge options
  const requestOptions: RequestInit = {
    ...fetchOptions,
    headers,
  };

  // Make the request
  const response = await fetch(url, requestOptions);

  // Handle non-JSON responses
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');

  let data;
  if (isJson) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  // Handle errors
  if (!response.ok) {
    if (response.status === 401) {
      Cookies.remove('token');
      window.location.href = '/login';
    }
    throw new ApiError(response.status, data?.message || 'An error occurred');
  }

  return data;
};

// Helper methods
const api = {
  get: <T = any>(endpoint: string, options?: FetchOptions) => 
    fetchApi<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = any>(endpoint: string, body: any, options?: FetchOptions) => 
    fetchApi<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

  put: <T = any>(endpoint: string, body: any, options?: FetchOptions) => 
    fetchApi<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

  delete: <T = any>(endpoint: string, options?: FetchOptions) => 
    fetchApi<T>(endpoint, { ...options, method: 'DELETE' }),
};

export default api;