'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
exports.readShebang = function (filename, encoding, bytes, cb) {
    if (typeof cb !== 'function') {
        throw new Error("callback passed to '" + exports.readShebang.name + "' must be a function.");
    }
    fs.open(filename, 'r+', function (err, fd) {
        if (err) {
            return cb(err);
        }
        var b = Buffer.alloc(100);
        fs.read(fd, b, 0, 100, 0, function (err, bytesRead, buf) {
            if (err) {
                return cb(err);
            }
            var firstLine = String(String(buf).split('\n')[0]).trim();
            var hasShebang = String(firstLine).startsWith('#!');
            cb(null, {
                bytesRead: bytesRead,
                buffer: buf,
                executable: 'node',
                hasShebang: hasShebang,
                shebangStr: firstLine || '',
                firstLine: firstLine
            });
        });
    });
};
