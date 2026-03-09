# 认知之旅 - MBTI 测试网站

基于荣格八维认知功能的沉浸式 MBTI 测试游戏。

## 项目特点

- 🎮 游戏化体验 - 通过故事互动而非传统问卷
- 🧠 基于认知功能 - 测试 8 种认知功能而非简单的四字母
- 🎨 精美界面 - 使用 Tailwind CSS 打造的渐变背景
- 📱 响应式设计 - 支持手机和电脑

## 技术栈

**后端：**
- Go 1.21+
- Gin (Web 框架)
- GORM + SQLite (数据库)

**前端：**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

## 安装和运行

### 前置要求

1. 安装 Go (1.21+)：https://golang.org/dl/
2. 安装 Node.js (18+)：https://nodejs.org/

### 启动后端

```bash
cd backend
go mod download
go run main.go
```

后端将运行在 http://localhost:8080

### 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端将运行在 http://localhost:3000

## 项目结构

```
mbti/
├── backend/          # Go 后端
│   ├── main.go      # 入口文件
│   └── go.mod       # 依赖管理
├── frontend/        # React 前端
│   ├── src/
│   │   ├── pages/   # 页面组件
│   │   ├── App.tsx  # 主应用
│   │   └── main.tsx # 入口
│   └── package.json
└── README.md
```

## 开发计划

- [x] 项目基础架构
- [x] 首页和游戏页面
- [x] 结果计算逻辑
- [ ] 完善游戏故事内容
- [ ] 后端 API 实现
- [ ] 数据库设计
- [ ] 结果详细分析
