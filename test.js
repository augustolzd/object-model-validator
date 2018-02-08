'use strict'

const expect = require('chai').expect
const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const {types, ObjectModel} = require('./src')
const Moment = require('moment')

describe('String validation', () => {
  it('Valid string', async () => {
    const model = await new ObjectModel({
      'name': types.string
    }).validate({name: 'Model', last_name: 'Parse'})
    expect(model.name === 'Model').to.equal(true)
  })

  it('Invalid string', async () => {
    await new ObjectModel({
      'name': {
        name: 'custom field name',
        type: types.string
      }
    }).validate({name: true}).catch(e => {
      expect(true).to.equal(true)
    })
  })
})

describe('Integer validation', () => {
  it('Valid integer', async () => {
    const model = await new ObjectModel({
      'number': {
        type: types.integer
      }
    }).validate({
      number: 1
    })
    expect(model.number === 1).to.equal(true)
  })

  it('Invalid integer', async () => {
    const model = new ObjectModel({
      'number': {
        type: types.integer
      }
    })
    try {
      await model.validate({
        number: '1'
      })
    } catch (e) {
      expect(true).to.equal(true)
    }
  })
})

describe('Required validation', () => {
  it('Require key', async () => {
    const model = new ObjectModel({
      'name': {
        type: types.string
      },
      'mail': {
        type: types.string
      }
    })
    try {
      await model.validate({
        name: 'Models'
      })
    } catch (error) {
      expect(true).to.equal(true)
    }
  })

  it('Optional key', async () => {
    const model = await new ObjectModel({
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

  it('Optional key but check if has error', async () => {
    const model = new ObjectModel({
      'name': types.string,
      'mail': {
        type: types.string,
        optional: true
      }
    })
    try {
      await model.validate({
        name: 'Models',
        mail: 1
      })
    } catch (error) {
      expect(true).to.equal(true)
    }
  })
})

describe('Date type validation', () => {
  it('Date valid', async () => {
    let model = await new ObjectModel({date: types.date})
    .validate({date: new Date()})
    expect(model.date instanceof Date).to.equal(true)
  })

  it('Date invalid', async () => {
    let model = new ObjectModel({date: types.date})
    try {
      await model.validate({'date': '2018-02-05 12:00:00'})
    } catch (error) {
      expect(true).to.equal(true)
    }
  })
})

describe('Dinamic propiety', () => {
  it('New string', async () => {
    let model = await new ObjectModel({
      name: types.string,
      lastName: types.string,
      fullName: {
        optional: true,
        type: types.string,
        parse: (data) => {
          return `${data.name} ${data.lastName}`
        }
      }
    }).validate({name: 'Models', lastName: 'Object'})
    expect(model.fullName === 'Models Object').to.equal(true)
  })
})

describe('Moment Validation', () => {
  it('Moment date with format', async () => {
    let model = await new ObjectModel({
      date: {
        type: types.moment,
        format: 'YYYY-MM-DD HH:mm:ss'
      }
    }).validate({date: Moment()})
    expect(typeof model.date === 'string').to.equal(true)
  })
})

describe('Custom key name', () => {
  it('Custom Name', async () => {
    await new ObjectModel({
      name_something: {
        type: types.string,
        name: 'My custom key name'
      }
    }).validate({something: 'nothing'}).catch(e => {
      expect(e.message === 'My custom key name is required').to.equal(true)
    })
  })
})

describe('Check values in parameters', () => {
  it('In parameter', async () => {
    await new ObjectModel({
      number: {
        type: types.integer,
        in: [1, 2]
      }
    }).validate({number: 2}).then(r => {
      expect(r.number === 2).to.equal(true)
    })
  })
})
