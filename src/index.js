'use strict'
const types = require('./types')
exports.types = types

/**
 * It's A simple Object Model validation wrote in javascript
 */
exports.ObjectModel = class ObjectModel {
  constructor (data) {
    if (typeof data !== 'object' || Array.isArray(data)) throw new TypeError('Unexpected data object')
    let keys = Object.keys(data)

    for (let i = 0; i < keys.length; i++) {
      if (data[keys[i]].type === undefined && data[keys[i]].v === undefined) throw new Error('Type not specified or invalid')
      if (data[keys[i]].format !== undefined && typeof data[keys[i]].format !== 'string') throw new TypeError('Only string format')
      data[keys[i]].value = null
      this[keys[i]] = data[keys[i]]
    }
    return this
  }
  /**
   * Main function to validate model
   * @param {Object} data - Object to be validated
   */
  async validate (data) {
    let model = await new Promise((resolve, reject) => {
      if (typeof data !== 'object' || Array.isArray(data)) {
        reject(new TypeError(`Expecting data to be an object, got ${typeof data}`))
      }
      let dataKeys = Object.keys(data)
      let modelKeys = Object.keys(this)
      let nModel = Object.assign({}, this)
      if (dataKeys.length === 0) return reject(new Error('EmptyError Data need has some value'))
      for (let i = 0; i < modelKeys.length; i++) {
        if (this[modelKeys[i]].in !== undefined && Array.isArray(this[modelKeys[i]].in) === false) return reject(new TypeError('In propiety expect an array'))
        if (this[modelKeys[i]].in !== undefined && Array.isArray(this[modelKeys[i]].in) && this[modelKeys[i]].in.length === 0) return reject(new TypeError('In propiety can´t be empty'))
        if (this[modelKeys[i]].optional === true && data[modelKeys[i]] === undefined && this[modelKeys[i]].parse === undefined) continue
        if ((this[modelKeys[i]].optional === undefined || this[modelKeys[i]].optional === false) && data[modelKeys[i]] === undefined) {
          return reject(new Error(`${this[modelKeys[i]].name || modelKeys[i]} is required`))
        }
        if (this[modelKeys[i]].parse !== undefined) {
          data[modelKeys[i]] = this[modelKeys[i]].parse(data) || data[modelKeys[i]]
        }

        if ((this[modelKeys[i]].type || this[modelKeys[i]]).v(data[modelKeys[i]]) === false) {
          return reject(new TypeError(`The key value <| ${this[modelKeys[i]].name || modelKeys[i]} |> of the object needs to be ${this[modelKeys[i]].type !== undefined ? this[modelKeys[i]].type.e : this[modelKeys[i]].e}`))
        }

        if (this[modelKeys[i]].type === types.moment && !data[modelKeys[i]].isValid()) {
          return reject(new Error('Invalid date format'))
        }
        if (this[modelKeys[i]].format !== undefined && this[modelKeys[i]].type === types.moment) {
          data[modelKeys[i]] = data[modelKeys[i]].format(this[modelKeys[i]].format)
        }

        if (this[modelKeys[i]].in !== undefined) {
          if (this[modelKeys[i]].in.indexOf(data[modelKeys[i]]) < 0) return reject(new Error(`${this[modelKeys[i]].name || modelKeys[i]} need to be equal to ${this[modelKeys[i]].in.toString()}`))
        }
        nModel[modelKeys[i]] = data[modelKeys[i]]
      }
      resolve(nModel)
    })
    return model
  }
}
