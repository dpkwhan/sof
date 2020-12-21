'use strict';

const useState = React.useState;
const { Menu } = antd;
const { SubMenu } = Menu;

const { MenuOutlined, AppstoreOutlined, MailOutlined, SettingOutlined } = icons;

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

$("#content").height(window.innerHeight-120);
const myChart = echarts.init(document.getElementById('content'));
window.onresize = () => myChart.resize();

const SofMenu = () => {
    const [visible, setVisible] = useState(false);
    const [openKeys, setOpenKeys] = useState(['sub1']);

    const showDrawer = () => {
      setVisible(true);
    };

    const onClose = () => {
      setVisible(false);
    };

    const onOpenChange = keys => {
      const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
    };

    const handleOption1Click = () => {
      const option = {
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

      myChart.clear();
      myChart.setOption(option);
      setVisible(false);
    };

    const handleOption2Click = () => {
      const option = {
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
          data: ['Evaporation', 'Precipitation', 'Average Temperature']
        },
        xAxis: [
          {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Water',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: 'Temperature',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: 'Evaporation',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name: 'Precipitation',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          },
          {
            name: 'Average Temperature',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          },
        ]
      };

      myChart.clear();
      myChart.setOption(option);
      setVisible(false);
    };

    const handleOptionBackup= () => {
      console.log("Option 2 is clicked!!!");
      const contentContainer = document.querySelector('#content');
      ReactDOM.render(<div>Option 2</div>, contentContainer);
    };

    return (
      <div>
        <antd.Affix style={{ position: 'absolute', top: 20, right: 20 }}>
          <antd.Button type="primary" onClick={() => showDrawer()}>
            <MenuOutlined />
          </antd.Button>
        </antd.Affix>

        <antd.Drawer
          title="Table of Contents"
          placement="right"
          closable={false}
          onClose={() => onClose()}
          visible={visible}
          key="right"
          width={280}
        >
          <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{ width: 256 }}>
            <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
              <Menu.Item key="1" onClick={() => handleOption1Click()}>Option 1</Menu.Item>
              <Menu.Item key="2" onClick={() => handleOption2Click()}>Option 2</Menu.Item>
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </Menu>
        </antd.Drawer>
      </div>
    );
};

const domContainer = document.querySelector('#sof_menu');
ReactDOM.render(<SofMenu />, domContainer);
