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
      data[keys[i]].value = null
      this[keys[i]] = data[keys[i]]
    }
    return this
  }
  /**
   * Main function to validate model
   * @param {Object} data - Object to be validated
   */
  validate (data) {
    if (typeof data !== 'object' || Array.isArray(data)) {
      throw new TypeError(`expecting data to be an object, got ${typeof data}`)
    }
    let dataKeys = Object.keys(data)
    let modelKeys = Object.keys(this)
    let nModel = Object.assign({}, this)
    if (dataKeys.length === 0) throw new Error('EmptyError Data need has some value')

    for (let i = 0; i < modelKeys.length; i++) {
      // check if value is optional
      if (this[modelKeys[i]].optional === true && data[modelKeys[i]] === undefined && this[modelKeys[i]].parse === undefined) continue
      if ((this[modelKeys[i]].optional === undefined || this[modelKeys[i]].optional === false) && data[modelKeys[i]] === undefined) {
        throw new Error(`${modelKeys[i]} is required`)
      }
      if (this[modelKeys[i]].type !== undefined) {
        if (this[modelKeys[i]].parse !== undefined) {
          data[modelKeys[i]] = this[modelKeys[i]].parse(data) || data[modelKeys[i]]
        }

        if (!this[modelKeys[i]].type.v(data[modelKeys[i]])) throw new TypeError(`The key value <| ${modelKeys[i]} |> of the object needs to be ${this[modelKeys[i]].type.e}`)
      } else {
        if (!this[modelKeys[i]].v(data[modelKeys[i]])) throw new TypeError(`The key value <| ${modelKeys[i]} |> of the object needs to be ${this[modelKeys[i]].e}`)
      }
      nModel[modelKeys[i]] = data[modelKeys[i]]
    }
    return nModel
  }
}
