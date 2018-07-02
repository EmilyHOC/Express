var express=require('express');
var fs=require('fs');
var  app=express();
var mysql=require('mysql');
var pool=mysql.createPool({
    host:'localhost',
    port:3306,
    database:"yangxinjing",
    user:'root',
    password:'root',
});
app.get('/index1.html',function (req,res) {
  res.sendfile(__dirname+'/index1.html');
});
app.put('/index1.html',function (req,res) {
    req.on('data',function (data) {
        var obj=JSON.parse(data.toString());
        pool.getConnection(function (err,connection) {
            if(err)
                res.send('与mysql数据库连接失败');
            else {
                var str;
                connection.query('insert into users set?', {
                    username: obj.username,
                    firstname: obj.firstname
                }, function (err, result) {
                    if (err) str = '在服务器端Mysql数据库中插入数据失败.';
                    else str = '在服务器端Mysql数据库中插入数据成功.';
                    connection.release();
                    res.send(str);
                });
            }
        });
    });

});
app.listen(1337,"127.0.0.1");
