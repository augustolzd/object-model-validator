const Moment = require('moment')
module.exports = {
  'string': {
    v: (data) => {
      return typeof data === 'string'
    },
    e: 'a String'
  },
  'boolean': {
    v: (data) => {
      return typeof data === 'boolean'
    },
    e: 'a Boolean'
  },
  'object': {
    v: (data, empty = false) => {
      if (!empty) {
        return Array.isArray(data) === false &&
        typeof data === 'object' &&
        Object.keys(data).length > 0
      } else {
        if (data === null) return true
        return Array.isArray(data) === false &&
        typeof data === 'object'
      }
    },
    e: 'an object and can´t be empty'
  },
  'integer': {
    v: (data) => {
      return Number.isInteger(data)
    },
    e: 'an integer'
  },
  'date': {
    v: (data) => {
      return data instanceof Date
    },
    e: 'a Date Object'
  },
  'moment': {
    v: (data) => {
      return Moment.isMoment(data)
    },
    e: 'a moment object'
  }
}
