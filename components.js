var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect,
    useRef = _React.useRef;
var _Recoil = Recoil,
    RecoilRoot = _Recoil.RecoilRoot,
    useRecoilValue = _Recoil.useRecoilValue,
    useSetRecoilState = _Recoil.useSetRecoilState;


var globalHeightOffset = 150;
var globalChartOffset = 48;

var heightState = Recoil.atom({
  key: 'heightState',
  default: window.innerHeight - globalHeightOffset
});

var Homepage = function Homepage() {
  return React.createElement(
    "div",
    null,
    "This is the homepage"
  );
};

var useECharts = function useECharts(chartRef, options, height) {
  var chart = null;

  var renderChart = function renderChart() {
    var renderedInstance = echarts.getInstanceByDom(chartRef.current);
    if (renderedInstance) {
      chart = renderedInstance;
    } else {
      chart = echarts.init(chartRef.current);
    }
    chart.setOption(options);
    chart.resize();
  };

  useEffect(function () {
    renderChart();
  }, [options, height]);

  useEffect(function () {
    return function () {
      return chart && chart.dispose();
    };
  }, []);
};

var colorSpan = function colorSpan(color) {
  var style = "display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px";
  return "<span style=\"" + style + ";background-color:" + color + "\"></span>";
};

var OpenContCloseVolDist = function OpenContCloseVolDist() {
  var chartRef = useRef(null);
  var height = useRecoilValue(heightState);

  var volDistStr = "{\"session\":[\"Open Auction\",\"Continuous\",\"Close Auction\"],\"historical\":[0.01305,0.72251,0.26444],\"realized\":[0.07162666,0.592729,0.3356444],\"price\":[90.71,89.76831,90.13]}";
  var volDist = JSON.parse(volDistStr);

  var options = {
    title: {
      text: "Volume Distribution and Average Price",
      left: 'center',
      padding: [0, 5]
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
      formatter: function formatter(params) {
        var rez = "<p style=\"text-align:left\"><b>" + params[0].axisValue + "</b></p>";
        rez += "<table>";
        params.forEach(function (item) {
          var colorEle = colorSpan(item.color);
          var fmt = "0.0%";
          if (item.seriesName === "Avg. Price") {
            fmt = item.data < 1 ? "0.0000" : "0.00";
          }
          var pct = numeral(item.data).format(fmt);
          var xx = "<tr><td style=\"text-align:left\">" + colorEle + " " + item.seriesName + "</td><td style=\"text-align:right;padding-left:5px\">" + pct + "</td></tr>";
          rez += xx;
        });
        rez += "</table>";
        return rez;
      }
    },
    legend: {
      data: ['Historical', 'Realized', 'Avg. Price'],
      bottom: 0,
      left: "center"
    },
    xAxis: [{
      type: 'category',
      data: volDist.session,
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
      data: volDist.historical,
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
      data: volDist.realized,
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
      data: volDist.price
    }]
  };

  useECharts(chartRef, options, height);

  return React.createElement("div", { style: { width: "100%", height: height - globalChartOffset * 2 }, ref: chartRef });
};