'use strict';

import fs = require('fs');

///////////////////////////////////////////////////////////

export interface RSData {
  shebangStr: string,
  bytesRead: number,
  buffer: Buffer,
  executable: string,
  hasShebang: boolean
  firstLine: string
}


//  !!! https://kev.inburke.com/kevin/node-js-string-encoding/
// !!! https://github.com/nodejs/help/issues/988


export type RSCallback = (err: Error | null, d?: RSData) => void;

export const readShebang = function (filename: string, encoding: string, bytes: number, cb: RSCallback) {
  
  if (typeof cb !== 'function') {
    throw new Error(`callback passed to '${readShebang.name}' must be a function.`);
  }
  
  fs.open(filename, 'r+', function (err, fd) {
    
    if (err) {
      return cb(err);
    }
    
    const b = Buffer.alloc(100);
    
    fs.read(fd, b, 0, 100, 0, function (err, bytesRead, buf) {
      
      if (err) {
        return cb(err);
      }
  
      const firstLine = String(String(buf).split('\n')[0]).trim();
      const hasShebang = String(firstLine).startsWith('#!');
      
      cb(null, {
        bytesRead,
        buffer: buf,
        executable: 'node',
        hasShebang,
        shebangStr: firstLine || '',
        firstLine: firstLine
      });
      
    });
  });
  
};




