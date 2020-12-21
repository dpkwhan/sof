'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var useState = React.useState;
var _antd = antd,
    Menu = _antd.Menu;
var SubMenu = Menu.SubMenu;
var _icons = icons,
    MenuOutlined = _icons.MenuOutlined,
    AppstoreOutlined = _icons.AppstoreOutlined,
    MailOutlined = _icons.MailOutlined,
    SettingOutlined = _icons.SettingOutlined;


var rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

var handleOpenAndCloseClick = function handleOpenAndCloseClick() {
  var contentContainer = document.querySelector('#content');
  ReactDOM.render(React.createElement(OpenContClosePct, null), contentContainer);
};

var handleOrderInfoClick = function handleOrderInfoClick() {
  console.log("Default page");
  var contentContainer = document.querySelector('#content');
  ReactDOM.render(React.createElement(
    'div',
    null,
    'Order Information:'
  ), contentContainer);
};

var handleOption1Click = function handleOption1Click() {
  console.log("Option 1 was clicked...");
  var contentContainer = document.querySelector('#content');
  ReactDOM.render(React.createElement(ChartComponent, null), contentContainer);
};

var SofMenu = function SofMenu() {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = useState(['sub1']),
      _useState4 = _slicedToArray(_useState3, 2),
      openKeys = _useState4[0],
      setOpenKeys = _useState4[1];

  var showDrawer = function showDrawer() {
    setVisible(true);
  };

  var _onClose = function _onClose() {
    setVisible(false);
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

  var handleOptionBackup = function handleOptionBackup() {
    console.log("Option 2 is clicked!!!");
    var contentContainer = document.querySelector('#content');
    ReactDOM.render(React.createElement(
      'div',
      null,
      'Option 2'
    ), contentContainer);
  };

  // Execute this only once
  // handleOrderInfoClick();

  return React.createElement(
    'div',
    null,
    React.createElement(
      antd.Affix,
      { style: { position: 'absolute', top: 20, right: 20 } },
      React.createElement(
        antd.Button,
        { type: 'primary', onClick: function onClick() {
            return showDrawer();
          } },
        React.createElement(MenuOutlined, null)
      )
    ),
    React.createElement(
      antd.Drawer,
      {
        title: 'Table of Contents',
        placement: 'right',
        closable: false,
        onClose: function onClose() {
          return _onClose();
        },
        visible: visible,
        key: 'right',
        width: 280
      },
      React.createElement(
        Menu,
        { mode: 'inline', openKeys: openKeys, onOpenChange: onOpenChange, style: { width: 256 } },
        React.createElement(
          Menu.Item,
          { key: '0', onClick: function onClick() {
              handleOrderInfoClick();setVisible(false);
            } },
          'Order Info'
        ),
        React.createElement(
          SubMenu,
          { key: 'sub1', icon: React.createElement(MailOutlined, null), title: 'Volume Stats' },
          React.createElement(
            Menu.Item,
            { key: '1', onClick: function onClick() {
                handleOption1Click();setVisible(false);
              } },
            'Option 1'
          ),
          React.createElement(
            Menu.Item,
            { key: '2', onClick: function onClick() {
                handleOpenAndCloseClick();setVisible(false);
              } },
            'Open and Close'
          ),
          React.createElement(
            Menu.Item,
            { key: '3' },
            'Option 3'
          ),
          React.createElement(
            Menu.Item,
            { key: '4' },
            'Option 4'
          )
        ),
        React.createElement(
          SubMenu,
          { key: 'sub2', icon: React.createElement(AppstoreOutlined, null), title: 'Navigation Two' },
          React.createElement(
            Menu.Item,
            { key: '5' },
            'Option 5'
          ),
          React.createElement(
            Menu.Item,
            { key: '6' },
            'Option 6'
          ),
          React.createElement(
            SubMenu,
            { key: 'sub3', title: 'Submenu' },
            React.createElement(
              Menu.Item,
              { key: '7' },
              'Option 7'
            ),
            React.createElement(
              Menu.Item,
              { key: '8' },
              'Option 8'
            )
          )
        ),
        React.createElement(
          SubMenu,
          { key: 'sub4', icon: React.createElement(SettingOutlined, null), title: 'Navigation Three' },
          React.createElement(
            Menu.Item,
            { key: '9' },
            'Option 9'
          ),
          React.createElement(
            Menu.Item,
            { key: '10' },
            'Option 10'
          ),
          React.createElement(
            Menu.Item,
            { key: '11' },
            'Option 11'
          ),
          React.createElement(
            Menu.Item,
            { key: '12' },
            'Option 12'
          )
        )
      )
    )
  );
};

var domContainer = document.querySelector('#sof_menu');
ReactDOM.render(React.createElement(SofMenu, null), domContainer);