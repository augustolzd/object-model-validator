# Simple model validator.
[![Build Status](https://travis-ci.org/augustolzd/object-model-validator.svg?branch=master)](https://travis-ci.org/augustolzd/object-model-validator)

## Install

`npm i object-model-validator`

## Usage

``` javascript
  'use strict'

  const {types, ObjectModel} = require('object-model-validator')

  const model = await new ObjectModel({
    name: types.string,
    parse: (data) => {
      return `${data.name} is Ok`
    }
  }).validate({
    name: 'Validate object'
  }).then(result => {
    console.log(result)
  })
  // {name: 'Validate Object is Ok'}
```
### Custom Property
```javascript
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

console.log(model)
// { name: 'Models', lastName: 'Object', fullName: 'Models Object' }


```

## Types availables

- Integer `types.integer`
- Boolean `types.boolean`
- Object `types.object`
- String `types.string`
- Date `types.date`
- Moment `types.moment`

## Declaration key options

- `type` The type of value that the key must contain
- `in` Array of available values
- `parse` Function with data parameter equal to this and need return correct type value
- `optional` If is required or not default false
- `format` Only available in types.moment

## License

MIT