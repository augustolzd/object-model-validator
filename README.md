# Simple model validator.
[![Build Status](https://travis-ci.org/augustolzd/object-model-validator.svg?branch=master)](https://travis-ci.org/augustolzd/object-model-validator)

## Install

`npm i object-model-validator`

## Usage

``` javascript
  'use strict'

  const {types, ObjectModel} = require('object-model-validator')

  const model = new ObjectModel({
    name: types.string,
    parse: (data) => {
      return `${data.name} is Ok`
    }
  })

  let myObjectToValidate = {
    name: 'Validate object'
  }

  console.log(model.validate(myObjectToValidate))
  // {name: 'Validate Object is Ok'}
```
### Custom Property
```javascript
let model = new ObjectModel({
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

## License

MIT