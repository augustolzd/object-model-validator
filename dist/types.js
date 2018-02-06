'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Moment = require('moment');
module.exports = {
  'string': {
    v: function v(data) {
      return typeof data === 'string';
    },
    e: 'a String'
  },
  'boolean': {
    v: function v(data) {
      return typeof data === 'boolean';
    },
    e: 'a Boolean'
  },
  'object': {
    v: function v(data) {
      var empty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!empty) {
        return Array.isArray(data) === false && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && Object.keys(data).length > 0;
      } else {
        if (data === null) return true;
        return Array.isArray(data) === false && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object';
      }
    },
    e: 'an object and can´t be empty'
  },
  'integer': {
    v: function v(data) {
      return Number.isInteger(data);
    },
    e: 'an integer'
  },
  'date': {
    v: function v(data) {
      return data instanceof Date;
    },
    e: 'a Date Object'
  },
  'moment': {
    v: function v(data) {
      return Moment.isMoment(data);
    },
    e: 'a moment object'
  }
};