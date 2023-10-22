const API = process.env.NEXT_PUBLIC_API_URL;

export interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  userData: {
    name: string | null;
    email: string;
    role: 'user' | 'driver';
  };
  token: string;
}

interface RegisterParams {
  email: string;
  password: string;
  role: 'user' | 'driver';
}

export const login = async ({
  email,
  password,
}: LoginParams): Promise<LoginResponse> => {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  return {
    userData: data,
    token: res.headers.get('Authorization') || '',
  };
};

export const register = async ({
  email,
  password,
  role,
}: RegisterParams): Promise<null> => {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return null;
};
