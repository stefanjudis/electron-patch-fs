'use strict';

let original = require( 'original-fs' );
let fs       = require( 'fs' );


/**
 * Object cache for electron functions
 *
 * @type {Object}
 */
let cache = {};


/**
 * Monkey patch the functions that were
 * changed by electron
 */
function patch() {
  if ( Object.keys( cache ).length ) {
    throw new Error(
      '`patch` was called multiple times. Make sure you called `unpatch` before.'
    );
  }

  for ( var patch in original ) {
    cache[ patch ] = fs[ patch ];

    // some properties are read-only and
    // can't be reassigned
    try {
      fs[ patch ] = original[ patch ];
    } catch( e ) {
      delete cache[ patch ];
    }
  }
}


/**
 * Undo monkey patch of the functions that were
 * changed by electron
 */
function unpatch() {
  if ( ! Object.keys( cache ).length ) {
    throw new Error(
      'Nothing to unpatch. Make sure you called `patch` before'
    );
  }

  for ( var patch in cache ) {
    fs[ patch ] = cache[ patch ];
  }

  cache = {};
}

module.exports = {
  patch   : patch,
  unpatch : unpatch
};
