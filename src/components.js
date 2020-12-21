class ChartComponent extends React.Component {
    constructor(props, context) {
      super(props, context);
    }
  
    createChart() {
      this.chart = echarts.init(ReactDOM.findDOMNode(this));
      const options = this.makeChartOptions();
      this.chart.setOption(options);
    }
  
    makeChartOptions() {
      return {
        title: {
          text: 'ECharts entry example'
        },
        tooltip: {},
        legend: {
          data: ['Sales']
        },
        xAxis: {
          data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
        },
        yAxis: {},
        series: [{
          name: 'Sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      };
    }
  
    componentDidMount() {
      this.createChart();
      window.onresize = () => {
        this.chart.resize();
      };
    }
  
    componentWillUnmount() {
      this.chart.dispose();
    }
  
    render() {
      const height = window.innerHeight - 120;
      return <div style={{ height, width: "100%" }} />;
    }
}

class OpenContClosePct extends ChartComponent {
    constructor(props, context) {
      super(props, context);
      this.volDistStr = `{"session":["Open Auction","Continuous","Close Auction"],"historical":[0.01305,0.72251,0.26444],"realized":[0.07162666,0.592729,0.3356444],"price":[90.71,89.76831,90.13]}`;
      this.volDist = JSON.parse(this.volDistStr);
    }

    makeChartOptions() {
        return {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            legend: {
              data: ['Historical', 'Realized', 'Avg. Price']
            },
            xAxis: [
              {
                type: 'category',
                data: this.volDist.session,
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
                data: this.volDist.historical,
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
                data: this.volDist.realized,
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
                data: this.volDist.price
              },
            ]
        };
    }
}
