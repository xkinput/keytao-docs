---
description: 下载安装键道输入方案
---
# 获取键道

## 安装更新程序（推荐）

前往下载 **[KeyTao 键道安装更新程序](https://github.com/xkinput/keytao-installer/releases/latest)**，可自动完成键道方案的安装与更新，支持 Windows / macOS / Linux / Android。

如果 Linux 用户遇到 fcitx/ibus 相关问题，可查看 [Linux 安装 fcitx/rime 教程](https://github.com/xkinput/KeyTao/wiki/Linux%E5%AE%89%E8%A3%85rime%E9%94%AE%E9%81%936%E6%95%99%E7%A8%8B)。

## Nix/NixOS 安装方式

使用 Nix Flakes 一键安装，支持 Home Manager 模块自动管理配置文件。

详见：**[Nix 安装指南](https://github.com/xkinput/KeyTao/blob/master/INSTALL_NIXOS.md)** | [配置示例](https://github.com/xkinput/KeyTao/blob/master/docs/nixos-config-example.md)

::: tip macOS 用户注意
使用 Nix 安装前需先手动安装鼠须管（Squirrel）。
:::

## iOS 平台 元书输入法（推荐）

[元书输入法](https://apps.apple.com/app/id6744464701) 是基于 RIME 引擎的 iOS 输入法，支持通过链接直接下载方案。

- 默认 Gitee：`https://keytao.vercel.app/api/install/ios-latest`
- 指定 GitHub：`https://keytao.vercel.app/api/install/ios-latest?source=github`

**国内建议优先使用** `keytao.rea.ink`：

- 默认 Gitee：`https://keytao.rea.ink/api/install/ios-latest`
- 指定 GitHub：`https://keytao.rea.ink/api/install/ios-latest?source=github`

可用参数示例：

- `source=gitee`：使用 Gitee latest release
- `source=github`：使用 GitHub latest release
- 不传 `source`：默认使用 Gitee

**安装步骤：**

1. 复制上面的最新 iOS 包跳转链接之一；若在国内网络环境，优先使用 `https://keytao.vercel.app/api/install/ios-latest`；若你更想手动找包，也可以前往 [GitHub Releases](https://github.com/xkinput/KeyTao/releases/latest) 复制 `keytao-ios-*.zip` 的下载链接
2. 打开元书输入法 → **输入方案** → 右上角「下载方案」→ 填写方案名称（如 `keytao`）和上述下载链接 → 保存 → 点击下载
3. 返回「输入方案」→ 右上角「方案目录切换」→ 自动打开 RimeUserData 目录 → 进入键道目录 → 找到方案文件目录 → 右上角「打开」→ 部署 → 等待完成
