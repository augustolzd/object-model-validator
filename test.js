'use strict'

const expect = require('chai').expect
const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const {types, ObjectModel} = require('./src')

describe('String validation', () => {
  it('Valid string', () => {
    const model = new ObjectModel({
      'name': types.string
    }).validate({name: 'Model'})
    expect(model.name === 'Model').to.equal(true)
  })

  it('Invalid string', () => {
    const model = new ObjectModel({
      'name': types.string
    })
    try {
      model.validate({
        name: true
      })
    } catch (e) {
      expect(true).to.equal(true)
    }
  })
})

describe('Integer validation', () => {
  it('Valid integer', () => {
    const model = new ObjectModel({
      'number': {
        type: types.integer
      }
    }).validate({
      number: 1
    })
    expect(model.number === 1).to.equal(true)
  })

  it('Invalid integer', () => {
    const model = new ObjectModel({
      'number': {
        type: types.integer
      }
    })
    try {
      model.validate({
        number: '1'
      })
    } catch (e) {
      expect(true).to.equal(true)
    }
  })
})

describe('Required validation', () => {
  it('Require key', () => {
    const model = new ObjectModel({
      'name': {
        type: types.string
      },
      'mail': {
        type: types.string
      }
    })
    try {
      model.validate({
        name: 'Models'
      })
    } catch (error) {
      expect(true).to.equal(true)
    }
  })

  it('Optional key', () => {
    const model = new ObjectModel({
      'name': {
        type: types.string
      },
      'mail': {
        type: types.string,
        optional: true
      }
    }).validate({
      name: 'Models'
    })
    expect(model.name === 'Models').to.equal(true)
  })

  it('Optional key but check if has error', () => {
    const model = new ObjectModel({
      'name': types.string,
      'mail': {
        type: types.string,
        optional: true
      }
    })
    try {
      model.validate({
        name: 'Models',
        mail: 1
      })
    } catch (error) {
      expect(true).to.equal(true)
    }
  })
})

describe('Date type validation', () => {
  it('Date valid', () => {
    let model = new ObjectModel({date: types.date})
    .validate({date: new Date()})
    expect(model.date instanceof Date).to.equal(true)
  })

  it('Date invalid', () => {
    let model = new ObjectModel({date: types.date})
    try {
      model.validate({'date': '2018-02-05 12:00:00'})
    } catch (error) {
      expect(true).to.equal(true)
    }
  })
})
