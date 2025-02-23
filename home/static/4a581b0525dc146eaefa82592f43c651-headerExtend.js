"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function () {
  var _window$BlockChainUti = window.BlockChainUtils,
    myStorage = _window$BlockChainUti.myStorage,
    setCookie = _window$BlockChainUti.setCookie,
    getScript = _window$BlockChainUti.getScript,
    removeCookie = _window$BlockChainUti.removeCookie,
    fixRate = _window$BlockChainUti.fixRate,
    getCookie = _window$BlockChainUti.getCookie,
    fixD = _window$BlockChainUti.fixD,
    getIconPath = _window$BlockChainUti.getIconPath;
  var _window = window,
    location = _window.location,
    fetchData = _window.fetchData,
    emitter = _window.emitter,
    companyId = _window.companyId,
    imgMap = _window.imgMap;
  var colorMap = window.colorMap || window.BlockChainUtils.colorMap;
  var HeaderExtend = /*#__PURE__*/function () {
    function HeaderExtend() {
      _classCallCheck(this, HeaderExtend);
    }
    return _createClass(HeaderExtend, [{
      key: "init",
      value: function init() {
        var _this = this;
        this.$commonHeader = document.querySelector('#common-header');
        this.$headerCusNav = document.querySelector('#header-cus-nav');
        this.$headerNavEven1 = document.querySelector('.common-header-linkList.common-header-expand');
        this.$headerNavEven2 = document.querySelector('.common-header-linkList.common-header-menu');
        this.$commonHeaderOptionList = document.querySelector('.header-isLogin');
        this.headerNavEvenList1 = Array.prototype.slice.call(this.$headerNavEven1.querySelectorAll('.header-navEven'));
        // 更多
        if (this.$headerNavEven2) {
          this.headerNavEvenList2 = Array.prototype.slice.call(this.$headerNavEven2.querySelectorAll('.header-navEven'));
        }
        this.$headerIsLoginNavEvenTitle = Array.prototype.slice.call(document.querySelectorAll('.header-isLogin-navEven-title'));
        this.$lanList = Array.prototype.slice.call(this.$commonHeader.querySelectorAll('.lang-list'));
        this.$currencyList = Array.prototype.slice.call(this.$commonHeader.querySelectorAll('.header-lang_list'));
        this.$loginBtn = this.$commonHeader.querySelector('.header-login-button');
        this.$registerBtn = this.$commonHeader.querySelector('.header-reg-button');
        this.headerNavEvenListIn = Array.prototype.slice.call(this.$commonHeader.querySelectorAll('.header-navEven-list'));
        this.$logOut = this.$commonHeader.querySelector('.logout');
        this.$appdownLoadCoin = this.$commonHeader.querySelector('.appdownLoad-coin');
        if (this.$appdownLoadCoin) {
          this.$appdownloadBtn = this.$appdownLoadCoin.querySelector('.download-button');
        }
        this.$colorSet = document.querySelector('#color-set');
        this.colorDialog = null;
        this.outFlag = true;
        this.$goUser = this.$commonHeader.querySelector('.goUser');
        this.$goOtc = this.$commonHeader.querySelector('.goOtc');
        this.$goApi = this.$commonHeader.querySelector('.goApi');
        this.$goVeri = this.$commonHeader.querySelector('.goVeri');
        this.$personalAccountSafety = this.$commonHeader.querySelector('.personalAccountSafety');
        this.$personalPayment = this.$commonHeader.querySelector('.personalPayment');
        this.$goPromotion = this.$commonHeader.querySelector('.goPromotion');
        this.$goSubAccount = this.$commonHeader.querySelector('.goSubAccount');
        this.$goTaskCenter = this.$commonHeader.querySelector('.goTaskCenter');
        this.$goOut = this.$commonHeader.querySelector('.goOut');
        this.$subUserHide = Array.prototype.slice.call(document.querySelectorAll('.subUser-hide'));
        // 资产
        this.$headerAssetsNav = this.$commonHeader.querySelector('.header-assets-nav');
        if (this.$headerAssetsNav) {
          this.$assetsView = this.$headerAssetsNav.querySelector('.header-assets-overview');
          this.$assetsTotalFold = this.$headerAssetsNav.querySelector('.assets-totalFold');
          this.$hideAssetsIcon = this.$headerAssetsNav.querySelector('.icon-eye');
          this.$rechargeButton = this.$headerAssetsNav.querySelector('.operation-btn-recharge');
          this.$auditButton = this.$headerAssetsNav.querySelector('.operation-btn-assetAudit');
          this.$accountItemList = this.$headerAssetsNav.querySelectorAll('.overview-list_item');
          this.$assetsNavText = this.$headerAssetsNav.querySelector('.header-isLogin-navEven-title');
          this.$assetsOperation = this.$headerAssetsNav.querySelector('.assets-operation');
          var isHide = getCookie('header_assets_hide') === 'true' || false;
          if (isHide) {
            this.$assetsView.classList.add('hideHeaderAssets');
          } else {
            this.$assetsView.classList.remove('hideHeaderAssets');
          }
        }
        this.setLanAndCurrency();
        this.h5Init();
        this.getData();
        if (!window.BlockChainDialog && this.dialogPath) {
          getScript("".concat(window.staticDomain, "/home/static/").concat(this.dialogPath)).then(function () {
            _this.bindEvent();
            _this.bindH5Event();
          });
        } else {
          this.bindEvent();
          this.bindH5Event();
        }
        this.setNavBg();
      }
    }, {
      key: "h5Init",
      value: function h5Init() {
        this.$h5_header = document.querySelector('.common-header-h5');
        this.$h5_headerNav = this.$h5_header.querySelector('.header-nav-sideBar');
        this.$h5_personalEnter = this.$h5_header.querySelector('.nav-personal');
        this.$h5_navEnter = this.$h5_header.querySelector('.nav-sideBar');
        this.$h5_headerNavClose = this.$h5_headerNav.querySelector('.sideBar-close');
        this.$h5_themeList = this.$h5_headerNav.querySelectorAll('.theme-setting li');
        this.$h5_navList = this.$h5_header.querySelectorAll('.sideBar-navList .nav-title');
        this.$h5_navChildList = this.$h5_header.querySelectorAll('.sideBar-navList .nav-child-item');
        this.$h5_navLanguage = this.$h5_headerNav.querySelector('.nav-language');
        this.$h5_currency = this.$h5_headerNav.querySelector('.nav-currency');
        this.$h5_languageSideBar = this.$h5_header.querySelector('.header-language-sideBar');
        this.$h5_langaugeClose = this.$h5_languageSideBar.querySelector('.sideBar-close');
        this.$h5_languageTab = this.$h5_languageSideBar.querySelector('.sideBar-tab');
        this.$h5_languageTabItem = this.$h5_languageSideBar.querySelectorAll('.sideBar-tab .tab-item');
        this.$h5_languageListWrap = this.$h5_languageSideBar.querySelector('.sideBar-language-list');
        this.$h5_currencyListWrap = this.$h5_languageSideBar.querySelector('.sideBar-currency-list');
        this.$h5_languageList = this.$h5_languageSideBar.querySelectorAll('.sideBar-language-list li');
        this.$h5_currencyList = this.$h5_languageSideBar.querySelectorAll('.sideBar-currency-list li');
        this.$h5_personalSideBar = this.$h5_header.querySelector('.header-personal-sideBar');
        this.$h5_personalClose = this.$h5_personalSideBar.querySelector('.sideBar-close');
        this.$h5_personalHeadImg = this.$h5_personalSideBar.querySelector('.personal-headImg');
        this.$h5_personalAccount = this.$h5_personalSideBar.querySelector('.personal-account .account-text');
        this.$h5_personalId = this.$h5_personalSideBar.querySelector('.personal-id-num');
        this.$h5_personalIdCopy = this.$h5_personalSideBar.querySelector('.copy-icon');
        this.$h5_personalStatus = this.$h5_personalSideBar.querySelector('.personal-status');
        this.$h5_personalStatusIcon = this.$h5_personalSideBar.querySelector('.personal-status svg');
        this.$h5_personalStatusText = this.$h5_personalSideBar.querySelector('.personal-status .status-text');
        this.$h5_subAccount = this.$h5_personalSideBar.querySelector('.subAccount-h5');
        this.$h5_logout = this.$h5_personalSideBar.querySelector('.logout');
      }
    }, {
      key: "setNavBg",
      value: function setNavBg() {
        if (this.$commonHeader) {
          var _window2 = window,
            scrollY = _window2.scrollY;
          var classList = Array.prototype.slice.call(this.$commonHeader.classList);
          if (scrollY > 580) {
            this.$commonHeader.classList.remove('static');
          } else if (classList.indexOf('static') < 0) {
            this.$commonHeader.classList.add('static');
          }
        }
      }
    }, {
      key: "setLanAndCurrency",
      value: function setLanAndCurrency() {
        var _this2 = this;
        var lanSpan = document.querySelectorAll('.user-lan');
        var currencySpan = document.querySelectorAll('.user-currency');
        var lanItem = window.lanList.find(function (item) {
          return item.id === _this2.currenLan;
        });
        lanSpan.forEach(function (item) {
          var $item = item;
          $item.innerHTML = lanItem ? lanItem.name : '';
        });
        currencySpan.forEach(function (item) {
          var $item = item;
          $item.innerHTML = window.userCurrency;
        });
        var currencyListLi = document.querySelectorAll('.header-currency_item');
        var h5CurrencyList = document.querySelectorAll('.header-language-sideBar .sideBar-currency-list li');
        if (currencyListLi) {
          currencyListLi.forEach(function (item) {
            if (item.dataset.id === window.userCurrency) {
              var iconSvg = item.querySelector('svg');
              iconSvg.style.display = 'inline-block';
            }
          });
        }
        if (h5CurrencyList) {
          h5CurrencyList.forEach(function (item) {
            if (item.dataset.id === window.userCurrency) {
              var iconSvg = item.querySelector('svg');
              iconSvg.style.display = 'inline-block';
            }
          });
        }
      }
    }, {
      key: "bindEvent",
      value: function bindEvent() {
        var _this3 = this;
        window.addEventListener('scroll', function () {
          _this3.setNavBg();
        });
        if (this.$appdownLoadCoin) {
          this.$appdownLoadCoin.addEventListener('click', function () {
            window.location.href = '/appDownload';
          }, false);
        }
        if (this.headerNavEvenListIn.length) {
          this.headerNavEvenListIn.forEach(function (ul) {
            Array.prototype.slice.call(ul.querySelectorAll('li')).forEach(function (li) {
              li.addEventListener('mouseover', function () {
                // const { target } = e;
                // eslint-disable-next-line no-param-reassign
                li.className = 'special-2-bg';
              }, false);
              li.addEventListener('mouseout', function () {
                // const { target } = e;
                // eslint-disable-next-line no-param-reassign
                li.className = 'text-1-cl';
              }, false);
            });
          });
        }
        if (this.$colorSet) {
          this.$colorSet.addEventListener('click', function () {
            // this.colorDialog.show();
            if (_this3.cusSkinId === '1') {
              setCookie('cusSkin', '2');
            } else {
              setCookie('cusSkin', '1');
            }
            myStorage.remove('exTradingViewData');
            myStorage.remove('exTradingViewDataH5');
            window.location.reload();
          }, false);
        }
        Array.prototype.slice.call(this.$commonHeader.querySelectorAll('.goMessage')).forEach(function (item) {
          item.addEventListener('click', function () {
            location.href = '/mesage';
          }, false);
        });
        if (this.$logOut) {
          this.$logOut.addEventListener('click', function () {
            if (!_this3.outFlag) {
              return;
            }
            _this3.outFlag = false;
            fetchData({
              url: '/fe-ex-api/user/login_out'
            }).then(function (data) {
              _this3.outFlag = true;
              if (data.code.toString() === '0') {
                emitter.emit('tip', {
                  text: _this3.locale.logout,
                  type: 'success'
                });
                location.reload();
              } else {
                emitter.emit('tip', {
                  text: data.msg,
                  type: 'error'
                });
              }
            });
          }, false);
        }
        Array.prototype.slice.call(this.$commonHeader.querySelectorAll('.goPersonal')).forEach(function (item) {
          item.addEventListener('click', function () {
            location.href = '/personal/personalOverview';
          }, false);
        });
        if (this.$loginBtn) {
          this.$loginBtn.addEventListener('click', function () {
            location.href = '/login';
          });
          this.$loginBtn.addEventListener('mouseover', function () {
            _this3.$loginBtn.className = 'common-button header-login-button common-button-text-kind main-5-cl';
          });
          this.$loginBtn.addEventListener('mouseout', function () {
            _this3.$loginBtn.className = 'common-button header-login-button common-button-text-kind text-1-cl';
          });
        }
        if (this.$goUser) {
          this.$goUser.addEventListener('mouseover', function () {
            _this3.$goUser.className = 'header-message_useritem goPersonal goUser  special-2-bg';
            _this3.$commonHeader.querySelector('.personalOverviewicon').innerHTML = getIconPath('personal_Overview', colorMap['main-1-cl']);
          });
          this.$goUser.addEventListener('mouseout', function () {
            _this3.$goUser.className = 'header-message_useritem goPersonal goUser';
            _this3.$commonHeader.querySelector('.personalOverviewicon').innerHTML = getIconPath('personal_Overview', colorMap['text-2-cl']);
          });
        }
        if (this.$goOtc) {
          this.$goOtc.addEventListener('click', function () {
            location.href = '/personal/leaglTenderSet';
          });
          this.$goOtc.addEventListener('mouseover', function () {
            _this3.$goOtc.className = 'header-message_useritem goOtc special-2-bg';
          });
          this.$goOtc.addEventListener('mouseout', function () {
            _this3.$goOtc.className = 'header-message_useritem goOtc';
          });
        }
        if (this.$goApi) {
          this.$goApi.addEventListener('click', function () {
            location.href = '/personal/apiManagement';
          });
          this.$goApi.addEventListener('mouseover', function () {
            _this3.$goApi.className = 'header-message_useritem goApi  special-2-bg';
            _this3.$commonHeader.querySelector('.apiManagementicon').innerHTML = getIconPath('personal_api', colorMap['main-1-cl']);
          });
          this.$goApi.addEventListener('mouseout', function () {
            _this3.$goApi.className = 'header-message_useritem goApi';
            _this3.$commonHeader.querySelector('.apiManagementicon').innerHTML = getIconPath('personal_api', colorMap['text-2-cl']);
          });
        }
        if (this.$goVeri) {
          this.$goVeri.addEventListener('click', function () {
            location.href = '/personal/verification';
          });
          this.$goVeri.addEventListener('mouseover', function () {
            _this3.$goVeri.className = 'header-message_useritem goVeri special-2-bg';
            _this3.$commonHeader.querySelector('.goVeriicon').innerHTML = getIconPath('personal_kyc', colorMap['main-1-cl']);
          });
          this.$goVeri.addEventListener('mouseout', function () {
            _this3.$goVeri.className = 'header-message_useritem goVeri';
            _this3.$commonHeader.querySelector('.goVeriicon').innerHTML = getIconPath('personal_kyc', colorMap['text-2-cl']);
          });
        }
        if (this.$personalPayment) {
          this.$personalPayment.addEventListener('click', function () {
            location.href = '/personal/personalPayment  ';
          });
          this.$personalPayment.addEventListener('mouseover', function () {
            _this3.$personalPayment.className = 'header-message_useritem personalPayment special-2-bg';
            _this3.$commonHeader.querySelector('.personalPaymenticon').innerHTML = getIconPath('paymentMethod', [colorMap['main-1-cl'], colorMap['main-1-cl']]);
          });
          this.$personalPayment.addEventListener('mouseout', function () {
            _this3.$personalPayment.className = 'header-message_useritem personalPayment';
            _this3.$commonHeader.querySelector('.personalPaymenticon').innerHTML = getIconPath('paymentMethod', [colorMap['text-2-cl'], colorMap['text-2-cl']]);
          });
        }
        if (this.$personalAccountSafety) {
          this.$personalAccountSafety.addEventListener('click', function () {
            location.href = '/personal/personalAccountSafety  ';
          });
          this.$personalAccountSafety.addEventListener('mouseover', function () {
            _this3.$personalAccountSafety.className = 'header-message_useritem personalAccountSafety special-2-bg';
            _this3.$commonHeader.querySelector('.personalAccountSafetyicon').innerHTML = getIconPath('personal_safetyRecord', colorMap['main-1-cl']);
          });
          this.$personalAccountSafety.addEventListener('mouseout', function () {
            _this3.$personalAccountSafety.className = 'header-message_useritem personalAccountSafety';
            _this3.$commonHeader.querySelector('.personalAccountSafetyicon').innerHTML = getIconPath('personal_safetyRecord', colorMap['text-2-cl']);
          });
        }
        if (this.$goPromotion) {
          this.$goPromotion.addEventListener('click', function () {
            location.href = '/promotion';
          });
          this.$goPromotion.addEventListener('mouseover', function () {
            _this3.$goPromotion.className = 'header-message_useritem goPromotion special-2-bg';
            _this3.$commonHeader.querySelector('.invite_friendsicon').innerHTML = getIconPath('personal_invite', colorMap['main-1-cl']);
          });
          this.$goPromotion.addEventListener('mouseout', function () {
            _this3.$goPromotion.className = 'header-message_useritem goPromotion';
            _this3.$commonHeader.querySelector('.invite_friendsicon').innerHTML = getIconPath('personal_invite', colorMap['text-2-cl']);
          });
        }
        if (this.$goSubAccount) {
          this.$goSubAccount.addEventListener('click', function () {
            location.href = '/personal/subManagement';
          });
          this.$goSubAccount.addEventListener('mouseover', function () {
            _this3.$goSubAccount.className = 'header-message_useritem goSubAccount special-2-bg';
            _this3.$commonHeader.querySelector('.subAccounticon').innerHTML = getIconPath('personal_subAccount', colorMap['main-1-cl']);
          });
          this.$goSubAccount.addEventListener('mouseout', function () {
            _this3.$goSubAccount.className = 'header-message_useritem goSubAccount';
            _this3.$commonHeader.querySelector('.subAccounticon').innerHTML = getIconPath('personal_subAccount', colorMap['text-2-cl']);
          });
        }
        if (this.$goTaskCenter) {
          this.$goTaskCenter.addEventListener('click', function () {
            location.href = '/taskCenter';
          });
          this.$goTaskCenter.addEventListener('mouseover', function () {
            _this3.$goTaskCenter.className = 'header-message_useritem goTaskCenter special-2-bg';
            _this3.$commonHeader.querySelector('.taskCentericon').innerHTML = getIconPath('personal_taskCenter', colorMap['main-1-cl']);
          });
          this.$goTaskCenter.addEventListener('mouseout', function () {
            _this3.$goTaskCenter.className = 'header-message_useritem goTaskCenter';
            _this3.$commonHeader.querySelector('.taskCentericon').innerHTML = getIconPath('personal_taskCenter', colorMap['text-2-cl']);
          });
        }
        if (this.$goOut) {
          this.$goOut.addEventListener('click', function () {
            location.href = '/taskCenter';
          });
          this.$goOut.addEventListener('mouseover', function () {
            _this3.$goOut.className = 'header-message_useritem logout goOut fill-6-bd special-2-bg';
            _this3.$commonHeader.querySelector('.outicon').innerHTML = getIconPath('nav_top_personalcenter_quit', [colorMap['main-1-cl'], colorMap['main-1-cl']]);
          });
          this.$goOut.addEventListener('mouseout', function () {
            _this3.$goOut.className = 'header-message_useritem goOut logout fill-6-bd';
            _this3.$commonHeader.querySelector('.outicon').innerHTML = getIconPath('nav_top_personalcenter_quit', [colorMap['text-2-cl'], colorMap['text-2-cl']]);
          });
        }
        if (this.$registerBtn) {
          this.$registerBtn.addEventListener('click', function () {
            if (companyId.toString() === '1490') {
              location.href = 'https://centurioninvest.com/en/register';
            } else {
              location.href = '/register';
            }
          });
          this.$registerBtn.addEventListener('mouseover', function () {
            _this3.$registerBtn.className = 'common-button header-reg-button main-2-bg';
          });
          this.$registerBtn.addEventListener('mousedown', function () {
            _this3.$registerBtn.className = 'common-button header-reg-button main-3-bg';
          });
          this.$registerBtn.addEventListener('mouseup', function () {
            _this3.$registerBtn.className = 'common-button header-reg-button main-1-bg';
          });
          this.$registerBtn.addEventListener('mouseout', function () {
            _this3.$registerBtn.className = 'common-button header-reg-button main-1-bg';
          });
        }
        this.$lanList.forEach(function (item) {
          item.addEventListener('mouseover', function (e) {
            var target = e.target;
            if (target.tagName === 'LI') {
              target.classList.add('special-2-bg');
            }
          });
          item.addEventListener('mouseout', function (e) {
            var target = e.target;
            if (target.tagName === 'LI') {
              target.classList.remove('special-2-bg');
            }
          });
          item.addEventListener('click', function (e) {
            var target = e.target;
            var data = target.dataset;
            if (target.tagName === 'LI') {
              if (data.link) {
                location.href = data.link;
              } else if (data.key) {
                location.href = data.key;
              }
            }
          });
        });
        // 汇率语言点击
        this.$currencyList.forEach(function (item) {
          item.addEventListener('mouseover', function (e) {
            var target = e.target;
            if (target.tagName === 'LI') {
              target.className = 'header-lang_item special-2-bg';
            }
          });
          item.addEventListener('mouseout', function (e) {
            var target = e.target;
            if (target.tagName === 'LI') {
              target.className = 'header-lang_item';
            }
          });
          item.addEventListener('click', function (e) {
            var target = e.target;
            if (target.tagName === 'LI') {
              var data = target.dataset;
              if (data && data.key) {
                location.href = data.key;
              }
              if (data && data.id) {
                removeCookie('userCurrency');
                setCookie('user_Currency', data.id);
                window.location.reload();
              }
            }
          });
        });
        this.$headerIsLoginNavEvenTitle.forEach(function (item) {
          item.addEventListener('mouseover', function (e) {
            var target = e.target;
            if (target.tagName === 'DIV') {
              target.className = 'header-isLogin-navEven-title main-5-cl';
            }
          });
          item.addEventListener('mouseout', function (e) {
            var target = e.target;
            if (target.tagName === 'DIV') {
              target.className = 'header-isLogin-navEven-title text-1-cl';
            }
          });
          item.addEventListener('click', function (e) {
            var target = e.target;
            var data = target.dataset;
            if (data && data.link) {
              window.location.href = data.link;
            }
          });
        });
        this.$headerNavEven1.addEventListener('click', function (e) {
          var target = e.target;
          var data = target.dataset;
          var link = data.link;
          var trades = data.trades;
          var id = data.id;
          if (trades) {
            if (id === 'exTrade' && _this3.etfOpen) {
              myStorage.set('markTitle', '');
              myStorage.set('sSymbolName', '');
            }
          }
          if (link) {
            window.location.href = link;
          }
        }, false);
        this.$headerNavEven1.addEventListener('mouseout', function () {
          _this3.headerNavEvenList1.forEach(function (item) {
            // eslint-disable-next-line no-param-reassign
            item.className = 'header-navEven text-1-cl main-1-f-h';
          });
        }, false);
        this.$headerNavEven1.addEventListener('mouseover', function (e) {
          var target = e.target;
          if (target.className && target.className.indexOf('header-navEven') > -1 && target.tagName === 'LI') {
            target.className = 'header-navEven main-5-cl main-1-f-h';
          }
        }, false);
        if (this.$headerNavEven2) {
          this.$headerNavEven2.addEventListener('click', function (e) {
            var target = e.target;
            var data = target.dataset;
            var link = data.link;
            var trades = data.trades;
            var id = data.id;
            if (trades) {
              if (id === 'exTrade' && _this3.etfOpen) {
                myStorage.set('markTitle', '');
                myStorage.set('sSymbolName', '');
              }
            }
            if (link) {
              window.location.href = link;
            }
          }, false);
          this.$headerNavEven2.addEventListener('mouseout', function () {
            _this3.headerNavEvenList2.forEach(function (item) {
              // eslint-disable-next-line no-param-reassign
              item.className = 'header-navEven text-1-cl  main-1-f-h';
            });
          }, false);
          this.$headerNavEven2.addEventListener('mouseover', function (e) {
            var target = e.target;
            if (target.className.indexOf('header-navEven') > -1 && target.tagName === 'LI') {
              target.className = 'header-navEven main-5-cl  main-1-f-h';
            }
          }, false);
        }
        if (this.$headerCusNav) {
          this.$headerCusNav.addEventListener('mouseover', function (e) {
            var target = e.target;
            if (target.tagName === 'A') {
              target.className = 'fill-3-bg main-5-cl';
            }
          }, false);
          this.$headerCusNav.addEventListener('mouseout', function (e) {
            var target = e.target;
            if (target.tagName === 'A') {
              target.className = 'text-2-cl g-3-cl-h';
            }
          }, false);
        }
        if (this.$appdownloadBtn) {
          this.$appdownloadBtn.addEventListener('mouseover', function () {
            _this3.$appdownloadBtn.className = 'common-button common-button-solid main-1-bg download-button text-1-cl main-2-bg';
          });
          this.$appdownloadBtn.addEventListener('mousedown', function () {
            _this3.$appdownloadBtn.className = 'common-button common-button-solid main-1-bg download-button text-1-cl main-3-bg';
          });
          this.$appdownloadBtn.addEventListener('mouseup', function () {
            _this3.$appdownloadBtn.className = 'common-button common-button-solid main-1-bg download-button text-1-cl main-1-bg';
          });
          this.$appdownloadBtn.addEventListener('mouseout', function () {
            _this3.$appdownloadBtn.className = 'common-button common-button-solid main-1-bg download-button text-1-cl main-1-bg';
          });
        }
        // 资产
        if (this.$headerAssetsNav) {
          this.$assetsNavText.addEventListener('mouseover', function () {
            _this3.getAssets();
          });
          // 总资产
          this.$assetsTotalFold.addEventListener('mouseover', function () {
            _this3.$assetsTotalFold.classList.add('special-2-bg');
          });
          this.$assetsTotalFold.addEventListener('mouseleave', function () {
            _this3.$assetsTotalFold.classList.remove('special-2-bg');
          });
          this.$assetsTotalFold.addEventListener('click', function () {
            window.location.href = '/assets/totalAssets';
          });
          // 眼睛
          this.$hideAssetsIcon.addEventListener('mouseover', function (e) {
            e.stopPropagation();
            _this3.$hideAssetsIcon.classList.add('special-2-bg');
            _this3.$assetsTotalFold.classList.remove('special-2-bg');
          });
          this.$hideAssetsIcon.addEventListener('mouseleave', function (e) {
            e.stopPropagation();
            _this3.$hideAssetsIcon.classList.remove('special-2-bg');
            _this3.$assetsTotalFold.classList.add('special-2-bg');
          });
          this.$hideAssetsIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            var isHide = getCookie('header_assets_hide') || false;
            isHide = !isHide;
            _this3.$assetsView.classList.toggle('hideHeaderAssets');
            setCookie('header_assets_hide', isHide);
          });
          // 操作区
          this.$assetsOperation.addEventListener('mouseover', function (e) {
            e.stopPropagation();
            _this3.$assetsTotalFold.classList.remove('special-2-bg');
          });
          this.$assetsOperation.addEventListener('mouseleave', function (e) {
            e.stopPropagation();
            _this3.$assetsTotalFold.classList.add('special-2-bg');
          });

          // 充值
          this.$rechargeButton.addEventListener('mouseover', function () {
            _this3.$rechargeButton.classList.remove('main-1-bg');
            _this3.$rechargeButton.classList.remove('main-3-bg');
            _this3.$rechargeButton.classList.add('main-2-bg');
          });
          this.$rechargeButton.addEventListener('mouseleave', function () {
            _this3.$rechargeButton.classList.add('main-1-bg');
            _this3.$rechargeButton.classList.remove('main-2-bg');
            _this3.$rechargeButton.classList.remove('main-3-bg');
          });
          this.$rechargeButton.addEventListener('mousedown', function () {
            _this3.$rechargeButton.classList.remove('main-1-bg');
            _this3.$rechargeButton.classList.remove('main-2-bg');
            _this3.$rechargeButton.classList.add('main-3-bg');
          });
          this.$rechargeButton.addEventListener('mouseup', function () {
            _this3.$rechargeButton.classList.remove('main-1-bg');
            _this3.$rechargeButton.classList.add('main-2-bg');
            _this3.$rechargeButton.classList.remove('main-3-bg');
          });
          this.$rechargeButton.addEventListener('click', function (e) {
            e.stopPropagation();
            window.location.href = '/assets/recharge';
          });
          // 资产审计
          this.$auditButton.addEventListener('mouseover', function () {
            _this3.$auditButton.classList.remove('main-1-bd', 'main-1-cl');
            _this3.$auditButton.classList.remove('main-3-bd', 'main-3-cl');
            _this3.$auditButton.classList.add('main-2-bd', 'main-2-cl');
          });
          this.$auditButton.addEventListener('mouseleave', function () {
            _this3.$auditButton.classList.add('main-1-bd', 'main-1-cl');
            _this3.$auditButton.classList.remove('main-2-bd', 'main-2-cl');
            _this3.$auditButton.classList.remove('main-3-bd', 'main-3-cl');
          });
          this.$auditButton.addEventListener('mousedown', function () {
            _this3.$auditButton.classList.remove('main-1-bd', 'main-1-cl');
            _this3.$auditButton.classList.remove('main-2-bd', 'main-2-cl');
            _this3.$auditButton.classList.add('main-3-bd', 'main-3-cl');
          });
          this.$auditButton.addEventListener('mouseup', function () {
            _this3.$auditButton.classList.remove('main-1-bd', 'main-1-cl');
            _this3.$auditButton.classList.add('main-2-bd', 'main-2-cl');
            _this3.$auditButton.classList.remove('main-3-bd', 'main-3-cl');
          });
          this.$auditButton.addEventListener('click', function (e) {
            e.stopPropagation();
            window.location.href = '/assets/balanceAudit';
          });
          // 账户
          this.$accountItemList.forEach(function (item) {
            item.addEventListener('mouseover', function () {
              item.classList.add('special-2-bg');
            });
            item.addEventListener('mouseleave', function () {
              item.classList.remove('special-2-bg');
            });
            item.addEventListener('click', function () {
              var data = item.dataset;
              var link = data.link;
              window.location.href = link;
            });
          });
        }
      }
    }, {
      key: "bindH5Event",
      value: function bindH5Event() {
        var _this4 = this;
        // 侧边导航打开
        this.$h5_navEnter.addEventListener('click', function () {
          document.body.style.overflow = 'hidden';
          _this4.$h5_headerNav.classList.add('active');
        });
        // 侧边导航关闭
        this.$h5_headerNavClose.addEventListener('click', function () {
          document.body.style.overflow = 'auto';
          _this4.$h5_headerNav.classList.remove('active');
        });
        // 切换主题
        this.$h5_themeList.forEach(function (item) {
          item.addEventListener('click', function () {
            var skin = item.dataset.skin;
            if (skin === '2' && _this4.cusSkinId === '1') {
              setCookie('cusSkin', '2');
            } else if (skin === '1' && _this4.cusSkinId === '2') {
              setCookie('cusSkin', '1');
            }
            myStorage.remove('exTradingViewData');
            myStorage.remove('exTradingViewDataH5');
            window.location.reload();
          });
        });
        // 侧边导航菜单点击
        this.$h5_navList.forEach(function (item) {
          var _item$dataset = item.dataset,
            expand = _item$dataset.expand,
            link = _item$dataset.link;
          item.addEventListener('click', function () {
            item.parentNode.classList.toggle('expand');
            if (expand === '0') {
              window.location.href = link;
            }
          });
        });
        // 侧边导航子菜单打开
        this.$h5_navChildList.forEach(function (item) {
          var link = item.dataset.link;
          item.addEventListener('click', function () {
            window.location.href = link;
          });
        });

        // 侧边语言选择
        this.$h5_navLanguage.addEventListener('click', function () {
          _this4.$h5_languageTab.dataset.tab = '1';
          _this4.$h5_languageListWrap.style.display = 'block';
          _this4.$h5_currencyListWrap.style.display = 'none';
          _this4.$h5_languageSideBar.classList.add('active');
        });
        // 侧边语言选择关闭
        this.$h5_langaugeClose.addEventListener('click', function () {
          _this4.$h5_languageSideBar.classList.remove('active');
        });
        // 侧边汇率选择
        this.$h5_currency.addEventListener('click', function () {
          _this4.$h5_languageTab.dataset.tab = '2';
          _this4.$h5_languageListWrap.style.display = 'none';
          _this4.$h5_currencyListWrap.style.display = 'block';
          _this4.$h5_languageSideBar.classList.add('active');
        });
        // 侧边汇率选择关闭
        this.$h5_langaugeClose.addEventListener('click', function () {
          _this4.$h5_languageSideBar.classList.remove('active');
        });
        // 语言选择tab
        this.$h5_languageTabItem.forEach(function (item) {
          item.addEventListener('click', function () {
            var tab = _this4.$h5_languageTab.dataset.tab;
            var index = item.dataset.index;
            if (tab !== index && index) {
              _this4.$h5_languageTab.dataset.tab = index;
              if (index === '1') {
                _this4.$h5_languageListWrap.style.display = 'block';
                _this4.$h5_currencyListWrap.style.display = 'none';
              } else {
                _this4.$h5_languageListWrap.style.display = 'none';
                _this4.$h5_currencyListWrap.style.display = 'block';
              }
            }
          });
        });
        // 选择语言
        this.$h5_languageList.forEach(function (item) {
          item.addEventListener('click', function () {
            var id = item.dataset.id;
            if (id !== _this4.currenLan) {
              window.location.href = "/".concat(id);
            }
          });
        });
        // 选择货币
        this.$h5_currencyList.forEach(function (item) {
          item.addEventListener('click', function () {
            var id = item.dataset.id;
            if (id !== window.userCurrency) {
              setCookie('user_Currency', id);
              window.location.reload();
            }
          });
        });
        // 个人中心入口点击
        this.$h5_personalEnter.addEventListener('click', function () {
          document.body.style.overflow = 'hidden';
          _this4.$h5_personalSideBar.classList.add('active');
        });
        // 个人中心关闭
        this.$h5_personalClose.addEventListener('click', function () {
          document.body.style.overflow = 'auto';
          _this4.$h5_personalSideBar.classList.remove('active');
        });
        // 用户ID复制
        this.$h5_personalIdCopy.addEventListener('click', function () {
          var input = document.createElement('input');
          input.style.position = 'absolute';
          input.style.opacity = '0';
          input.style.top = '9999px';
          input.readOnly = true;
          input.value = _this4.$h5_personalId.innerText;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
          // 复制成功
          emitter.emit('tip', {
            text: _this4.locale.copySuccess,
            type: 'success'
          });
        });
        // 退出登录
        if (this.$h5_logout) {
          this.$h5_logout.addEventListener('click', function () {
            if (!_this4.outFlag) {
              return;
            }
            _this4.outFlag = false;
            fetchData({
              url: '/fe-ex-api/user/login_out'
            }).then(function (data) {
              _this4.outFlag = true;
              if (data.code.toString() === '0') {
                emitter.emit('tip', {
                  text: _this4.locale.logout,
                  type: 'success'
                });
                location.reload();
              } else {
                emitter.emit('tip', {
                  text: data.msg,
                  type: 'error'
                });
              }
            });
          });
        }
      }
    }, {
      key: "bindLoginEvent",
      value: function bindLoginEvent(data) {
        var loginShowEle = document.querySelector('.common-header-h5 .isLogin-show');
        var notLoginOptions = document.querySelector('.common-header-h5 .sideBar-notLogin');
        if (loginShowEle) {
          loginShowEle.style.display = 'block';
        }
        if (notLoginOptions) {
          notLoginOptions.style.display = 'none';
        }
        if (this.$commonHeader.querySelector('.personalOverviewicon')) {
          this.$commonHeader.querySelector('.personalOverviewicon').innerHTML = getIconPath('personal_Overview', colorMap['text-2-cl']);
        }
        if (this.$commonHeader.querySelector('.goVeriicon')) {
          this.$commonHeader.querySelector('.goVeriicon').innerHTML = getIconPath('personal_kyc', colorMap['text-2-cl']);
        }
        if (this.$commonHeader.querySelector('.personalAccountSafetyicon')) {
          this.$commonHeader.querySelector('.personalAccountSafetyicon').innerHTML = getIconPath('personal_safetyRecord', colorMap['text-2-cl']);
        }
        if (this.$commonHeader.querySelector('.personalPaymenticon')) {
          this.$commonHeader.querySelector('.personalPaymenticon').innerHTML = getIconPath('paymentMethod', [colorMap['text-2-cl'], colorMap['text-2-cl']]);
        }
        if (this.$commonHeader.querySelector('.apiManagementicon')) {
          this.$commonHeader.querySelector('.apiManagementicon').innerHTML = getIconPath('personal_api', colorMap['text-2-cl']);
        }
        if (this.$commonHeader.querySelector('.taskCentericon')) {
          this.$commonHeader.querySelector('.taskCentericon').innerHTML = getIconPath('personal_taskCenter', colorMap['text-2-cl']);
        }
        if (this.$commonHeader.querySelector('.invite_friendsicon')) {
          this.$commonHeader.querySelector('.invite_friendsicon').innerHTML = getIconPath('personal_invite', colorMap['text-2-cl']);
        }
        if (this.$commonHeader.querySelector('.subAccounticon')) {
          this.$commonHeader.querySelector('.subAccounticon').innerHTML = getIconPath('personal_subAccount', colorMap['text-2-cl']);
        }
        this.$commonHeader.querySelector('.outicon').innerHTML = getIconPath('nav_top_personalcenter_quit', [colorMap['text-2-cl'], colorMap['text-2-cl']]);
        if (!data.profileImgUrl) {
          this.$commonHeader.querySelector('.avatarSelect').src = imgMap.headImg;
          this.$h5_personalHeadImg.src = imgMap.headImg;
        } else {
          this.$commonHeader.querySelector('.avatarSelect').src = data.profileImgUrl;
          this.$h5_personalHeadImg.src = data.profileImgUrl;
        }
        var $loginSet = Array.prototype.slice.call(this.$commonHeader.querySelectorAll('.login-set'));
        $loginSet.forEach(function (target) {
          // eslint-disable-next-line no-param-reassign
          target.style.display = 'flex';
        });
        var $unloginSet = Array.prototype.slice.call(this.$commonHeader.querySelectorAll('.unlogin-set'));
        $unloginSet.forEach(function (target) {
          // eslint-disable-next-line no-param-reassign
          target.style.display = 'none';
        });
        if (this.$commonHeader.querySelector('.userText')) {
          this.$commonHeader.querySelector('.userText span').innerHTML = data.userAccount;
        }
        if (this.$commonHeader.querySelector('.userStatus')) {
          this.$commonHeader.querySelector('.userStatus').innerHTML = "".concat(this.locale.userStatus, ": ").concat(this.userState[Number(data.accountStatus)]);
        }
        var colorStack = {
          0: 'warning-1-cl',
          1: 'rise-1-cl rise-4-bg',
          2: 'fall-1-cl fall-4-bg',
          3: 'text-2-cl special-2-bg',
          4: 'text-2-cl special-2-bg'
        };
        var colorStackH5 = {
          0: 'warning-1-cl warning-status-bg',
          1: 'rise-1-cl rise-4-bg',
          2: 'fall-1-cl fall-4-bg',
          3: 'text-2-cl fill-3-bg',
          4: 'text-2-cl fill-3-bg'
        };
        var iconColorStackH5 = {
          0: 'warning-1-cl',
          1: 'rise-1-cl',
          2: 'fall-1-cl',
          3: 'special-4-cl',
          4: 'special-4-cl'
        };
        var colorArr = colorStack[data.authLevel].split(' ').map(function (item) {
          return colorMap[item];
        });
        this.$commonHeader.querySelector('.svgJS').innerHTML = getIconPath('personal_attestation_certified', colorArr);
        if (this.$commonHeader.querySelector('.authSatus')) {
          this.$commonHeader.querySelector('.authTextJS').innerHTML = this.authText[data.authLevel];
          if (data.authLevel === 1) {
            this.$commonHeader.querySelector('.authSatus').style.background = 'rgba(233, 169, 42, 0.10)';
          }
          this.$commonHeader.querySelector('.authSatus').class = "authSatus ".concat(colorStack[data.authLevel]);
        }
        if (data.isSub && data.isSub === 1) {
          if (this.$subUserHide.length) {
            this.$subUserHide.forEach(function (item) {
              var event = item;
              event.style.display = 'none';
            });
          }
        }
        if (data.authLevel === 1) {
          if (this.$goSubAccount) {
            this.$goSubAccount.style.display = 'block';
          }
          if (this.$h5_subAccount) {
            this.$h5_subAccount.style.display = 'block';
          }
        }
        this.$h5_personalAccount.innerHTML = data.userAccount;
        this.$h5_personalId.innerHTML = data.id;
        this.$h5_personalStatus.className = "".concat(this.$h5_personalStatus.className, " ").concat(colorStackH5[data.authLevel]);
        this.$h5_personalStatusIcon.classList.add(iconColorStackH5[data.authLevel]);
        this.$h5_personalStatusText.innerHTML = this.authText[data.authLevel];
        var exAgentMenu = this.$h5_personalSideBar.querySelector('.nav-exAgent');
        if (exAgentMenu && Number(data.agentStatus) && Number(window.publicInfo.switch.agentUserOpen)) {
          exAgentMenu.style.display = 'block';
        }
        this.$h5_personalStatus.addEventListener('click', function () {
          window.location.href = '/personal/verification';
        });
      }
    }, {
      key: "add",
      value: function add(arg1, arg2) {
        var r1;
        var r2;
        var m = 0;
        try {
          r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
          r1 = 0;
        }
        try {
          r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
          r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
      }
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

      // 查询资产信息
    }, {
      key: "getAssets",
      value: function getAssets() {
        var _this5 = this;
        fetchData({
          url: '/fe-ex-api/finance/total_account_balance',
          method: 'post'
        }).then(function (_ref) {
          var code = _ref.code,
            data = _ref.data;
          if (code.toString() === '0') {
            var totalbalance = data.totalbalance,
              balance = data.balance,
              c2cBalance = data.c2cBalance,
              futuresBalance = data.futuresBalance,
              leverBalance = data.leverBalance,
              savingsBalance = data.savingsBalance,
              crossLeverBalance = data.crossLeverBalance,
              futuresGridBalance = data.futuresGridBalance;
            var rate = window.market.market.rate;
            var userCurrency = getCookie('user_Currency') || 'USD';
            var marginBalance = _this5.add(leverBalance, crossLeverBalance);
            var marginRate = _this5.add(data.leverRatio, data.crossLeverRatio);
            var robotFlag = Number(data.futuresGridSwitch) === 1;

            // 资产折合法币
            var totalBalanceFolded = _this5.thousands(fixRate(totalbalance, rate, 'BTC', userCurrency));
            var spotBalanceFolded = _this5.thousands(fixRate(balance, rate, 'BTC', userCurrency));
            var c2cBalanceFolded = _this5.thousands(fixRate(c2cBalance, rate, 'BTC', userCurrency));
            var futuresBalanceFolded = _this5.thousands(fixRate(futuresBalance, rate, 'BTC', userCurrency));
            var leverBalanceFolded = _this5.thousands(fixRate(marginBalance, rate, 'BTC', userCurrency));
            var savingsBalanceFolded = _this5.thousands(fixRate(savingsBalance, rate, 'BTC', userCurrency));
            var robotBalanceFolded = _this5.thousands(fixRate(futuresGridBalance, rate, 'BTC', userCurrency));
            // 比率
            var spotRatio = fixD(data.ratio * 100, 2);
            var c2cRatio = fixD(data.c2cRatio * 100, 2);
            var futuresRatio = fixD(data.futuresRatio * 100, 2);
            var leverRatio = fixD(marginRate * 100, 2);
            var savingsRatio = fixD(data.savingsRatio * 100, 2);
            var robotRatio = fixD(data.futuresGridRatio * 100, 2);
            if (robotFlag) {
              _this5.$headerAssetsNav.querySelector('.item_robot').style.display = 'flex';
            }
            _this5.$assetsTotalFold.querySelector('.totalFold-num').innerText = totalBalanceFolded;
            _this5.$accountItemList.forEach(function (item) {
              var dataInfo = item.dataset;
              var account = dataInfo.account;
              var itemPercent = item.querySelector('.item-percent.headerAssetsShow');
              var itemNum = item.querySelector('.item-num.headerAssetsShow');
              switch (account) {
                case 'spot':
                  itemPercent.innerText = "".concat(spotRatio, "%");
                  itemNum.innerText = spotBalanceFolded;
                  break;
                case 'c2c':
                  itemPercent.innerText = "".concat(c2cRatio, "%");
                  itemNum.innerText = c2cBalanceFolded;
                  break;
                case 'co':
                  itemPercent.innerText = "".concat(futuresRatio, "%");
                  itemNum.innerText = futuresBalanceFolded;
                  break;
                case 'lever':
                  itemPercent.innerText = "".concat(leverRatio, "%");
                  itemNum.innerText = leverBalanceFolded;
                  break;
                case 'savings':
                  itemPercent.innerText = "".concat(savingsRatio, "%");
                  itemNum.innerText = savingsBalanceFolded;
                  break;
                case 'robot':
                  itemPercent.innerText = "".concat(robotRatio, "%");
                  itemNum.innerText = robotBalanceFolded;
                  break;
                default:
                  break;
              }
            });
          }
        });
      }
    }, {
      key: "login",
      value: function login() {
        var _this6 = this;
        fetchData({
          method: 'post',
          url: '/fe-ex-api/common/user_info'
        }).catch(function () {}).then(function (data) {
          if (data) {
            if (!Number(data.code)) {
              window.isLogin = true;
              window.emitter.emit('login', data.data);
              _this6.bindLoginEvent(data.data);
              _this6.getTaskCount();
              _this6.getAssets();
              _this6.getCoAgentFlag(data.data);
            }
          }
        });
      }
    }, {
      key: "getMessage",
      value: function getMessage() {
        var _this7 = this;
        fetchData({
          url: '/fe-ex-api/message/v4/get_no_read_message_count',
          method: 'post'
          // eslint-disable-next-line no-unused-vars
        }).catch(function (error) {}).then(function (data) {
          if (data && !Number(data.code)) {
            if (data.data.noReadMsgCount) {
              var $headerUserMessage = _this7.$commonHeader.querySelector('.header-user-message');
              _this7.$commonHeader.querySelector('#messageMore').style.display = 'block';
              $headerUserMessage.classList.add('message-list');
              var userMessageList = data.data.userMessageList;
              var html = '';
              userMessageList.forEach(function (item) {
                html += "<li class=\"text-1-cl mesageNav\">\n                                    ".concat(item.messageContent, "\n                                </li>");
              });
              $headerUserMessage.querySelector('.header-user-text').innerHTML = html;
            }
          }
        });
      }

      // 获取任务中心任务数量
    }, {
      key: "getTaskCount",
      value: function getTaskCount() {
        var _this8 = this;
        fetchData({
          url: '/fe-task-api/task_complete_count',
          method: 'post'
          // eslint-disable-next-line no-unused-vars
        }).then(function (data) {
          if (data && !Number(data.code)) {
            if (data.data.count) {
              var taskMore = _this8.$commonHeader.querySelector('#taskMore');
              if (taskMore) {
                taskMore.style.display = 'block';
                _this8.$goTaskCenter.querySelector('.task-nodone').style.display = 'inline-block';
              }
            }
          }
        });
      }

      // 合约经纪人开关
    }, {
      key: "getCoAgentFlag",
      value: function getCoAgentFlag(userInfo) {
        var _this9 = this;
        fetchData({
          url: '/fe-co-api/co_agent_status',
          params: {
            companyId: window.companyId,
            // 现货商户id
            originUid: userInfo.id // 现货uid
          }
        }).then(function (data) {
          if (data.code.toString() === '0') {
            if (data.data.coAgentStatus) {
              var coAgentMenu = _this9.$h5_personalSideBar.querySelector('.nav-coAgent');
              if (coAgentMenu) {
                coAgentMenu.style.display = 'block';
              }
            }
          }
        });
      }
    }, {
      key: "getData",
      value: function getData() {
        this.login();
        this.getMessage();
        // this.getTaskCount();
      }
    }]);
  }();
  window.HeaderExtend = HeaderExtend;
})();