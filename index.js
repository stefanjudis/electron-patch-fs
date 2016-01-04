'use strict';

let originals = require( './original/index' );


/**
 * Modules and functions to be patched
 *
 * @type {Array}
 */
const PATCHES = [
  {
    name : 'fs',
    fns  : [ 'open', 'openSync' ]
  }
];


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
      '`patch` was called again. Make sure you called `unpatch` before.'
    );
  }

  PATCHES.forEach( function( patch ) {
    var module = require( patch.name );

    patch.fns.forEach( function( fn ) {
      if ( ! cache[ patch.name ] ) {
        cache[ patch.name ] = {};
      }

      cache[ patch.name ][ fn ] = module[ fn ];

      module[ fn ] = originals[ patch.name ][ fn ];
    } );
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
    var module = require( patch.name );

    patch.fns.forEach( function( fn ) {
      module[ fn ] = cache[ patch.name ][ fn ];
    } );
  } );

  cache = {};
}

module.exports = {
  patch   : patch,
  unpatch : unpatch
};
