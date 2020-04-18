/*
user.js
    数据操作文件模块
    职责：操作文件中的数据， 只处理数据，不关心业务
*/
var dbpath = './db.json';
const fs = require('fs');
const uuid = require('uuid'); //使用uuid 生成唯一标识，作为用户id，避免重复

/*
    获取所有用户 
    return callback
        第一个参数 err
            成功：null
            失败：错误信息
        第二个参数 数据
            成功 dbdata
            错误 undefined
*/
exports.getUser = function (callback) {
    fs.readFile(dbpath, 'utf8', function (err, data) {
        var dbdata = JSON.parse(data).students;
        if (err) {
            return callback(err)
        }
        callback && callback(null, dbdata)
    })
}
/*
    添加用户
*/
exports.addUser = function (user, callback) {
    fs.readFile(dbpath, 'utf8', function (err, data) {
        var dbdata = JSON.parse(data).students;
        if (err) {
            return callback(err)
        }
        // 先读取，在修改，最后重新写入文件中
        user.id = uuid.v1(); //使用uuid作为用户的id ,避免重复
        dbdata.push(user)
        var fildData = JSON.stringify({
            "students": dbdata
        })
        fs.writeFile(dbpath, fildData, function (err) {
            if (err) {
                return callback(err);
            }
            // 写入成功，错误对象就是null  
            callback && callback(null);
        })
    })
}
/*
    更新用户
*/
exports.updateUserById = function (user, callback) {
    /*
        思路：
            1.先读取文件，转成对象
            2.根据id查询获取到的数据，覆盖掉这个数据
            3.转成字符串重新写入db.json文件中
    */
    fs.readFile(dbpath, 'utf8', function (err, data) {
        var dbdata = JSON.parse(data).students;
        if (err) {
            return callback(err)
        }
        // es6提供find方法，返回一个满足条件的对象
        var item = dbdata.find((item) => {
            return item.id == user.id
        })
        // 遍历拷贝对象
        for (var key in user) {
            item[key] = user[key]
        }

        // dbdata.push(user)
        var fildData = JSON.stringify({
            "students": dbdata
        })
        fs.writeFile(dbpath, fildData, function (err) {
            if (err) {
                return callback(err);
            }
            // 写入成功，错误对象就是null  
            callback && callback(null);
        })
    })
}
/*
    删除用户
*/
exports.deleteUserById = function (id, callback) {
    fs.readFile(dbpath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var dbdata = JSON.parse(data).students;
        // for(var i =0;i<dbdata.length;i++){
        //     if(dbdata[i].id==id){
        //         dbdata.splice(i,1); //删除
        //     }
        // }
        // es6 finfIndex
        var index = dbdata.findIndex((item) => {
            return item.id == id
        })
        dbdata.splice(index, 1); //删除

        var fildData = JSON.stringify({
            "students": dbdata
        })
        fs.writeFile(dbpath, fildData, function (err) {
            if (err) {
                return callback(err);
            }
            // 写入成功，错误对象就是null  
            callback && callback(null);
        })

    })
}