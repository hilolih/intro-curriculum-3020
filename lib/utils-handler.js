'use strict';

function handleLogout(req, res){
    res.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8'
    });
    res.end('ページがみつかりません');
}

module.exports = {
    handleLogout: handleLogout
};
