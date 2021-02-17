const routes = require('next-routes')();

routes
    .add('/pictures/new', '/pictures/new')
    .add('/', '/')
    .add('/pictures/:address/show', 'pictures/show');

module.exports = routes;