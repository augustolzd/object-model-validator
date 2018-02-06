# Simple model validator.

## How to install

`npm i object-model-validator`

## How to use

``` javascript
  'use strict'

  const {types, validate, ObjectModel} = require('./src')

  const model = new ObjectModel({
    name: types.string,
    parse: (data) => {
      return `${data} is Ok`
    }
  }))

  let myObjectToValidate = {
    name: 'Validate object'
  }

  console.log(model.validate(myObjectToValidate))
  // {name: 'Validate Object is Ok'}
```