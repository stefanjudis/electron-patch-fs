# electron-patch-fs

Monkey patch electrons fs functions with the original ones

Electron patch the `fs` functions `open` and `openSync` which can lead to
errors when dealing with `.asar` file operations.

## Install

```
npm install electron-patch-fs
```

## Basic usage

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

--------------------------------------------------------

#### I want to thank all these [people](./THANKS.md) for their great work!!!


## License

MIT
