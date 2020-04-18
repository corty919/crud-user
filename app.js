/*
    #app.js 入口文件
    职责：
        创建服务
        做一些服务的相关配置
            模板引擎
            body-parse中间件 解析表单的post请求体
            提供静态服务资源
        挂在路由
        监听服务启动
*/
const express = require('express')
const app = express();
const bodyParser=require('body-parser')
const router =require('./router')
app.use('/public/', express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('html', require('express-art-template'))


// 中间件的使用一定要写在路由之前
router(app) //挂载路由


app.listen(3000, function () {
    console.log('server is running 3000')
})