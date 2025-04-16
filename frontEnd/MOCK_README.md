# Mock 服务使用说明

本项目使用 json-server 提供模拟API数据服务，方便前端开发和测试。

## 安装和设置

已经在项目中安装了json-server，并配置了相关文件：

1. `db.json` - 包含所有模拟数据
2. `json-server.json` - json-server配置文件

## 使用方法

### 启动mock服务

在项目根目录运行以下命令启动mock服务器：

```bash
npm run mock
```

或者

```bash
npm run api
```

这将在端口5000上启动json-server，并加载模拟数据。

### 启动开发服务器

在另一个命令行窗口中，启动前端开发服务器：

```bash
npm run dev
```

## API接口

由于我们没有使用路由配置，json-server会按照其默认规则提供API接口。以下是一些主要接口：

### 项目相关

- `GET /projects` - 获取所有项目
- `GET /projects/:id` - 根据ID获取项目详情
- `GET /projects?categoryId=:id` - 根据分类获取项目

### 用户相关

- `GET /users` - 获取所有用户
- `GET /users/:id` - 根据ID获取用户
- `POST /users` - 创建用户

### 订单相关

- `GET /orders` - 获取所有订单
- `GET /orders/:id` - 根据ID获取订单详情
- `POST /orders` - 创建订单
- `PUT /orders/:id` - 更新订单
- `PATCH /orders/:id` - 部分更新订单
- `DELETE /orders/:id` - 删除订单

## 注意事项

由于Vite开发服务器已经配置了代理到端口5000，前端代码中的API请求（以`/api`开头）会被转发到json-server。但是，json-server并不支持复杂的路由重写，所以可能需要在前端代码中调整API请求路径。

如需进行更复杂的模拟，可以考虑以下方案：
1. 修改前端代码中的API请求路径，使其与json-server默认路由匹配
2. 使用中间件扩展json-server功能
3. 使用更强大的mock工具，如Mock.js + Express

## 数据修改

如需添加或修改模拟数据，请编辑 `db.json` 文件。修改后，会自动重新加载。

## 其他说明

1. `mock`命令会监视`db.json`文件的变化，并自动重新加载
2. `api`命令不会监视文件变化，更适合调试固定数据
3. 所有对数据的修改都是临时的，重启mock服务器后会恢复到初始状态 