'use strict';

const useState = React.useState;
const { Menu } = antd;
const { SubMenu } = Menu;

const { MenuOutlined, AppstoreOutlined, BarChartOutlined, AreaChartOutlined } = icons;

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const handleOpenAndCloseClick = () => {
  const contentContainer = document.querySelector('#content');
  ReactDOM.render(<OpenContClosePct />, contentContainer);
};

const handleOrderInfoClick = () => {
  const contentContainer = document.querySelector('#content');
  ReactDOM.render(<OpenContClosePct />, contentContainer);
  // ReactDOM.render(<Homepage />, contentContainer);
};

const handleOption1Click = () => {
  const contentContainer = document.querySelector('#content');
  ReactDOM.render(<ChartComponent />, contentContainer);
};

const SofMenu = () => {
    const [visible, setVisible] = useState(false);
    const [openKeys, setOpenKeys] = useState(['sub1']);

    React.useEffect(() => {
      handleOrderInfoClick();
    }, []);

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

    const handleOptionBackup= () => {
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
            <Menu.Item key="0" onClick={() => {handleOrderInfoClick(); setVisible(false)}}>Order Info</Menu.Item>
            <SubMenu key="sub1" icon={<BarChartOutlined />} title="Volume Stats">
              <Menu.Item key="1" onClick={() => {handleOption1Click(); setVisible(false)}}>Option 1</Menu.Item>
              <Menu.Item key="2" onClick={() => {handleOpenAndCloseClick(); setVisible(false)}}>Open and Close</Menu.Item>
              <Menu.Item key="3">Continuous Profile</Menu.Item>
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
            <SubMenu key="sub4" icon={<AreaChartOutlined />} title="Navigation Three">
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
