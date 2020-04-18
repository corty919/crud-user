## 起步

- 初始化
- 模板处理

## 路由设计 

| 请求方法 | 请求路径         | get参数 | post参数                   | 备注                 |
| -------- | ---------------- | ------- | -------------------------- | -------------------- |
| get      | /students        |         |                            | 渲染首页             |
| get     | /students/new    |         |                            | 渲染添加用户信息页面 |
| post     | /students/new        |         | name、age、gender、hobbies | 处理添加用户的请求   |
| get      | /students/edit   | id      |                            | 渲染编辑页面         |
| post     | /students/edit   |         | name、age、gender、hobbies | 处理编辑用户的请求   |
| get       | /students/delete | id      |                            | 处理删除用户信息请求 |

![image](https://github.com/corty919/crud-user/blob/master/public/img/1587225991(1).jpg)


如需查看效果请自行下载

### 使用

- 下载代码

```
git clone git@github.com:corty919/crud-user.git
```

- 下载依赖包

```
npm install 
```

- 运行(运行端口号为：3000)

```
node app.js
```

