const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ktorbackend-elektropoli.up.railway.app/api/v1';

export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

interface ApiOptions extends RequestInit {
  isFormData?: boolean;
}

async function fetchWithAuth(endpoint: string, options: ApiOptions = {}) {
  const headers = new Headers(options.headers);
  const token = getToken();

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!options.isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Remove isFormData from the options passed to fetch
  const { isFormData, ...fetchOptions } = options;

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    // Handle 401 Unauthorized globally
    if (response.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
      window.location.href = '/login';
      return null;
    }

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.error('API Fetch Error:', error);
    return {
      status: 500,
      data: {
        success: false,
        message: 'Gagal terhubung ke server. Periksa koneksi internet Anda.',
      },
    };
  }
}

export async function apiGet(endpoint: string, options?: RequestInit) {
  return fetchWithAuth(endpoint, { ...options, method: 'GET' });
}

export async function apiPost(endpoint: string, body: any, isFormData: boolean = false, options?: RequestInit) {
  return fetchWithAuth(endpoint, {
    ...options,
    method: 'POST',
    body: isFormData ? body : JSON.stringify(body),
    isFormData,
  });
}

export async function apiPut(endpoint: string, body: any, isFormData: boolean = false, options?: RequestInit) {
  return fetchWithAuth(endpoint, {
    ...options,
    method: 'PUT',
    body: isFormData ? body : JSON.stringify(body),
    isFormData,
  });
}

export async function apiDelete(endpoint: string, options?: RequestInit) {
  return fetchWithAuth(endpoint, { ...options, method: 'DELETE' });
}
