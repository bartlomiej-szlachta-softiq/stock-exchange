export const mapCompanies = (companiesResponse) => {
  if (!companiesResponse?.datasets) {
    return;
  }
  let data = companiesResponse.datasets.map(ds => ({
    code: ds.dataset_code,
    name: ds.name.replace(' Prices, Dividends, Splits and Trading Volume', ''),
  }))
    .filter(option => !!option.name)
    .filter(option => !option.name.includes('Untitled'));
  data = data.sort((v1, v2) => v1.name.localeCompare(v2.name));
  return data;
};

export const mapPrices = (pricesResponse) => {
  if (!pricesResponse?.dataset_data?.data) {
    return;
  }

  return pricesResponse.dataset_data.data.map(e => ({
    day: e[0],
    value: e[4],
  })).sort((a, b) => a.day.localeCompare(b.day));
};
