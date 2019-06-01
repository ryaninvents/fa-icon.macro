# fa-icon.macro

> Import SVG files to use as [`@fortawesome/react-fontawesome`](https://www.npmjs.com/package/@fortawesome/react-fontawesome) icons

[![CircleCI][circleci-image]][circleci-url]
[![semantic-release][semantic-release-image]][semantic-release-url]
[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

## Installation

```bash
npm install --save-dev fa-icon.macro
```

## Usage

```js
import React from 'react';
import createIcon from 'fa-icon.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const myIcon = Object.assign(
  createIcon('./logo.svg'),
  {
    iconName: 'my-logo'
  }
);

export default function Example() {
  return (
    <div>
      Here is my logo! <FontAwesomeIcon icon={myIcon} />
    </div>
  );
}
```


[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[semantic-release-url]: https://github.com/semantic-release/semantic-release

[circleci-image]: https://img.shields.io/circleci/project/github/ryaninvents/fa-icon.macro/master.svg?logo=circleci

[circleci-url]: https://circleci.com/gh/ryaninvents/fa-icon.macro
