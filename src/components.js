class ChartComponent extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {height: window.innerHeight - 150};
    }
  
    createChart() {
      this.chart = echarts.init(ReactDOM.findDOMNode(this));
      const options = this.makeChartOptions();
      this.chart.setOption(options);
    }
  
    makeChartOptions() {
      throw Error("Please implement this function");
    }

    resizeContainer() {
      this.setState({height: window.innerHeight - 120});
    }
  
    componentDidMount() {
      this.resizeContainer();
      this.createChart();
      window.onresize = () => {
        console.log("Resizing...");
        this.resizeContainer();
        this.chart.resize();
      };
    }
  
    componentWillUnmount() {
      this.chart.dispose();
    }
  
    render() {
      return <div style={{ height: this.state.height, width: "100%" }} />;
    }
}

class OpenContClosePct extends ChartComponent {
    constructor(props, context) {
      super(props, context);
      this.volDistStr = `{"session":["Open Auction","Continuous","Close Auction"],"historical":[0.01305,0.72251,0.26444],"realized":[0.07162666,0.592729,0.3356444],"price":[90.71,89.76831,90.13]}`;
      this.volDist = JSON.parse(this.volDistStr);
    }

    makeChartOptions() {
        const style = "display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px";
        const colorSpan = color => `<span style="${style};background-color:${color}"></span>`;

        return {
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

const Homepage = () => {
  return (
    <div>This is the homepage</div>
  );
}