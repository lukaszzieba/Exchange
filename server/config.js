var path = require('path'),
    rootPath = path.normalize(__dirname + '/..')

module.exports = {
    rootPath: rootPath,
    db: 'mongodb://localhost/exchange',
    port: 8080,
    secret: 'asdqwezxc'
};
