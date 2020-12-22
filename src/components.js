const { useState, useEffect, useRef } = React;
const { RecoilRoot, useRecoilValue, useSetRecoilState } = Recoil;

const globalHeightOffset = 150;
const globalChartOffset = 48;

const heightState = Recoil.atom({
  key: 'heightState',
  default: window.innerHeight - globalHeightOffset,
});

const Homepage = () => {
  return (
    <div>This is the homepage</div>
  );
}

const useECharts = (chartRef, options, height) => {
  let chart = null;
 
  const renderChart = () => {
    const renderedInstance = echarts.getInstanceByDom(chartRef.current)
    if (renderedInstance) {
      chart = renderedInstance
    } else {
      chart = echarts.init(chartRef.current)
    }
    chart.setOption(options);
    chart.resize();
  };
  
  useEffect(() => {
    renderChart()
  }, [options, height]);
 
  useEffect(() => {
    return () => chart && chart.dispose();
  }, []);

  return;
}

const colorSpan = color => {
  const style = "display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px";
  return `<span style="${style};background-color:${color}"></span>`;
};

const OpenContCloseVolDist = () => {
  const chartRef = useRef(null);
  const height = useRecoilValue(heightState);
  
  const volDistStr = `{"session":["Open Auction","Continuous","Close Auction"],"historical":[0.01305,0.72251,0.26444],"realized":[0.07162666,0.592729,0.3356444],"price":[90.71,89.76831,90.13]}`;
  const volDist = JSON.parse(volDistStr);

  const options = {
    title: {
      text: "Volume Distribution and Average Price",
      left: 'center',
      padding: [0, 5],
    },
    tooltip: {
      show: false,
      trigger: "axis",
      axisPointer: {
        animation: true,
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      },
      formatter: function(params) {
        let rez = `<p style="text-align:left"><b>${params[0].axisValue}</b></p>`;
        rez += "<table>";
        params.forEach(item => {
          const colorEle = colorSpan(item.color);
          let fmt = "0.0%";
          if (item.seriesName === "Avg. Price") {
            fmt = item.data < 1 ? "0.0000": "0.00";
          }
          const pct = numeral(item.data).format(fmt);
          const xx = `<tr><td style="text-align:left">${colorEle} ${item.seriesName}</td><td style="text-align:right;padding-left:5px">${pct}</td></tr>`;
          rez += xx;
        });
        rez += "</table>";
        return rez;
      }
    },
    legend: {
      data: ['Historical', 'Realized', 'Avg. Price'],
      bottom: 0,
      left: "center",
    },
    xAxis: [
      {
        type: 'category',
        data: volDist.session,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Volume (%)',
        min: 0,
        max: 'dataMax',
        axisLabel: {
          formatter: (value) => {
            return numeral(value).format('0.%');
          }
        }
      },
      {
        type: 'value',
        name: 'Price',
        min: 'dataMin',
        max: 'dataMax',
        axisLabel: {
          formatter: (value) => {
            return value > 1 ? numeral(value).format('0.00') : numeral(value).format('0.0000');
          }
        }
      }
    ],
    series: [
      {
        name: 'Historical',
        type: 'bar',
        data: volDist.historical,
        label: {
          show: true,
          position: 'top',
          formatter: function(d) {
            return numeral(d.data).format('0.0%');
          }
        },
      },
      {
        name: 'Realized',
        type: 'bar',
        data: volDist.realized,
        label: {
          show: true,
          position: 'top',
          formatter: function(d) {
            return numeral(d.data).format('0.0%');
          }
        },
      },
      {
        name: 'Avg. Price',
        type: 'line',
        yAxisIndex: 1,
        data: volDist.price
      },
    ]
  };

  useECharts(chartRef, options, height);

  return (
    <div style={{width: "100%", height: height - globalChartOffset*2 }} ref={chartRef} />
  );
};