// Cloudflare Worker - Vercel Reverse Proxy for China Access
// 用于加速Vercel在中国大陆的访问速度 - keytao-docs

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 替换为你的Vercel部署域名
    const VERCEL_DOMAIN = env.VERCEL_DOMAIN || 'your-docs.vercel.app';

    // 构建目标URL
    const targetUrl = new URL(request.url);
    targetUrl.hostname = VERCEL_DOMAIN;

    // 创建新的请求头
    const modifiedHeaders = new Headers(request.headers);
    modifiedHeaders.set('Host', VERCEL_DOMAIN);
    modifiedHeaders.set('X-Forwarded-Host', url.hostname);

    // 创建新请求
    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: modifiedHeaders,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      redirect: 'manual',
    });

    try {
      // 发送请求到Vercel
      let response = await fetch(modifiedRequest);

      // 处理301/302重定向
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const location = response.headers.get('Location');
        if (location) {
          const locationUrl = new URL(location, targetUrl);
          if (locationUrl.hostname === VERCEL_DOMAIN) {
            locationUrl.hostname = url.hostname;
            const newHeaders = new Headers(response.headers);
            newHeaders.set('Location', locationUrl.toString());
            return new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: newHeaders,
            });
          }
        }
      }

      // 创建响应副本
      response = new Response(response.body, response);

      // 添加CORS头（如果需要）
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', '*');

      // 添加缓存控制 - VitePress静态站点可以激进缓存
      const cacheControl = response.headers.get('Cache-Control');
      if (!cacheControl) {
        // HTML文件短缓存
        if (url.pathname.endsWith('.html') || url.pathname === '/' || !url.pathname.includes('.')) {
          response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=300');
        }
        // 静态资源长缓存
        else if (url.pathname.match(/\.(jpg|jpeg|png|gif|ico|css|js|json|woff|woff2|ttf|svg|webp)$/)) {
          response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }

      // 添加自定义头标识
      response.headers.set('X-Proxied-By', 'Cloudflare-Workers');
      response.headers.set('X-Site', 'KeyTao-Docs');

      return response;
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: 'Proxy Error',
          message: error.message,
          timestamp: new Date().toISOString(),
        }),
        {
          status: 502,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  },
};
