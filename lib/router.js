'use strict';
const postsHandler = require('./posts-handler');
const utilsHandler = require('./utils-handler');

function route(req, res) {
    switch (req.url) {
        case '/posts':
            postsHandler.handle(req, res);
            break;
        case '/logout':
            utilsHandler.handleLogout(req, res);
            break;
        default:
            utilsHandler.handleNotFound(req, res);
            break;
    }
}

module.exports = {
    route: route,
};
