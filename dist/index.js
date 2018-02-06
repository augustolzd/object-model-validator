'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var types = require('./types');
exports.types = types;

exports.ObjectModel = function () {
  function ObjectModel(data) {
    _classCallCheck(this, ObjectModel);

    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' || Array.isArray(data)) throw new TypeError('Unexpected data object');
    var keys = Object.keys(data);

    for (var i = 0; i < keys.length; i++) {
      if (data[keys[i]].type === undefined && data[keys[i]].v === undefined) throw new Error('Type not specified or invalid');
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
    value: function validate(data) {
      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' || Array.isArray(data)) {
        throw new TypeError('expecting data to be an object, got ' + (typeof data === 'undefined' ? 'undefined' : _typeof(data)));
      }
      var dataKeys = Object.keys(data);
      var modelKeys = Object.keys(this);
      var nModel = Object.assign({}, this);
      if (dataKeys.length === 0) throw new Error('EmptyError Data need has some value');

      for (var i = 0; i < modelKeys.length; i++) {
        // check if value is optional
        if (this[modelKeys[i]].optional === true && data[modelKeys[i]] === undefined) continue;
        if ((this[modelKeys[i]].optional === undefined || this[modelKeys[i]].optional === false) && data[modelKeys[i]] === undefined) {
          throw new Error(modelKeys[i] + ' is required');
        }
        if (this[modelKeys[i]].type !== undefined) {
          if (!this[modelKeys[i]].type.v(data[modelKeys[i]])) throw new TypeError('The key value <| ' + modelKeys[i] + ' |> of the object needs to be ' + this[modelKeys[i]].type.e);
        } else {
          if (!this[modelKeys[i]].v(data[modelKeys[i]])) throw new TypeError('The key value <| ' + modelKeys[i] + ' |> of the object needs to be ' + this[modelKeys[i]].e);
        }
        if (this[modelKeys[i]].parse !== undefined) {
          nModel[modelKeys[i]] = this[modelKeys[i]].parse(data[modelKeys[i]]) || data[modelKeys[i]];
        } else {
          nModel[modelKeys[i]] = data[modelKeys[i]];
        }
      }
      return nModel;
    }
  }]);

  return ObjectModel;
}();