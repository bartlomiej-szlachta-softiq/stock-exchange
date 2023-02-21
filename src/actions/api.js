const API_KEY = 'fvZMKgnaV85Rr8e8E8yC';
const BASE_URL = 'https://data.nasdaq.com/api/v3/datasets';


const params = new URLSearchParams();
params.append('database_code', 'WIKI');
params.append('api_key', API_KEY);

export const getCompanies = async () => {
  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response?.ok) {
    throw response;
  }

  return await response.json();
};

export const getPriceData = async (code) => {
  const response = await fetch(`${BASE_URL}/WIKI/${code}/data.json?${params.toString()}`);

  if (!response?.ok) {
    throw response;
  }

  return await response.json();
};
