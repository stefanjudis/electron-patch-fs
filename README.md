[![Build Status](http://img.shields.io/travis/stefanjudis/electron-patch-fs.svg?style=flat)](https://travis-ci.org/stefanjudis/electron-patch-fs) [![npm version](http://img.shields.io/npm/v/electron-patch-fs.svg?style=flat)](https://www.npmjs.org/package/electron-patch-fs) [![npm downloads](http://img.shields.io/npm/dm/electron-patch-fs.svg?style=flat)](https://www.npmjs.org/package/electron-patch-fs) [![Coverage Status](http://img.shields.io/coveralls/stefanjudis/electron-patch-fs.svg?style=flat)](https://coveralls.io/r/stefanjudis/electron-patch-fs?branch=master) [![Uses greenkeeper.io](https://img.shields.io/badge/Uses-greenkeeper.io-green.svg)](http://greenkeeper.io/)


# electron-patch-fs

Monkey patch electrons fs functions with the original ones

Electron patches the native `fs` functions `open` and `openSync` which can lead to errors when dealing with `.asar` file operations like copying and unzipping.

To avoid these errors `electron-patch-fs` brings back the native functionality.

## Install

```
npm install electron-patch-fs
```

## Basic usage

### `patchFs.patch()`

Monkey patch the file system functions and replace them with the original ones.
This goes for the functions `open` and `openSync`.

**Note:** Repeated calls will throw an exception ( unpatch first again ).

### `patchFs.unpatch()`

Undo monkey patch and bring back electrons patched fs functions.

**Note:** Repeated calls will throw an exception ( patch first ).


### Example

```javascript
const patchFs = require( 'electron-patch-fs' );
const fs      = require( 'fs' );

// monkey patch the file system functions
// and replace them with the original ones
patchFs.patch();

fs.open( '/some/path/foo.asar', 'r', function() {
  // undo monkey patch and bring back electrons
  // patched fs functions
  patchFs.unpatch();
} );
```

### Thanks

I want to thank all these [people](./THANKS.md) for their great work!!!

### License

MIT
