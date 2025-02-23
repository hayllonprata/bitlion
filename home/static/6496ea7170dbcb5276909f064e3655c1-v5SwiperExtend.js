"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function () {
  var SwiperExtend = /*#__PURE__*/function () {
    function SwiperExtend() {
      _classCallCheck(this, SwiperExtend);
    }
    return _createClass(SwiperExtend, [{
      key: "init",
      value: function init() {
        this.$swiper = document.querySelector('#swiper-wrap');
        this.$slideList = this.$swiper.querySelector('.slide-list');
        this.$slideItem = this.$swiper.querySelectorAll('.slide-item');
        if (this.$slideItem.length > 4) {
          this.$prev = this.$swiper.querySelector('.prev-btn');
          this.$next = this.$swiper.querySelector('.next-btn');
          this.setBtnStyle();
        }
        this.activeIndex = 0;
        this.len = Math.ceil(this.$slideItem.length / 4);
        this.bindEvent();
      }
    }, {
      key: "bindEvent",
      value: function bindEvent() {
        var _this = this;
        if (this.$slideItem.length > 4) {
          this.$prev.addEventListener('click', function () {
            if (_this.activeIndex > 0) {
              _this.activeIndex -= 1;
              _this.setBtnStyle();
              _this.$slideList.style.transform = "translate3d(-".concat(_this.activeIndex * 1212, "px, 0, 0)");
            }
          });
          this.$next.addEventListener('click', function () {
            if (_this.activeIndex < _this.len - 1) {
              _this.activeIndex += 1;
              _this.setBtnStyle();
              _this.$slideList.style.transform = "translate3d(-".concat(_this.activeIndex * 1212, "px, 0, 0)");
            }
          });
          var button = document.querySelector('.banner-btn');
          if (button) {
            button.addEventListener('mouseover', function () {
              button.classList.remove('main-1-bg');
              button.classList.add('main-2-bg');
            });
            button.addEventListener('mouseleave', function () {
              button.classList.remove('main-2-bg');
              button.classList.add('main-1-bg');
            });
            button.addEventListener('mousedown', function () {
              button.classList.remove('main-2-bg');
              button.classList.add('main-3-bg');
            });
            button.addEventListener('mouseup', function () {
              button.classList.remove('main-3-bg');
              button.classList.add('main-2-bg');
            });
          }
        }
      }
    }, {
      key: "setBtnStyle",
      value: function setBtnStyle() {
        if (this.activeIndex === 0) {
          this.$prev.style.cursor = 'not-allowed';
        } else {
          this.$prev.style.cursor = 'pointer';
        }
        if (this.activeIndex === this.len - 1) {
          this.$next.style.cursor = 'not-allowed';
        } else {
          this.$next.style.cursor = 'pointer';
        }
      }
    }]);
  }();
  window.SwiperExtend = SwiperExtend;
})();