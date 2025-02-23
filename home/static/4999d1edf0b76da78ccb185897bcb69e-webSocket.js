"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
(function () {
  var _window$BlockChainUti = window.BlockChainUtils,
    myStorage = _window$BlockChainUti.myStorage,
    setDefaultMarket = _window$BlockChainUti.setDefaultMarket,
    getCoinShowName = _window$BlockChainUti.getCoinShowName,
    getScript = _window$BlockChainUti.getScript,
    getCookie = _window$BlockChainUti.getCookie;
  var lang = window.location.href.match(/[a-z]+_[A-Z]+/)[0];
  var recommendDataList = {};
  var marketDataObj = [];
  var klineDataList = {};
  var mySymbolList = myStorage.get('mySymbol') || [];
  var symbolList = [];
  var coinTagLangs = {};
  var _window = window,
    emitter = _window.emitter;
  // const marketCurrent = myStorage.get('homeMarkTitle');

  var init = function init() {
    var webSocketSend = function webSocketSend(type, sendType, symbolData) {
      emitter.emit('websocketReceive', {
        type: 'WEBSOCKET_SEND',
        data: {
          type: type,
          sendType: sendType,
          symbolData: symbolData,
          symbolList: symbolList
        }
      });
    };

    // 格式化 推荐位的 K线数据
    var setRecommendData = function setRecommendData(headerSymbol, coinList) {
      if (headerSymbol.length) {
        headerSymbol.forEach(function (item) {
          recommendDataList[item] = {};
          if (marketDataObj && marketDataObj[item]) {
            recommendDataList[item] = JSON.parse(JSON.stringify(marketDataObj[item]));
          }
        });
        window.emitter.emit('RECOMMEEND_DATA', {
          recommendDataList: recommendDataList,
          coinList: coinList,
          coinTagLangs: coinTagLangs
        });
      }
    };

    // 设置币对是否收藏的ICON
    var myMarketIcon = function myMarketIcon(symbol) {
      if (mySymbolList.indexOf(symbol) === -1) {
        return "<svg class=\"icon icon-16\" aria-hidden=\"true\">\n                <use xlink:href=\"#icon-c_11\">\n              </use></svg>";
      }
      return "<svg class=\"icon icon-16\" aria-hidden=\"true\">\n                <use xlink:href=\"#icon-c_11_1\">\n              </use></svg>";
    };
    var getCoinLabel = function getCoinLabel(name) {
      var coinList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (coinList && coinList[name.toUpperCase()]) {
        var _coinList$name$toUppe = coinList[name.toUpperCase()].coinTag,
          coinTag = _coinList$name$toUppe === void 0 ? '' : _coinList$name$toUppe;
        return coinTag ? coinTagLangs[coinTag] : '';
      }
      return '';
    };

    // 24小时行情 涨跌幅 的背景、样色的class
    var itemRoseClass = function itemRoseClass(rose) {
      var bgClass = null;
      if (rose.class === 'rise-1-cl') {
        bgClass = 'rose-label rise-4-bg';
      } else if (rose.class === 'fall-1-cl') {
        bgClass = 'rose-label fall-4-bg';
      }
      return [rose.class, bgClass];
    };

    // 格式化 推荐位的24小时行情数据
    var setMarketData = function setMarketData(coinList, symbolAll, initData) {
      if (!symbolList) return;
      var marketDataList = [];
      var keyarr = Object.keys(symbolList);
      keyarr.forEach(function (item) {
        var itemData = marketDataObj[item];
        if (itemData) {
          var showName = getCoinShowName(itemData.name, symbolAll);
          var coinLabel = getCoinLabel(itemData.symbol.symbol, coinList);
          var iconSvg = "<span>".concat(showName, "</span>");
          if (coinLabel && Number(window.coinTagOpen)) {
            var str = "<div class=\"coin-label\">\n              <span class=\"coin-text main-1-cl\">".concat(coinLabel, "</span>\n              <span class=\"coin-bg main-1-bg\"></span>\n            </div>");
            iconSvg = "".concat(iconSvg).concat(str);
          }
          marketDataList.push({
            isShow: symbolList[item].isShow,
            id: itemData.name,
            showName: showName,
            data: [[{
              iconSvg: myMarketIcon(itemData.name),
              type: 'icon',
              eventType: 'store'
            }, {
              iconSvg: iconSvg,
              type: 'icon',
              eventType: 'symbol',
              classes: 'symbolName',
              sortVal: itemData.sort,
              key: 'sort'
            }], [{
              text: itemData.close.data,
              classes: ['fontSize14'],
              sortVal: itemData.closes,
              key: 'closes',
              subContent: {
                text: itemData.close.price !== '--' ? "\u2248 ".concat(itemData.close.price) : itemData.close.price,
                classes: ['text-2-cl'] // 默认没有
              }
            }], [{
              type: 'label',
              text: itemData.rose.data,
              sortVal: itemData.roses,
              key: 'roses',
              classes: itemRoseClass(itemData.rose)
            }], [{
              text: itemData.high
            }], [{
              text: itemData.low
            }], [{
              text: itemData.vol
            }], [{
              text: itemData.amount
            }]]
          });
        }
      });
      emitter.emit('MARKET-DATA', marketDataList.sort(function (a, b) {
        return a.sort - b.sort;
      }), initData);
    };

    // 市场推荐数据
    var setRecMarketData = function setRecMarketData(coinList, symbolAll, initData) {
      if (!marketDataObj) return;
      var marketDataList = [];
      var keyarr = Object.keys(marketDataObj);
      keyarr.forEach(function (item) {
        var itemData = marketDataObj[item];
        if (itemData) {
          var showName = getCoinShowName(itemData.name, symbolAll);
          var coinLabel = getCoinLabel(itemData.symbol.symbol, coinList);
          var iconSvg = "<span>".concat(showName, "</span>");
          if (coinLabel && Number(window.coinTagOpen)) {
            var str = "<div class=\"coin-label\">\n              <span class=\"coin-text main-1-cl\">".concat(coinLabel, "</span>\n              <span class=\"coin-bg main-1-bg\"></span>\n            </div>");
            iconSvg = "".concat(iconSvg).concat(str);
          }
          marketDataList.push({
            id: itemData.name,
            showName: showName,
            data: [[{
              iconSvg: myMarketIcon(itemData.name),
              type: 'icon',
              eventType: 'store'
            }, {
              iconSvg: iconSvg,
              type: 'icon',
              eventType: 'symbol',
              classes: 'symbolName',
              sortVal: itemData.sort,
              key: 'sort'
            }], [{
              text: itemData.close.data,
              classes: ['fontSize14'],
              sortVal: itemData.closes,
              key: 'closes',
              subContent: {
                text: itemData.close.price !== '--' ? "\u2248 ".concat(itemData.close.price) : itemData.close.price,
                classes: ['text-2-cl'] // 默认没有
              }
            }], [{
              type: 'label',
              text: itemData.rose.data,
              sortVal: itemData.roses,
              key: 'roses',
              classes: itemRoseClass(itemData.rose)
            }], [{
              text: itemData.high
            }], [{
              text: itemData.low
            }], [{
              text: itemData.vol
            }], [{
              text: itemData.amount
            }]]
          });
        }
      });
      emitter.emit('MARKET-REC-DATA', marketDataList.sort(function (a, b) {
        return a.sort - b.sort;
      }), initData);
    };
    var listenWSData = function listenWSData(data, headerSymbol, coinList, symbolAll) {
      var type = data.type,
        WsData = data.WsData;
      // 24小时行情数据
      if (type === 'MARKET_DATA') {
        marketDataObj = WsData;
        setMarketData(coinList, symbolAll);
        setRecMarketData(coinList, symbolAll);
        setRecommendData(headerSymbol, coinList);
      }
      if (type.indexOf('KLINE_DATA') > -1) {
        if (headerSymbol.length) {
          headerSymbol.forEach(function (key) {
            var _WsData$channel$split = WsData.channel.split('_'),
              _WsData$channel$split2 = _slicedToArray(_WsData$channel$split, 2),
              symbolType = _WsData$channel$split2[1];
            var symbolArr = key.toLowerCase().split('/');
            var symbol = symbolArr[0] + symbolArr[1];
            if (symbol === symbolType) {
              if (WsData.event_rep === 'rep') {
                var kData = WsData.data;
                klineDataList[key] = [];
                var lengthNumber = kData.slice(-20);
                lengthNumber.forEach(function (item) {
                  klineDataList[key].push([item.id, item.close]);
                });
              } else {
                var _kData = WsData.tick;
                var keyYs = klineDataList[key] || [];
                var lengths = keyYs.length;
                if (klineDataList[key].length) {
                  var lastId = klineDataList[key][lengths - 1][0];
                  if (lastId === _kData.id) {
                    klineDataList[key].pop();
                  }
                  if (klineDataList[key].length > 20) {
                    klineDataList[key].shift();
                  }
                  klineDataList[key].push([_kData.id, _kData.close]);
                }
              }
            }
          });
          emitter.emit('RECOMMEEND_KLINE_DATA', klineDataList);
        }
        var symbolAllkey = Object.keys(symbolAll);
        if (symbolAllkey.length) {
          var AllklineDataList = {};
          symbolAllkey.forEach(function (key) {
            var _WsData$channel$split3 = WsData.channel.split('_'),
              _WsData$channel$split4 = _slicedToArray(_WsData$channel$split3, 2),
              symbolType = _WsData$channel$split4[1];
            var symbolArr = key.toLowerCase().split('/');
            var symbol = symbolArr[0] + symbolArr[1];
            if (symbol === symbolType) {
              if (WsData.event_rep === 'rep') {
                var kData = WsData.data;
                AllklineDataList[key] = [];
                var lengthNumber = kData.slice(-20);
                lengthNumber.forEach(function (item) {
                  AllklineDataList[key].push([item.id, item.close]);
                });
              }
            }
          });
          if (Object.keys(AllklineDataList).length) {
            emitter.emit('ALL_RECOMMEEND_KLINE_DATA', AllklineDataList);
          }
        }
      }
    };
    var getSymbolList = function getSymbolList(symbolAll) {
      var recommentSymbol = myStorage.get('home_recommentSymbol');
      if (recommentSymbol) {
        var recommentSymbolList = _toConsumableArray(new Set(recommentSymbol.split(',')));
        var marketList = {};
        if (recommentSymbolList.length) {
          recommentSymbolList.forEach(function (item) {
            if (item && symbolAll[item]) {
              marketList[item] = symbolAll[item];
            }
          });
        }
        return marketList;
      }
      return null;
    };
    var initWorker = function initWorker(data) {
      var market = data.market,
        symbolAll = data.symbolAll;
      var coinList = market.coinList;
      var symbolCurrent = myStorage.get('sSymbolName');
      var currency = getCookie('user_Currency') || 'USD';
      emitter.emit('websocketReceive', {
        type: 'CREAT_WEBSOCKET',
        data: {
          wsUrl: market.wsUrl,
          lan: currency || lang,
          rate: market.rate,
          symbolAll: symbolAll
        }
      });
      emitter.on('websocketSend', function (event) {
        // eslint-disable-next-line no-shadow
        var data = event.data,
          type = event.type;
        var headerSymbol = market.headerSymbol;
        // 监听 WebSocket 链接成功
        if (type === 'WEBSOCKET_ON_OPEN') {
          var symbolListKey = Object.keys(symbolList);
          var objData = {};
          symbolListKey.forEach(function (item) {
            objData[item] = symbolList[item];
          });
          headerSymbol.forEach(function (item) {
            if (symbolListKey.indexOf(item) < 0 && symbolAll[item]) {
              objData[item] = symbolAll[item];
            }
          });
          // 发送 24小时行情历史数据 Send
          webSocketSend('Review', null, symbolCurrent, symbolAll);
          // 发送 24小时行情实时数据 Send
          webSocketSend('Market', 'sub', symbolCurrent, objData);
          // 发送 推荐位 kline数据 Send
          if (headerSymbol.length) {
            headerSymbol.forEach(function (item) {
              var symbolArr = item.toLowerCase().split('/');
              var symbol = symbolArr[0] + symbolArr[1];
              emitter.emit('websocketReceive', {
                type: 'WEBSOCKET_KLINE_SEND',
                data: {
                  symbol: symbol,
                  type: 'req',
                  lastTimeS: '1min',
                  lTime: false,
                  number: 100,
                  symbolCurrent: item
                }
              });
              emitter.emit('websocketReceive', {
                type: 'WEBSOCKET_KLINE_SEND',
                data: {
                  symbol: symbol,
                  type: 'sub',
                  lastTimeS: '1min',
                  lTime: false,
                  symbolCurrent: item
                }
              });
            });
          }
          var symbolAllkey = Object.keys(symbolAll);
          // 发送 全部币对的 kline 历史数据 Send
          if (symbolAllkey.length) {
            symbolAllkey.forEach(function (item) {
              var symbolArr = item.toLowerCase().split('/');
              var symbol = symbolArr[0] + symbolArr[1];
              emitter.emit('websocketReceive', {
                type: 'WEBSOCKET_KLINE_SEND',
                data: {
                  symbol: symbol,
                  type: 'req',
                  lastTimeS: '1min',
                  lTime: false,
                  number: 100,
                  symbolCurrent: item
                }
              });
              /*              emitter.emit('websocketReceive', {
                type: 'WEBSOCKET_KLINE_SEND',
                data: {
                  symbol,
                  type: 'sub',
                  lastTimeS: '1min',
                  lTime: false,
                  symbolCurrent: item,
                },
              }); */
            });
          }
        }
        // 监听 WS 数据
        if (type === 'WEBSOCKET_DATA') {
          listenWSData(data, headerSymbol, coinList, symbolAll);
        }
      });
    };
    var initFn = function initFn(data) {
      setDefaultMarket(data.market);
      // marketCurrent = myStorage.get('homeMarkTitle');
      symbolList = getSymbolList(data.symbolAll);
      if (data.market.coinTagLangs && data.market.coinTagLangs[lang]) {
        coinTagLangs = data.market.coinTagLangs[lang];
      }
      emitter.emit('send_market', data);
      initWorker(data);
      emitter.on('SWITCH-MARKET', function () {
        mySymbolList = myStorage.get('mySymbol') || [];
        // marketCurrent = val;
        symbolList = getSymbolList(data.symbolAll);
        setMarketData(data.market.coinList, data.symbolAll, true);
      });
    };
    emitter.on('websocket-worker-ready', function () {
      if (window.market && window.market.market.rate) {
        initFn(window.market);
      } else {
        emitter.on('getMarket', function (data) {
          initFn(data);
        });
      }
    });
  };
  getScript(window.websocketPath).then(function () {
    init();
  });
})();