# OI Helper

Userscript for OIers.

### Usage

可以从 [Github Actions](https://github.com/memset0/oi-helper/actions) 上下载自动打包的版本。

也可以手动打包：

```js
git clone https://github.com/memset0/oi-helper.git && cd oi-helper
npm install
npm run build
```

将 `./dist/userscript.js` 文件复制到 TamperMonkey 即可使用。

### Hint

* 本项目包含 `ioihw20-helper`，请勿同时启用。