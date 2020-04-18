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


