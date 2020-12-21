var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartComponent = function (_React$Component) {
  _inherits(ChartComponent, _React$Component);

  function ChartComponent(props, context) {
    _classCallCheck(this, ChartComponent);

    return _possibleConstructorReturn(this, (ChartComponent.__proto__ || Object.getPrototypeOf(ChartComponent)).call(this, props, context));
  }

  _createClass(ChartComponent, [{
    key: 'createChart',
    value: function createChart() {
      this.chart = echarts.init(ReactDOM.findDOMNode(this));
      var options = this.makeChartOptions();
      this.chart.setOption(options);
    }
  }, {
    key: 'makeChartOptions',
    value: function makeChartOptions() {
      return {
        title: {
          text: 'ECharts entry example'
        },
        tooltip: {},
        legend: {
          data: ['Sales']
        },
        xAxis: {
          data: ["shirt", "cardign", "chiffon shirt", "pants", "heels", "socks"]
        },
        yAxis: {},
        series: [{
          name: 'Sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.createChart();
      window.onresize = function () {
        _this2.chart.resize();
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.chart.dispose();
    }
  }, {
    key: 'render',
    value: function render() {
      var height = window.innerHeight - 120;
      return React.createElement('div', { style: { height: height, width: "100%" } });
    }
  }]);

  return ChartComponent;
}(React.Component);

var OpenContClosePct = function (_ChartComponent) {
  _inherits(OpenContClosePct, _ChartComponent);

  function OpenContClosePct(props, context) {
    _classCallCheck(this, OpenContClosePct);

    var _this3 = _possibleConstructorReturn(this, (OpenContClosePct.__proto__ || Object.getPrototypeOf(OpenContClosePct)).call(this, props, context));

    _this3.volDistStr = '{"session":["Open Auction","Continuous","Close Auction"],"historical":[0.01305,0.72251,0.26444],"realized":[0.07162666,0.592729,0.3356444],"price":[90.71,89.76831,90.13]}';
    _this3.volDist = JSON.parse(_this3.volDistStr);
    return _this3;
  }

  _createClass(OpenContClosePct, [{
    key: 'makeChartOptions',
    value: function makeChartOptions() {
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
        xAxis: [{
          type: 'category',
          data: this.volDist.session,
          axisPointer: {
            type: 'shadow'
          }
        }],
        yAxis: [{
          type: 'value',
          name: 'Volume (%)',
          min: 0,
          max: 'dataMax',
          axisLabel: {
            formatter: function formatter(value) {
              return numeral(value).format('0.%');
            }
          }
        }, {
          type: 'value',
          name: 'Price',
          min: 'dataMin',
          max: 'dataMax',
          axisLabel: {
            formatter: function formatter(value) {
              return value > 1 ? numeral(value).format('0.00') : numeral(value).format('0.0000');
            }
          }
        }],
        series: [{
          name: 'Historical',
          type: 'bar',
          data: this.volDist.historical,
          label: {
            show: true,
            position: 'top',
            formatter: function formatter(d) {
              return numeral(d.data).format('0.0%');
            }
          }
        }, {
          name: 'Realized',
          type: 'bar',
          data: this.volDist.realized,
          label: {
            show: true,
            position: 'top',
            formatter: function formatter(d) {
              return numeral(d.data).format('0.0%');
            }
          }
        }, {
          name: 'Avg. Price',
          type: 'line',
          yAxisIndex: 1,
          data: this.volDist.price
        }]
      };
    }
  }]);

  return OpenContClosePct;
}(ChartComponent);