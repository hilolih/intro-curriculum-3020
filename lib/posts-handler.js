'use strict';
const pug = require('pug');
const Cookies = require('cookies');
const utilsHandler = require('./utils-handler');
const Post = require('./post');
const trackingIdKey = 'trackingId';

function handle(req, res) {
    const cookies = new Cookies(req, res);
    addTrackingCookie(cookies);
    switch (req.method) {
        case 'GET':
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            Post.findAll({order:[['id', 'DESC']]}).then((posts) => {
                res.end(pug.renderFile('./views/posts.pug', {posts: posts}));
            });
            break;
        case 'POST':
            let body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                const decoded = decodeURIComponent(body);
                const content = decoded.split('content=')[1];
                console.info('投稿されました: ' + content);
                Post.create({
                    content: content,
                    trackingCookie: null,
                    postedBy: req.user
                }).then(() => {
                    handleRedirectPosts(req, res);
                });
            });
            break;
        default:
            utilsHandler.handleBadRequest(req, res);
            break;
    }
}

function handleRedirectPosts(req, res) {
    res.writeHead(303, {
        'Location': '/posts'
    });
    res.end();
}

function addTrackingCookie(cookies){
    if ( !cookies.get(trackingIdKey) ) {
        const trackingId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        const tommorow = new Date(new Date().getTime() + ( 1000 * 60 * 60 * 24 ) );
        cookies.set(trackingIdKey, trackingId, { expires: tommorow });
    }
}

module.exports = {
    handle: handle
};
