'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var types = require('./types');
exports.types = types;

/**
 * It's A simple Object Model validation wrote in javascript
 */
exports.ObjectModel = function () {
  function ObjectModel(data) {
    _classCallCheck(this, ObjectModel);

    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' || Array.isArray(data)) throw new TypeError('Unexpected data object');
    var keys = Object.keys(data);

    for (var i = 0; i < keys.length; i++) {
      if (data[keys[i]].type === undefined && data[keys[i]].v === undefined) throw new Error('Type not specified or invalid');
      if (data[keys[i]].format !== undefined && typeof data[keys[i]].format !== 'string') throw new TypeError('Only string format');
      data[keys[i]].value = null;
      this[keys[i]] = data[keys[i]];
    }
    return this;
  }
  /**
   * Main function to validate model
   * @param {Object} data - Object to be validated
   */


  _createClass(ObjectModel, [{
    key: 'validate',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
        var _this = this;

        var model;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return new Promise(function (resolve, reject) {
                  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' || Array.isArray(data)) {
                    reject(new TypeError('Expecting data to be an object, got ' + (typeof data === 'undefined' ? 'undefined' : _typeof(data))));
                  }
                  var dataKeys = Object.keys(data);
                  var modelKeys = Object.keys(_this);
                  var nModel = Object.assign({}, _this);
                  if (dataKeys.length === 0) return reject(new Error('EmptyError Data need has some value'));
                  for (var i = 0; i < modelKeys.length; i++) {
                    if (_this[modelKeys[i]].in !== undefined && Array.isArray(_this[modelKeys[i]].in) === false) return reject(new TypeError('In propiety expect an array'));
                    if (_this[modelKeys[i]].in !== undefined && Array.isArray(_this[modelKeys[i]].in) && _this[modelKeys[i]].in.length === 0) return reject(new TypeError('In propiety can´t be empty'));
                    if (_this[modelKeys[i]].optional === true && data[modelKeys[i]] === undefined && _this[modelKeys[i]].parse === undefined) continue;
                    if ((_this[modelKeys[i]].optional === undefined || _this[modelKeys[i]].optional === false) && data[modelKeys[i]] === undefined) {
                      return reject(new Error((_this[modelKeys[i]].name || modelKeys[i]) + ' is required'));
                    }
                    if (_this[modelKeys[i]].parse !== undefined) {
                      data[modelKeys[i]] = _this[modelKeys[i]].parse(data) || data[modelKeys[i]];
                    }

                    if ((_this[modelKeys[i]].type || _this[modelKeys[i]]).v(data[modelKeys[i]]) === false) {
                      return reject(new TypeError('The key value <| ' + (_this[modelKeys[i]].name || modelKeys[i]) + ' |> of the object needs to be ' + (_this[modelKeys[i]].type !== undefined ? _this[modelKeys[i]].type.e : _this[modelKeys[i]].e)));
                    }
                    if (_this[modelKeys[i]].format !== undefined && _this[modelKeys[i]].type === types.moment) {
                      data[modelKeys[i]] = data[modelKeys[i]].format(_this[modelKeys[i]].format);
                    }

                    if (_this[modelKeys[i]].in !== undefined) {
                      if (_this[modelKeys[i]].in.indexOf(data[modelKeys[i]]) < 0) return reject(new Error((_this[modelKeys[i]].name || modelKeys[i]) + ' need to be equal to ' + _this[modelKeys[i]].in.toString()));
                    }
                    nModel[modelKeys[i]] = data[modelKeys[i]];
                  }
                  resolve(nModel);
                });

              case 2:
                model = _context.sent;
                return _context.abrupt('return', model);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validate(_x) {
        return _ref.apply(this, arguments);
      }

      return validate;
    }()
  }]);

  return ObjectModel;
}();