const path = require('path')

module.exports = {
    entry: './js/register.js',
    output: {
        filename: 'bundle.js'
        path: path.resolve(__dirname, 'dist')
    }
};