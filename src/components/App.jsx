import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';
import { getCompanies, getPriceData } from '../actions/api.js';
import { mapCompanies, mapPrices } from '../utils/dataMapper.js';
import StockPriceChart from './StockPriceChart.jsx';
import '/src/styles/App.css';
import { ProgressBar } from 'primereact/progressbar';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [companiesOptions, setCompaniesOptions] = useState([]);
  const [chosenCompanyCode, setChosenCompanyCode] = useState(null);
  const [stockPriceData, setStockPriceData] = useState([]);

  const loadCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompaniesOptions(mapCompanies(data));
      setError(false);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  const onChooseCompany = async (e) => {
    const chosenCode = e.target.value;
    setChosenCompanyCode(chosenCode);

    if (!chosenCode) {
      return;
    }

    setLoading(true);
    try {
      const priceData = await getPriceData(chosenCode);
      setStockPriceData(mapPrices(priceData));
      setError(false);
    } catch (e) {
      setError(true);
      setChosenCompanyCode(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <div className="p-grid p-fluid App">
      <header>
        <h1>
          Stock exchange
        </h1>

        <Dropdown
          options={companiesOptions}
          value={chosenCompanyCode}
          optionLabel="name"
          optionValue="code"
          onChange={onChooseCompany}
          placeholder="Select a company"
          filter
          showClear
        />
      </header>

      <div className="p-col-12 loading-animation">
        {isLoading ?
          (
            <ProgressBar
              mode="indeterminate"
              style={{ height: '5px' }}
            />
          ) :
          (
            <div style={{ height: '5px' }} />
          )}
      </div>

      <div className="p-col-12">
        {isError && (
          <Message severity="error" text="An error occurred" />
        )}
      </div>

      <div className="p-col-12">
        {chosenCompanyCode && !isError && (
          <StockPriceChart
            data={stockPriceData}
            isLoading={isLoading}
            companyCode={chosenCompanyCode}
          />
        )}
      </div>

    </div>
  );
};

export default App;
