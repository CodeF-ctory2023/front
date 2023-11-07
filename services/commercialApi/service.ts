const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const service = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  },
  post: async (endpoint: string, body: object) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    const error = await response.text();
    throw new Error(error);
  },
  patch: async (endpoint: string, body: object) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    const error = await response.text();
    throw new Error(error);
  },
  delete: async (endpoint: string) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    const error = await response.text();
    throw new Error(error);
  },
};
