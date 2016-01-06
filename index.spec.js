import test from 'ava';
import proxyquire from 'proxyquire';
import fs from 'fs';

proxyquire.noCallThru();

let patcher = proxyquire(
  './index',
  {
    'original-fs' : {
      open : function() { foo; }
    }
  }
);

let originalOpen;

test.before( () => {
  originalOpen = fs.open;

  fs.open = function() {};
} );

test( 'patch', function( t ) {
  patcher.patch();

  t.notSame( fs.open.toString(), 'function () {}' );

  t.throws( function() {
    patcher.patch();
  } );
} );

test( 'unpatch', function( t ) {
  patcher.unpatch();

  t.same( fs.open.toString(), 'function () {}' );

  t.throws( function() {
    patcher.unpatch();
  } );
} );

test.after( () => {
  fs.open = originalOpen;
} );
