const axios = require('axios');

const utils = {
	// 控制台调试语句
	log: function () {
		console.log('[oi-helper]', ...arguments);
	},
	warn: function () {
		console.warn('[oi-helper]', ...arguments);
	},
	error: function () {
		console.error('[oi-helper]', ...arguments);
	},

	// 在新标签页打开
	openInNewTab: function (href) {
		let element = document.createElement('a');
		element.setAttribute('href', encodeURI(href));
		element.setAttribute('target', '_blank');
		element.click();
	},

	async translate(content, debug_mode = false) {
		let encoded = encodeURIComponent(content);
		// 自建 API，基于 Google Translate，请勿滥用
		let url = `https://translate.memset0.cn/?text=${encoded}&to=zh-cn`;
		let response = await axios.get(url);
		if (debug_mode) {
			console.log(response)
		}
		return response.data.text;
	}
};

module.exports = utils;