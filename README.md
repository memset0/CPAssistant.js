# OI Helper

Userscripts for OIers.

专为 OIer 设计的 Userscript 集合，有一些很有用的功能和一些没什么用的功能 /cy。

### Usage

可以从 [Github Actions](https://github.com/memset0/oi-helper/actions) 上下载自动打包的版本。（关键词：Artifacts）

也可以手动打包：

```js
git clone https://github.com/memset0/oi-helper.git && cd oi-helper
npm install
npm run build
```

将 `./dist/userscript.js` 文件复制到 TamperMonkey 即可使用。

### Feature

* VJudge
  * 样式美化
  * 支持部分提交链接跳转到原网站
  * 删除题面中的空白区块
  * 其他小修小补

* Codeforces
  * 题目翻译，兼容 LaTeX，基于 [Google Translate CN](https://translate.google.cn)。

* ioihw20
  * 参见 [gh/memset0/ioihw20-helper](https://github.com/memset0/ioihw20-helper)，保持同步。

目前处于项目开发咕咕咕阶段，后期会增加配置功能自由搭配（

### Hint

* 本项目包含 `ioihw20-helper`，请勿同时启用。