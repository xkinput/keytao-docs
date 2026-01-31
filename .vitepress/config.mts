import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "星空键道",
  description: "星空键道 - 双拼顶功输入法方案文档",
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',

    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '获取键道', link: '/guide/get-xkjd/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '星空键道',
          items: [
            { text: '简介', link: '/guide/' }
          ]
        },
        {
          text: '承载键道',
          items: [
            { text: '概述', link: '/guide/get-xkjd/' },
            { text: '获取键道', link: '/guide/get-xkjd/download-and-install' },
            { text: '更新键道', link: '/guide/get-xkjd/update' },
            { text: '卸载键道', link: '/guide/get-xkjd/uninstall' }
          ]
        },
        {
          text: '研习键道',
          items: [
            { text: '概述', link: '/guide/learn-xkjd/' },
            { text: '键道图谱', link: '/guide/learn-xkjd/layouts' },
            { text: '键道音码', link: '/guide/learn-xkjd/phonetics-rules' },
            { text: '键道形码', link: '/guide/learn-xkjd/stroke-rules' }
          ]
        },
        {
          text: '入门键道',
          items: [
            { text: '概述', link: '/guide/start-xkjd/' },
            { text: '单字', link: '/guide/start-xkjd/characters' },
            { text: '词组', link: '/guide/start-xkjd/phrases' }
          ]
        },
        {
          text: '融会键道',
          items: [
            { text: '概述', link: '/guide/advance-in-xkjd/' },
            { text: '简码', link: '/guide/advance-in-xkjd/shorthand' },
            { text: '顶功（上屏）', link: '/guide/advance-in-xkjd/top-up' },
            { text: '飞键', link: '/guide/advance-in-xkjd/alt-code' }
          ]
        },
        {
          text: '问鼎键道',
          items: [
            { text: '概述', link: '/guide/master-xkjd/' },
            { text: '特殊编码', link: '/guide/master-xkjd/extra-code' },
            { text: '特殊符号', link: '/guide/master-xkjd/extra-symbols' },
            { text: '特殊功能', link: '/guide/master-xkjd/extra-functions' }
          ]
        },
        {
          text: '其他',
          items: [
            { text: '笔者结语', link: '/guide/authors-notes' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xkinput/KeyTao' }
    ],

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: '目录'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: {
      text: '最后更新于'
    }
  }
})
