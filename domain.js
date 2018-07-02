var http=require('http');
var domain=require('domain');
http.createServer(function (req,res) {
    var  d=domain.create();
    d.once('error',function (err) {
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<head><meta><meta charset="utf-8"></head>');
        res.write('服务器接收到客户端请求时发生错误');
        res.end(err.message);

    });
    d.run(function () {
        if(req!=="/df.ico"){
            nonexit();
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write('<head><meta><meta charset="utf-8"></head>')
            res.end('你好');
        }

    })

}).listen(8080,'127.0.0.1');
