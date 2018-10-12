'use strict';
const postsHandler = require('./posts-handler');
const utilsHandler = require('./utils-handler');

function route(req, res) {
    switch (req.url) {
        case '/posts':
            postsHandler.handle(req, res);
            break;
        case '/logout':
            console.info('ログアウトします');
            res.writeHead(401, {
                'Content-Type': 'text/plain; charset=utf-8'
            });
            res.end('ログアウトしました');
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
