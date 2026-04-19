(function(ext) {
    // 拡張機能が読み込まれた時の初期化
    ext._shutdown = function() {};
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // 各コマンドの定義
    ext.takeoff = function() {
        const url = 'http://127.0.0.1:8001/takeoff'; // localhostではなくIPで指定
        fetch(url, { mode: 'no-cors' });
    };

    ext.land = function() {
        fetch('http://127.0.0.1:8001/land', { mode: 'no-cors' });
    };

    ext.move = function(dir, dist) {
        fetch(`http://127.0.0.1:8001/${dir} ${dist}`, { mode: 'no-cors' });
    };

    // ブロックの定義（Scratch 2.0/Xcratch互換形式）
    var descriptor = {
        blocks: [
            [' ', '離陸', 'takeoff'],
            [' ', '着陸', 'land'],
            [' ', '%m.direction へ %n cm進む', 'move', 'forward', 20],
        ],
        menus: {
            direction: ['forward', 'back', 'left', 'right', 'up', 'down']
        }
    };

    // 登録
    ScratchExtensions.register('Tello Expert', descriptor, ext);
})({});