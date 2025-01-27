import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import wordCloud from "highcharts/modules/wordcloud.js"

wordCloud(Highcharts);

const Chart = ({ type, options }) => {
  return (
    <HighchartsReact
      containerProps={{}}
      highcharts={Highcharts}
      constructorType={type}
      options={options}
    />
  );
};

export default Chart;
