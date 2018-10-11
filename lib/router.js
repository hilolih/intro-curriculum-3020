'use strict';
const postsHandler = require('./posts-handler');

function route(req, res) {
    switch (req.url) {
        case '/posts':
            postsHandler.handle(req, res);
            break;
        case '/logout':
            console.info('ログアウトします');
            res.writeHead(402, {
                'Location': '/posts'
            });
            res.end();
        default:
            break;
    }
}

module.exports = {
    route: route
};
