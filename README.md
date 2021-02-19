# OI Helper

Userscripts for OIers.

专为 OIer 设计的 Userscript 集合，有一些很有用的功能和一些没什么用的功能 /cy。

### Usage

本插件依赖于 TamperMonkey 运行，首先你需要安装最新版 TamperMonkey 浏览器插件或替代品。

可以从 OpenUserJS 网站上安装本插件：[https://openuserjs.org/scripts/memset0/oi-helper](https://openuserjs.org/scripts/memset0/oi-helper)。

也可以手动构建：

```shell
git clone https://github.com/memset0/oi-helper.git && cd oi-helper
npm install
npm run build
```

将 `./dist/userscript.js` 文件复制到 TamperMonkey 即可。

成功安装插件后，本页的 `README.md` 文件尾部会显示配置窗口，你可以在此处对插件功能进行配置。

### Feature

* VJudge
  * 样式美化
  * 用户资料页面通过题目数分 OJ 统计
  * 支持部分提交链接跳转到原网站
  * 自动删除题面中的空白区块

* Codeforces
  * 快速提交，支持在题面页面直接提交代码，减少操作步骤和等待时间（fork 自 [gh/LumaKernel/cf-fast-submit](https://github.com/LumaKernel/cf-fast-submit)）
  * 题目翻译，兼容 LaTeX，基于 [Google Translate CN](https://translate.google.cn)

* [Baekjoon OJ](https://www.acmicpc.net/)
  * 部分 UI 翻译成英文

* ioihw20
  * 参见 [gh/memset0/ioihw20-helper](https://github.com/memset0/ioihw20-helper)，保持同步

更多功能请在安装插件后自行查阅配置列表。

### Hint

* 本项目包含 `ioihw20-helper`，请勿同时启用。

### Demo

1. Codeforces 题面翻译，原题为 438E The Child and Binary Tree 和 1349F2 Slime and Sequences (Hard Version).（为展示效果，手工截去了样例部分）

![438E](https://i.loli.net/2020/10/24/MfSvzbgay15xhtu.png)

![1349F2](https://i.loli.net/2020/10/24/Bh9sAE8nUkbdST5.png)
