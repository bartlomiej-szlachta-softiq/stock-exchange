import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

const StockPriceChart = (props) => {
  const [currentCode, setCurrentCode] = useState(props.companyCode);

  useEffect(() => {
    if (!props.isLoading && props.companyCode !== currentCode) {
      setCurrentCode(props.companyCode);
    }
  }, [props.companyCode, props.isLoading]);

  const data = props.data
    .map(el => ({
      value: el.value,
      day: Number(Date.parse(el.day).toString()),
    }))
    .map(el => [el.day, el.value]);

  return (
    <div className="card">
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: {
            text: `Stock price history (${currentCode})`,
          },
          xAxis: {
            type: 'datetime',
          },
          yAxis: {
            title: false,
          },
          series: {
            data,
            lineWidth: 0.5,
            name: currentCode,
          },
          legend: {
            enabled: false,
          },
          accessibility: {
            enabled: false,
          },
        }}
      />
    </div>
  );
};

export default StockPriceChart;
