'use strict';

function handleLogout(req, res){
    console.info('ログアウトします');
    res.writeHead(401, {
        'Content-Type': 'text/plain; charset=utf-8'
    });
    res.end('ログアウトしました');
}

module.exports = {
    handleLogout: handleLogout
};
