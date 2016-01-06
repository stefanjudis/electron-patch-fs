'use strict';

let original = require( 'original-fs' );
let fs       = require( 'fs' );

/**
 * Modules and functions to be patched
 *
 * @type {Array}
 */
const PATCHES = Object.keys( original );


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

  PATCHES.forEach( function( patch ) {
    cache[ patch ] = fs[ patch ];

    fs[ patch ] = original[ patch ];
  } );
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

  PATCHES.forEach( function( patch ) {
    fs[ patch ] = cache[ patch ];
  } );

  cache = {};
}

module.exports = {
  patch   : patch,
  unpatch : unpatch
};
