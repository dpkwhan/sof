'use strict';

const { Layout, Menu, Breadcrumb } = antd;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const { MenuOutlined, AppstoreOutlined, BarChartOutlined, AreaChartOutlined, PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } = icons;

const rootSubmenuKeys = ['sub1', 'sub2'];

const Todo1 = <div>Todo 1</div>;
const Todo2 = <div>Todo 2</div>;
const Todo3 = <div>Todo 3</div>;
const Todo4 = <div>Todo 4</div>;

const menu = {
  MarketVolume: {
    MarketShare: { title: "Open and Close", component: <OpenContCloseVolDist /> },
    NYSETapeC: { title: "NYSE Tape C", component: Todo2 },
    NYSENational: { title: "NYSE National", component: Todo3 },
    MarketVolume: { title: "Market Volume", component: Todo4 },
    OddLot: { title: "Odd-Lot Volume", component: Todo1 },
  },
  DarkLiquidity: {
    ATSVolume: { title: "ATS Volume", component: Todo2 },
    NonATSVolume: {title: "Non-ATS Volume", component: Todo3 },
    BlockVolume: { title: "Block Volume", component: Todo4 },
  },
};

let i = 1;
Object.entries(menu).forEach(([name, submenu]) => {
  Object.entries(submenu).forEach(([name, item]) => {
    item.key = "" + i;
    i++;
  });
});

const SofMenu = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const [component, setComponent] = useState(Todo1);
    const minHeight = useRecoilValue(heightState);
    const setMinHeight = useSetRecoilState(heightState);

    const onCollapse = collapsed => {
      setCollapsed(collapsed);
    };

    const onOpenChange = keys => {
      const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
    };

    const handleMenuItemClick = selectedStatName => {
      Object.entries(menu).map(([name, submenu]) => {
        return Object.entries(submenu).map(([subname, item]) => {
          if (subname === selectedStatName) {
            setComponent(item.component);
          }
        });
      });
    }

    window.onresize = () => {
      setMinHeight(window.innerHeight - globalHeightOffset);
    };

    const mv = menu.MarketVolume;
    const dl = menu.DarkLiquidity;

    return (
      <Layout style={{ minHeight }}>
        <Content style={{ margin: 16 }}>
          <div style={{ minHeight, background: "white", paddingTop: globalChartOffset}}>
            {component}
          </div>
        </Content>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} reverseArrow>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" openKeys={openKeys} onOpenChange={onOpenChange}>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Volume Stats">
              {Object.entries(mv).map(([name, item]) => (
                  <Menu.Item key={item.key} onClick={() => handleMenuItemClick(name)}>
                    <span>{item.title}</span>
                  </Menu.Item>
                ))}
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              {Object.entries(dl).map(([name, item]) => (
                  <Menu.Item key={item.key} onClick={() => handleMenuItemClick(name)}>
                    <span>{item.title}</span>
                  </Menu.Item>
                ))}
            </SubMenu>
          </Menu>
        </Sider>
      </Layout>
    );
};

const domContainer = document.querySelector('#sof_menu');
ReactDOM.render(<RecoilRoot><SofMenu /></RecoilRoot>, domContainer);
