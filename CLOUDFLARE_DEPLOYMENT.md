# Cloudflare Workers 部署指南 - KeyTao Docs

使用Cloudflare Workers作为反向代理，加速VitePress文档站点在中国大陆的访问。

## 前置条件

- [x] Cloudflare账号（免费）
- [x] 已在Vercel部署的VitePress文档站
- [x] 自定义域名（可选，推荐）

## 快速开始

### 方法一：Cloudflare Dashboard部署（推荐，最简单）

#### 1. 登录Cloudflare Dashboard

访问：https://dash.cloudflare.com/

#### 2. 创建Worker

1. 左侧菜单选择 **Workers & Pages**
2. 点击 **Create application**
3. 选择 **Create Worker**
4. 命名为 `keytao-docs-proxy`（或其他名称）
5. 点击 **Deploy**

#### 3. 编辑Worker代码

1. 点击 **Edit code**
2. 删除默认代码
3. 复制 `cloudflare-worker.simple.js` 的全部内容
4. 粘贴到编辑器
5. 修改第7行，将 `your-docs.vercel.app` 替换为你的Vercel文档站域名
6. 点击 **Save and Deploy**

#### 4. 测试Worker

点击预览链接（格式：`keytao-docs-proxy.workers.dev`），检查文档是否正常显示。

#### 5. 绑定自定义域名（推荐）

1. 在Worker页面点击 **Settings** → **Triggers**
2. 点击 **Add Custom Domain**
3. 输入你的域名，如 `docs.yourdomain.com` 或 `cn.docs.yourdomain.com`
4. 等待DNS生效（通常几分钟）

> **注意**：域名必须已添加到Cloudflare并使用Cloudflare的DNS。

---

### 方法二：命令行部署（适合开发者）

#### 1. 安装Wrangler CLI

```bash
pnpm add -D wrangler
# 或
npm install -g wrangler
```

#### 2. 登录Cloudflare

```bash
npx wrangler login
```

浏览器会打开授权页面，点击允许。

#### 3. 配置环境变量

编辑 `wrangler.toml`，将 `VERCEL_DOMAIN` 替换为你的Vercel文档站域名：

```toml
[env.production]
vars = { VERCEL_DOMAIN = "your-actual-docs.vercel.app" }
```

#### 4. 部署Worker

```bash
# 部署到生产环境
npx wrangler deploy

# 部署到开发环境测试
npx wrangler deploy --env development
```

#### 5. 本地开发测试

```bash
npx wrangler dev
```

访问 `http://localhost:8787` 测试文档站点。

---

## 配置说明

### 修改Vercel域名

在 `cloudflare-worker.simple.js` 第7行：

```javascript
const VERCEL_DOMAIN = 'your-docs.vercel.app';
```

或在Cloudflare Dashboard的Worker设置中添加环境变量：

1. **Settings** → **Variables**
2. 添加变量：`VERCEL_DOMAIN` = `your-docs.vercel.app`
3. 点击 **Save**

### 自定义域名配置

1. 域名必须托管在Cloudflare
2. 在Worker的 **Triggers** 中添加 Custom Domain
3. Cloudflare会自动配置DNS和SSL证书

---

## VitePress 特定优化

### 缓存策略

Worker已针对VitePress静态站点优化：

- **HTML文件**：5分钟缓存（`max-age=300`）
- **静态资源**：1年长缓存（`max-age=31536000`）
- **图片、字体**：永久缓存（`immutable`）

### 推荐域名架构

```
国内访问  → cn.docs.yourdomain.com  → Cloudflare Worker → Vercel
国际访问  → docs.yourdomain.com     → Vercel 直连
```

### DNS配置示例

在Cloudflare DNS中：

```
cn.docs.yourdomain.com  → CNAME → keytao-docs-proxy.workers.dev (橙色云朵)
docs.yourdomain.com     → CNAME → your-docs.vercel.app (灰色云朵)
```

---

## 性能优化

### 1. 预加载关键资源

在VitePress配置中添加：

```js
// .vitepress/config.js
export default {
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }]
  ]
}
```

### 2. 启用Cloudflare Polish

自动优化图片（需Pro计划）：

1. 进入域名设置
2. **Speed** → **Optimization**
3. 启用 **Polish**（WebP转换）

### 3. 启用HTML压缩

在Worker中已自动处理，无需额外配置。

---

## 免费额度

**Cloudflare Workers 免费计划包含：**

- ✅ 100,000 请求/天
- ✅ 无限Worker脚本
- ✅ 10ms CPU时间/请求
- ✅ 自定义域名支持

对于文档站点完全够用！

---

