"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function () {
  var _window$BlockChainUti = window.BlockChainUtils,
    getScript = _window$BlockChainUti.getScript,
    myStorage = _window$BlockChainUti.myStorage,
    colorMap = _window$BlockChainUti.colorMap,
    getCookie = _window$BlockChainUti.getCookie;
  var RecommendExtend = /*#__PURE__*/function () {
    function RecommendExtend() {
      _classCallCheck(this, RecommendExtend);
    }
    return _createClass(RecommendExtend, [{
      key: "init",
      value: function init() {
        var _this = this;
        this.$recommendWrap = this.$recommend.querySelector('.recommend-wrap');
        this.$recommendContent = Array.prototype.slice.call(this.$recommend.querySelectorAll('.recommend-content'));
        this.len = this.$recommendContent.length;
        this.klineColor = '#24a0f5';
        this.lineWidth = 2;
        this.dataList = [];
        this.myEcharts = {};
        this.kLineIniting = {};
        this.labelisShow = false;
        this.klinkInit = {};
        this.echartReady = {};
        this.klineDataList = {};
        this.klineTimer = {};
        this.domTree = {};
        this.classMap = {};
        this.timer = null;
        this.scrollRG = 0;
        this.clientWidths = document.body.offsetWidth;
        var width = this.liItemWidth * this.$recommendContent.length;
        // eslint-disable-next-line no-mixed-operators
        this.itemWidth = this.len / 2 * this.liItemWidth - 20;
        if (this.$recommend.querySelector('.cloned')) {
          this.$recommendContent = Array.prototype.slice.call(this.$recommend.querySelectorAll('.recommend-content'));
          width = this.liItemWidth * this.$recommendContent.length;
          this.addKeyFrames(width / 2);
          this.$recommendWrap.classList.add('play');
          // this.autoScroll();
          this.isScroll = true;
        }
        if (this.setWarpWdith) {
          this.$recommendWrap.style.width = "".concat(width, "px");
        }
        this.$prev = this.$recommend.querySelector('.prev');
        this.$next = this.$recommend.querySelector('.next');
        this.clientWidths = document.body.offsetWidth;
        this.scrollMax = this.len * this.liItemWidth - this.clientWidths;
        this.itemWidth = this.len * this.liItemWidth - 20;
        /*      if (this.isScroll){
          this.itemWidth = this.len / 2 * 300 - 20;
        } */
        this.$recommendWrap.style.display = 'block';
        this.$recommendContent.forEach(function (item) {
          var coin = item.dataset.coin;
          if (coin) {
            if (!_this.domTree[coin]) {
              _this.domTree[coin] = {};
              _this.classMap[coin] = '';
            }
            _this.domTree[coin].percentage = item.querySelector('.percentage');
            _this.domTree[coin].recommendPrice = item.querySelector('.recommendPrice');
            _this.domTree[coin].recommendTime = item.querySelector('.recommendTime');
            _this.domTree[coin]['coin-text'] = item.querySelector('.coin-text');
            _this.domTree[coin]['coin-label'] = item.querySelector('.coin-label');
            _this.domTree[coin]['echart-box'] = item.querySelector('.echart-box');
            if (_this.domTree[coin].percentage) {
              _this.classMap[coin] = _this.domTree[coin].percentage.className;
            }
          }
        });
        if (this.$recommendWrap && this.$recommendWrap.dataset.style) {
          var dataStyle = JSON.parse(this.$recommendWrap.dataset.style);
          Object.keys(dataStyle).forEach(function (item) {
            _this.$recommendWrap.style[item] = dataStyle[item];
          });
        }
        if (this.itemWidth > this.clientWidths && !this.isScroll) {
          if (this.$next) {
            this.$next.style.display = 'block';
          }
        }
        if (!window.echarts) {
          getScript("".concat(this.echartsPath)).then(function () {
            if (!Object.keys(_this.myEcharts).length) {
              var keys = Object.keys(_this.klineDataList);
              if (keys.length) {
                _this.$recommendContent.forEach(function (target) {
                  var coin = target.dataset.coin;
                  var coinC = coin.replace('-c', '');
                  if (!_this.klineTimer[coinC]) {
                    _this.klineTimer[coinC] = null;
                  }
                  _this.klineTimer[coinC] = setTimeout(function () {
                    _this.initEcharts(coinC);
                  }, 0);
                });
              }
            }
          });
        }
        window.emitter.on('RECOMMEEND_KLINE_DATA', function (data) {
          _this.resloveKline(data);
        });
        window.emitter.on('RECOMMEEND_DATA', function (data) {
          _this.resloveRecommendData(data);
        });
        window.emitter.on('resize', function () {
          _this.clientWidths = document.body.offsetWidth;
        });
        if (this.bindV5Event) {
          this.bindV5Event();
        } else {
          this.bindEvent();
        }
      }

      // 千分符
    }, {
      key: "thousands",
      value: function thousands(num) {
        if (num) {
          var str = num.toString();
          var reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
          return str.replace(reg, '$1,');
        }
        return num;
      }
    }, {
      key: "resloveKline",
      value: function resloveKline(data) {
        var _this2 = this;
        if (JSON.stringify(data) === JSON.stringify(this.klineDataList)) {
          return;
        }
        this.klineDataList = JSON.parse(JSON.stringify(data));
        // eslint-disable-next-line no-param-reassign
        data = null;
        this.$recommendContent.forEach(function (target) {
          var coin = target.dataset.coin;
          if (!_this2.klineTimer[coin]) {
            _this2.klineTimer[coin] = null;
          }
          if (_this2.echartReady[coin]) {
            _this2.klineTimer[coin] = setTimeout(function () {
              _this2.setData(coin);
            }, 0);
          } else if (window.echarts && !_this2.klinkInit[coin] && !_this2.kLineIniting[coin]) {
            _this2.klineTimer[coin] = setTimeout(function () {
              _this2.initEcharts(coin);
            }, 0);
          }
        });
      }
    }, {
      key: "resloveRecommendData",
      value: function resloveRecommendData(data) {
        var _this3 = this;
        var recommendDataList = data.recommendDataList,
          coinList = data.coinList,
          coinTagLangs = data.coinTagLangs;
        var keys = Object.keys(recommendDataList);
        keys.forEach(function (item) {
          var coinLabel = recommendDataList[item] && recommendDataList[item].symbol ? _this3.getCoinLabel(recommendDataList[item].symbol.symbol, coinList, coinTagLangs) : '';
          recommendDataList[item].coinLabel = coinLabel;
        });
        this.dataList = recommendDataList;
        this.$recommendContent.forEach(function (item, index) {
          var coin = item.dataset.coin;
          var coinC = coin.replace('-c', '');
          var coinLabel = _this3.dataList[coinC].coinLabel;
          var len = _this3.$recommendContent.length;
          var recommendTimeVal = '';
          if (_this3.dataList[coinC]) {
            var $percentage = _this3.domTree[coin].percentage;
            var $recommendType = _this3.domTree[coin].recommendPrice;
            var $recommendTime = _this3.domTree[coin].recommendTime;
            if ($recommendTime) {
              recommendTimeVal = $recommendTime.innerHTML;
            }
            var recommendTimeNVal = "24H Vol <span>".concat(_this3.dataList[coinC].vol ? _this3.thousands(_this3.dataList[coinC].vol) : '', "</span>");
            var recommendTypeVal = $recommendType.innerHTML;
            var recommendTypeNVal = _this3.dataList[coinC].close ? _this3.thousands(_this3.dataList[coinC].close.data) : '';
            var percentageValue = $percentage.innerHTML;
            var percentageClass = $percentage.className;
            var percentageNValue = _this3.dataList[coinC].rose ? _this3.dataList[coinC].rose.data : '';
            var percentageNClass = "".concat(_this3.classMap[coin], " ").concat(_this3.dataList[coinC].rose ? _this3.dataList[coinC].rose.class : '');
            if (recommendTimeVal && recommendTimeVal !== recommendTimeNVal) {
              $recommendTime.innerHTML = recommendTimeNVal;
            }
            if (recommendTypeVal !== recommendTypeNVal) {
              $recommendType.innerHTML = recommendTypeNVal;
            }
            if (percentageValue !== percentageNValue) {
              $percentage.innerHTML = percentageNValue;
            }
            if (percentageClass !== percentageNClass) {
              $percentage.className = "".concat(percentageNClass, " rose");
            }
          }
          if (!_this3.labelisShow) {
            _this3.labelShow(coinLabel, coin, len, index);
          }
        });
      }
    }, {
      key: "addKeyFrames",
      value: function addKeyFrames(y) {
        var style = document.createElement('style');
        style.type = 'text/css';
        var lan = getCookie('lan');
        var direction = lan === 'ar_AE' ? '' : '-';
        var keyFrames = "\n    @-webkit-keyframes rowup {\n        0% {\n            -webkit-transform: translate3d(".concat(direction, "736px, 0, 0);\n            transform: translate3d(").concat(direction, "736px, 0, 0);\n        }\n        100% {\n            -webkit-transform: translate3d(").concat(direction).concat(y, "px, 0, 0);\n            transform: translate3d(").concat(direction).concat(y, "px, 0, 0);\n        }\n    }\n    @keyframes rowup {\n        0% {\n            -webkit-transform: translate3d(").concat(direction, "736px, 0, 0);            transform: translate3d(").concat(direction, "736px, 0, 0);        }\n        100% {\n            -webkit-transform: translate3d(").concat(direction).concat(y, "px, 0, 0);            transform: translate3d(").concat(direction).concat(y, "px, 0, 0);        }\n    }");
        style.innerHTML = keyFrames;
        document.getElementsByTagName('head')[0].appendChild(style);
      }

      /*    autoScroll(){
        clearTimeout(this.timer);
        const sum = this.len / 2 * this.liItemWidth - this.clientWidths;
        this.scrollRG += 1;
        if (this.scrollRG > sum) {
          // this.scrollRG = sum % this.liItemWidth
          this.scrollRG = this.len * this.liItemWidth - this.clientWidths;
        }
        this.$recommendWrap.style.marginLeft = `-${this.scrollRG}px`;
        this.timer = setTimeout(this.autoScroll.bind(this), 50);
      } */
    }, {
      key: "bindEvent",
      value: function bindEvent() {
        var _this4 = this;
        if (this.isScroll) {
          this.$recommendWrap.addEventListener('mouseenter', function () {
            _this4.$recommendWrap.classList.add('pause');
          });
          this.$recommendWrap.addEventListener('mouseleave', function () {
            _this4.$recommendWrap.classList.remove('pause');
          });
        }
        this.$recommendContent.forEach(function (item) {
          item.addEventListener('click', function () {
            var coin = item.dataset.coin;
            var symbol = coin;
            if (coin) {
              if (coin.indexOf('-c') > -1) {
                symbol = coin.replace('-c', '');
              }
              myStorage.set('sSymbolName', symbol);
              myStorage.set('markTitle', symbol.split('/')[1]);
            }
            var symbolAll = window.market.symbolAll;
            var sSymbolShowName = symbol;
            if (symbolAll[symbol] && symbolAll[symbol].showName) {
              sSymbolShowName = symbolAll[symbol].showName;
            }
            var marketJumpType = window.publicInfo && window.publicInfo.switch ? window.publicInfo.switch.marketJumpType : '0';
            var tradePage = marketJumpType === '1' ? 'proTrade' : 'trade';
            window.location.href = "/".concat(tradePage, "/").concat(sSymbolShowName.replace('/', '_'));
          }, false);
        });
        if (this.$next) {
          this.$next.addEventListener('click', function () {
            var str = _this4.$recommendWrap.style.transform.match(/[(](.+)[)]/g)[0];
            str = str.replace('(', '');
            str = str.replace(')', '');
            var num = _this4.clientWidths / 2;
            var x = Math.abs(str.replace('px', '').split(',')[0]);
            var right = num + x;
            if (right > _this4.scrollMax - 30) {
              right = _this4.scrollMax;
            }
            if (right === _this4.scrollMax) {
              _this4.$next.style.display = 'none';
            }
            _this4.goPage(-right);
            _this4.$prev.style.display = 'block';
          }, false);
          this.$prev.addEventListener('click', function () {
            var str = _this4.$recommendWrap.style.transform.match(/[(](.+)[)]/g)[0];
            str = str.replace('(', '');
            str = str.replace(')', '');
            var num = _this4.clientWidths / 2;
            var x = Math.abs(str.replace('px', '').split(',')[0]);
            var left = num - x;
            if (left > -30) {
              left = 0;
            }
            _this4.$next.style.display = 'block';
            if (left === 0) {
              _this4.$prev.style.display = 'none';
            }
            _this4.goPage(left);
          }, false);
        }
      }
    }, {
      key: "goPage",
      value: function goPage(num) {
        this.$recommendWrap.style.transform = "translate3d(".concat(num, "px,0,0)");
      }
    }, {
      key: "setData",
      value: function setData(coin) {
        var colorList = window.colorMap || colorMap;
        var coinC = coin.replace('-c', '');
        var color = this.klineColor;
        if (this.roseConfig) {
          if (this.dataList[coinC]) {
            if (this.dataList[coinC].rose) {
              if (this.dataList[coinC].rose.class) {
                color = colorList[this.dataList[coinC].rose.class];
              }
            }
          }
        }
        if (this.cusKlineColor) {
          color = this.cusKlineColor;
        }
        if (this.cusTomKline) {
          this.cusTomKline(color, coinC);
        }
        var lineWidth = this.lineWidth;
        if (this.cusLineWidth) {
          lineWidth = this.cusLineWidth;
        }
        var data = this.klineDataList[coinC] ? JSON.parse(JSON.stringify(this.klineDataList[coinC])) : {};
        this.myEcharts[coin].resize();
        this.myEcharts[coin].setOption({
          series: [{
            data: data,
            type: 'line',
            lineStyle: {
              normal: {
                color: color,
                width: lineWidth
              }
            }
          }]
        });
        data = null;
      }
    }, {
      key: "initEcharts",
      value: function initEcharts(coin) {
        var _this5 = this;
        if (this.ish5) return;
        var colorList = window.colorMap || colorMap;
        var coinC = coin.replace('-c', '');
        var color = this.klineColor;
        if (this.dataList[coinC]) {
          if (this.dataList[coinC].rose) {
            if (this.dataList[coinC].rose.class) {
              color = colorList[this.dataList[coinC].rose.class];
            }
          }
        }
        if (this.cusKlineColor) {
          color = this.cusKlineColor;
        }
        if (this.cusTomKline) {
          this.cusTomKline(color, coin);
        }
        this.kLineIniting[coin] = true;
        var bg = null;
        if (this.haveBg) {
          bg = {
            normal: {
              color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(36,160,245,0.2)'
              }, {
                offset: 1,
                color: 'rgba(36,160,245,0.05)'
              }])
            }
          };
        }
        // 基于准备好的dom，初始化echarts实例
        this.myEcharts[coin] = window.echarts.init(this.domTree[coin]['echart-box']);
        // 绘制图表
        this.myEcharts[coin].setOption({
          grid: {
            left: -10,
            bottom: 0,
            top: 0,
            right: -10
          },
          xAxis: {
            show: false,
            type: 'category',
            min: 'dataMin',
            max: 'dataMax'
          },
          yAxis: {
            show: false,
            type: 'value',
            min: 'dataMin',
            max: 'dataMax'
          },
          series: [{
            data: [],
            type: 'line',
            symbol: 'none',
            lineStyle: {
              normal: {
                color: color,
                width: 2
              }
            },
            areaStyle: bg
          }]
        });
        this.klineTimer[coin] = setTimeout(function () {
          _this5.setData(coin);
        }, 0);
        this.kLineIniting[coin] = false;
        this.klinkInit[coin] = true;
        this.echartReady[coin] = true;
      }
    }, {
      key: "getCoinLabel",
      value: function getCoinLabel(name) {
        var coinList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var coinTagLangs = arguments.length > 2 ? arguments[2] : undefined;
        if (coinList && coinList[name.toUpperCase()]) {
          var _coinList$name$toUppe = coinList[name.toUpperCase()].coinTag,
            coinTag = _coinList$name$toUppe === void 0 ? '' : _coinList$name$toUppe;
          return coinTag ? coinTagLangs[coinTag] : '';
        }
        return '';
      }
    }, {
      key: "labelShow",
      value: function labelShow(coinLabel, coin, len, index) {
        if (this.domTree[coin]['coin-text']) {
          if (coinLabel) {
            this.domTree[coin]['coin-text'].innerHTML = coinLabel;
            this.domTree[coin]['coin-label'].style.display = 'inline-block';
          }
          if (index === len - 1) {
            this.labelisShow = true;
          }
        }
      }
    }]);
  }();
  window.RecommendExtend = RecommendExtend;
})();