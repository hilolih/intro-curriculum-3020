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
            res.writeHead(404, {
                'Content-Type': 'text/plain; charset=utf-8'
            });
            res.end('ページがみつかりません');
            break;
    }
}

module.exports = {
    route: route
};