## 故障排查

### 问题1：404 Not Found

**原因**：Vercel域名配置错误或VitePress路由问题

**解决**：
1. 检查 `VERCEL_DOMAIN` 是否正确
2. 确认Vercel部署正常运行
3. 检查VitePress的 `cleanUrls` 配置
4. 查看Worker日志：Dashboard → Worker → **Logs**

### 问题2：CSS/JS无法加载

**原因**：路径问题或缓存问题

**解决**：
1. 检查VitePress的 `base` 配置
2. 清除浏览器缓存
3. 检查控制台错误信息
4. 确认静态资源路径是否正确

### 问题3：搜索功能不工作

**原因**：VitePress搜索依赖本地索引

**解决**：
- 使用VitePress内置的本地搜索（已自动支持）
- 或集成Algolia DocSearch（需额外配置）

### 问题4：页面更新不及时

**原因**：CDN缓存

**解决**：
- HTML默认缓存5分钟
- 可在Worker中调整 `max-age` 值
- 或在Cloudflare Dashboard手动清除缓存：**Caching** → **Purge Cache**

---

## 监控与日志

### 查看实时日志

在Cloudflare Dashboard：

1. 进入Worker页面
2. 点击 **Logs** 标签
3. 选择 **Begin log stream**

### 查看分析数据

**Metrics** 标签可查看：
- 请求数量
- 错误率
- CPU时间
- 带宽使用

---

## 安全建议

1. **启用Bot Protection**：在Cloudflare的Security设置中
2. **配置Rate Limiting**：防止爬虫过度抓取
3. **启用HTTPS Strict**：强制HTTPS访问
4. **启用HSTS**：HTTP严格传输安全

在`.vitepress/config.js`中添加安全头：

```js
export default {
  transformHead: ({ pageData }) => {
    return [
      ['meta', { 'http-equiv': 'Content-Security-Policy', content: "default-src 'self'" }]
    ]
  }
}
```

---

## 更新Worker

### Dashboard更新

1. 进入Worker页面
2. 点击 **Quick edit**
3. 修改代码
4. **Save and Deploy**

### CLI更新

```bash
# 修改 cloudflare-worker.js 后
npx wrangler deploy
```

---

## 与VitePress集成

### 环境检测

在VitePress中检测是否通过Worker访问：

```js
// .vitepress/theme/index.js
export default {
  setup() {
    if (typeof window !== 'undefined') {
      const isProxied = document.querySelector('meta[http-equiv="X-Proxied-By"]');
      console.log('通过CF加速:', !!isProxied);
    }
  }
}
```

### 智能提示

根据访问来源显示提示：

```vue
<template>
  <div v-if="isChinaProxy" class="tip">
    您正在通过国内加速节点访问 ⚡
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isChinaProxy = ref(false)

onMounted(() => {
  isChinaProxy.value = window.location.hostname.startsWith('cn.')
})
</script>
```

---

## 成本预估

| 方案 | 月费用 | 适用场景 |
|------|--------|----------|
| 免费计划 | $0 | <3M 请求/月 |
| Paid Plan | $5 | 10M 请求/月 |
| Paid + Polish | $10+ | 图片优化需求 |

对于文档站点，**免费计划完全够用**！

---

## 常见问题

**Q: Worker会影响SEO吗？**  
A: 不会，搜索引擎爬虫看到的内容与直接访问Vercel一致。

**Q: 支持VitePress的所有功能吗？**  
A: 是的，Worker只是透明代理，不影响任何VitePress功能。

**Q: 可以用于生产环境吗？**  
A: 可以，Cloudflare Workers非常稳定，许多大型网站都在使用。

**Q: 如何回滚？**  
A: 在Dashboard的Worker页面，点击 **Deployments**，选择历史版本 **Rollback**。

**Q: 能否同时加速多个文档站点？**  
A: 可以，创建多个Worker，每个Worker对应一个文档站点。

---

## 相关链接

- [VitePress 官方文档](https://vitepress.dev/)
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare Dashboard](https://dash.cloudflare.com/)

---

## 技术支持

如有问题：
1. 查看Worker日志排查
2. 访问 [Cloudflare Community](https://community.cloudflare.com/)
3. 提交issue到项目仓库

---

## 部署检查清单

- [ ] 已创建Cloudflare Worker
- [ ] 已修改 `VERCEL_DOMAIN` 为实际域名
- [ ] Worker代码已部署成功
- [ ] 测试访问正常（文字、图片、样式）
- [ ] （可选）已绑定自定义域名
- [ ] （可选）已配置CDN缓存规则
- [ ] （可选）已启用安全防护
