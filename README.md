# KeyTao Docs

星空键道(KeyTao)输入法官方文档 - 基于VitePress构建

## 简介

本项目是星空键道输入法的官方使用文档，使用VitePress构建的静态文档站点。

## 技术栈

- **VitePress** - 静态站点生成器
- **Vue 3** - 组件框架
- **Markdown** - 文档编写

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm docs:dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
pnpm docs:build
```

### 预览构建结果

```bash
pnpm docs:preview
```

## 项目结构

```
keytao-docs/
├── .vitepress/          # VitePress配置
│   └── config.js        # 站点配置
├── guide/               # 指南文档
│   ├── get-xkjd/       # 获取安装
│   ├── learn-xkjd/     # 学习教程
│   ├── master-xkjd/    # 进阶使用
│   └── advance-in-xkjd/# 高级技巧
├── public/              # 静态资源
├── index.md             # 首页
└── package.json
```

## 部署

### 中国大陆访问加速

本文档站点部署在 Vercel，国内用户可能遇到访问困难。推荐使用 **Cloudflare Workers** 作为反向代理加速访问。

**特点：**
- ✅ 完全免费（每天10万次请求）
- ✅ 5分钟部署完成
- ✅ 显著提升国内访问速度
- ✅ 支持自定义域名
- ✅ 针对VitePress静态站点优化

**快速部署：**

详细步骤请参考 [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 创建 Worker，复制 `cloudflare-worker.simple.js` 代码
3. 修改 `VERCEL_DOMAIN` 为你的Vercel文档站域名
4. 保存并部署
5. （可选）绑定自定义域名如 `docs.yourdomain.com` 或 `cn.docs.yourdomain.com`

### Vercel 部署

项目已配置自动部署到Vercel，推送到main分支即自动触发部署。

## 贡献指南

欢迎提交文档改进建议：

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/improve-docs`)
3. 提交更改 (`git commit -m 'docs: 改进XX文档'`)
4. 推送到分支 (`git push origin feature/improve-docs`)
5. 提交Pull Request

### 文档编写规范

- 使用 Markdown 语法
- 中英文之间添加空格
- 代码块注明语言类型
- 添加适当的标题层级
- 保持简洁清晰

## 相关链接

- [KeyTao GitHub](https://github.com/xkinput/KeyTao)
- [VitePress 官方文档](https://vitepress.dev/)
- [星空键道社区](https://github.com/xkinput)

## License

MIT
