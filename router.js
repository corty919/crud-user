// 创建路由容器
var router = require('express').Router();  //引入express 中的路由
const fs = require('fs');
const user = require('./user');
// 把路由挂在到路由容器中
module.exports = function (app) {

    // 渲染首页
    app.get('/students', function (req, res) {
        // fs模块读取文件，并进行处理
        // fs.readFile('./db.json', 'utf8', function (err, data) {
        //     if (err) {
        //         return res.status(500).send('Server is Error')
        //     }
        //     var students = JSON.parse(data).students;
        //     res.render('index.html', {
        //         students: students,
        //         worker: ['学生', '教师', '食堂阿姨', '门卫叔叔']
        //     })
        // })
        user.getUser(function (err, students) {
            if (err) {
                return res.status(500).send('Server is Error')
            }
            res.render('index.html', {
                students: students,
                worker: ['学生', '教师', '食堂阿姨', '门卫叔叔']
            })
        })

    })
    // 渲染添加用户界面
    app.get('/students/new', function (req, res) {
        res.render('new.html', {
            worker: ['学生', '教师', '食堂阿姨', '门卫叔叔']
        })
    })

    // 处理添加用户的请求
    app.post('/students/new', function (req, res) {
        console.log(req.body)
        var userData = req.body;
        // 获取到数据
        // 读取db.json中的字符串，转成对象，再想数据中push
        // 重新存储进db.json文件中
        var obj = {
            "id": "10",
            "name": "tom",
            "age": "19",
            "gender": "0",
            "hobbies": "coding"
        }
        user.addUser(userData, function (err, user) {
            if (err) {
                return res.status(500).send('Server is Error')
            }
            res.redirect('/students')
        })

    })
    // 渲染编辑用户界面
    app.get('/students/edit', function (req, res) {
        var id = req.query.id; //获取用户id
        var thisUser = null;
        user.getUser(function (err, user) {
            if (err) {
                return res.status(500).send('Server is Error')
            }
            for (var i = 0; i < user.length; i++) {
                if (user[i].id == id) {
                    thisUser = user[i];
                }
            }
            res.render('edit.html', {
                user: thisUser,
                worker: ['学生', '教师', '食堂阿姨', '门卫叔叔']
            })
        })
    })
    // 处理编辑用户请求
    app.post('/students/edit', function (req, res) {
        user.updateUserById(req.body, function (err, user) {
            if (err) {
                return res.status(500).send('Server is Error')
            }
            console.log('修改成功')
            res.redirect('/students')
        })
    })
    // 删除用户
    app.get('/students/delete', function (req, res) {
        console.log(req.query.id)
        user.deleteUserById(req.query.id, function (err, user) {
            if (err) {
                return res.status(500).send('Server is Error')
            }
            console.log('删除成功')
            res.redirect('/students')
        })
    })
}