'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _antd = antd,
    Layout = _antd.Layout,
    Menu = _antd.Menu,
    Breadcrumb = _antd.Breadcrumb;
var Header = Layout.Header,
    Content = Layout.Content,
    Footer = Layout.Footer,
    Sider = Layout.Sider;
var SubMenu = Menu.SubMenu;
var _icons = icons,
    MenuOutlined = _icons.MenuOutlined,
    AppstoreOutlined = _icons.AppstoreOutlined,
    BarChartOutlined = _icons.BarChartOutlined,
    AreaChartOutlined = _icons.AreaChartOutlined,
    PieChartOutlined = _icons.PieChartOutlined,
    DesktopOutlined = _icons.DesktopOutlined,
    UserOutlined = _icons.UserOutlined,
    TeamOutlined = _icons.TeamOutlined,
    FileOutlined = _icons.FileOutlined;


var rootSubmenuKeys = ['sub1', 'sub2'];

var Todo1 = React.createElement(
  'div',
  null,
  'Todo 1'
);
var Todo2 = React.createElement(
  'div',
  null,
  'Todo 2'
);
var Todo3 = React.createElement(
  'div',
  null,
  'Todo 3'
);
var Todo4 = React.createElement(
  'div',
  null,
  'Todo 4'
);

var menu = {
  MarketVolume: {
    OpenAndClose: { title: "Open and Close", component: React.createElement(OpenContCloseVolDist, null) },
    ContProfile: { title: "Continous Profile", component: React.createElement(ContinuousVolProfile, null) },
    NYSENational: { title: "NYSE National", component: Todo3 },
    MarketVolume: { title: "Market Volume", component: Todo4 },
    OddLot: { title: "Odd-Lot Volume", component: Todo1 }
  },
  DarkLiquidity: {
    ATSVolume: { title: "ATS Volume", component: Todo2 },
    NonATSVolume: { title: "Non-ATS Volume", component: Todo3 },
    BlockVolume: { title: "Block Volume", component: Todo4 }
  }
};

var i = 1;
Object.entries(menu).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      name = _ref2[0],
      submenu = _ref2[1];

  Object.entries(submenu).forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        name = _ref4[0],
        item = _ref4[1];

    item.key = "" + i;
    i++;
  });
});

var getComponent = function getComponent(nameSelected) {
  var component = null;
  Object.entries(menu).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        name = _ref6[0],
        submenu = _ref6[1];

    Object.entries(submenu).map(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          subname = _ref8[0],
          item = _ref8[1];

      if (subname === nameSelected) {
        component = item.component;
      }
    });
  });
  return component;
};

var SofMenu = function SofMenu() {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      collapsed = _useState2[0],
      setCollapsed = _useState2[1];

  var _useState3 = useState(['sub1']),
      _useState4 = _slicedToArray(_useState3, 2),
      openKeys = _useState4[0],
      setOpenKeys = _useState4[1];

  var _useState5 = useState("ContProfile"),
      _useState6 = _slicedToArray(_useState5, 2),
      compName = _useState6[0],
      setCompName = _useState6[1];

  var minHeight = useRecoilValue(heightState);
  var setMinHeight = useSetRecoilState(heightState);

  var onCollapse = function onCollapse(collapsed) {
    setCollapsed(collapsed);
  };

  var onOpenChange = function onOpenChange(keys) {
    var latestOpenKey = keys.find(function (key) {
      return openKeys.indexOf(key) === -1;
    });
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  var handleMenuItemClick = function handleMenuItemClick(name) {
    return setCompName(name);
  };

  window.onresize = function () {
    setMinHeight(window.innerHeight - globalHeightOffset);
  };

  var mv = menu.MarketVolume;
  var dl = menu.DarkLiquidity;

  var component = getComponent(compName);

  return React.createElement(
    Layout,
    { style: { minHeight: minHeight } },
    React.createElement(
      Content,
      { style: { margin: 16 } },
      React.createElement(
        'div',
        { style: { minHeight: minHeight, background: "white", paddingTop: globalChartOffset } },
        component
      )
    ),
    React.createElement(
      Sider,
      { collapsible: true, collapsed: collapsed, onCollapse: onCollapse, reverseArrow: true },
      React.createElement(
        Header,
        null,
        'Table of Contents'
      ),
      React.createElement(
        Menu,
        { theme: 'dark', defaultSelectedKeys: ['1'], mode: 'inline', openKeys: openKeys, onOpenChange: onOpenChange },
        React.createElement(
          SubMenu,
          { key: 'sub1', icon: React.createElement(UserOutlined, null), title: 'Volume Stats' },
          Object.entries(mv).map(function (_ref9) {
            var _ref10 = _slicedToArray(_ref9, 2),
                name = _ref10[0],
                item = _ref10[1];

            return React.createElement(
              Menu.Item,
              { key: item.key, onClick: function onClick() {
                  return handleMenuItemClick(name);
                } },
              React.createElement(
                'span',
                null,
                item.title
              )
            );
          })
        ),
        React.createElement(
          SubMenu,
          { key: 'sub2', icon: React.createElement(TeamOutlined, null), title: 'Team' },
          Object.entries(dl).map(function (_ref11) {
            var _ref12 = _slicedToArray(_ref11, 2),
                name = _ref12[0],
                item = _ref12[1];

            return React.createElement(
              Menu.Item,
              { key: item.key, onClick: function onClick() {
                  return handleMenuItemClick(name);
                } },
              React.createElement(
                'span',
                null,
                item.title
              )
            );
          })
        )
      )
    )
  );
};

var domContainer = document.querySelector('#sof_menu');
ReactDOM.render(React.createElement(
  RecoilRoot,
  null,
  React.createElement(SofMenu, null)
), domContainer);