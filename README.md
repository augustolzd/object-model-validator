# Simple model validator.
[![Build Status](https://travis-ci.org/augustolzd/object-model-validator.svg?branch=master)](https://travis-ci.org/augustolzd/object-model-validator)

## Install

`npm i object-model-validator`

## Usage

``` javascript
  'use strict'

  const {types, ObjectModel} = require('./src')

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

## Types availables

- Integer `types.integer`
- Boolean `types.boolean`
- Object `types.object`
- String `types.string`
- Date `types.date`

## License

MIT