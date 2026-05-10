---
description: 更新键道方案与码表
---

# 更新键道

运行 **[KeyTao 键道安装更新程序](https://github.com/xkinput/keytao-installer/releases)** 即可一键完成键道方案的更新，支持 Windows / macOS / Linux / Android。

## iOS

iOS 平台暂不支持安装更新程序，请通过以下方式手动更新：

- **[元书输入法](https://apps.apple.com/app/id6744464701)（推荐）**：进入「输入方案 → 下载方案」，填写最新 iOS 包跳转链接重新下载，然后「方案目录切换，选择键道目录 → 打开 → 部署」即可

- 默认 Gitee：`https://keytao.vercel.app/api/install/ios-latest`
- 指定 GitHub：`https://keytao.vercel.app/api/install/ios-latest?source=github`


**国内建议优先使用** `keytao.rea.ink`：

- 默认 Gitee：`https://keytao.rea.ink/api/install/ios-latest`
- 指定 GitHub：`https://keytao.rea.ink/api/install/ios-latest?source=github`

可用参数示例：

- `source=gitee`：使用 Gitee latest release
- `source=github`：使用 GitHub latest release
- 不传 `source`：默认使用 Gitee
