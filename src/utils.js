const axios = require('axios');
const assert = require('assert');

const utils = {
	// 控制台调试语句
	log() {
		console.log('[oi-helper]', ...arguments);
	},
	warn() {
		console.warn('[oi-helper]', ...arguments);
	},
	error() {
		console.error('[oi-helper]', ...arguments);
	},

	getValue(key) {
		utils.log('getValue', key, GM_getValue(key));
		return GM_getValue(key);
	},
	setValue(key, data) {
		utils.log('setValue', key, data);
		return GM_setValue(key, data);
	},

	register(dir, value) {
		unsafeWindow.mem = unsafeWindow.mem || {};
		let current = unsafeWindow.mem;
		let path = dir.split('.');
		for (let index = 0; index + 1 < path.length; index++) {
			current[path[index]] = current[path[index]] || {};
			current = current[path[index]];
		}
		current[path[path.length - 1]] = value;
	},

	// 在新标签页打开
	openInNewTab(href) {
		let element = document.createElement('a');
		element.setAttribute('href', encodeURI(href));
		element.setAttribute('target', '_blank');
		element.click();
	},

	async translate(content, debug_mode = false) {
		// 自建 API，基于 Google Translate，请勿滥用
		const api_url = `https://translate.memset0.cn`;

		// let response = await axios.post(api_url, {
		// 	text: content,
		// 	to: 'zh-cn'
		// });
		let response = await axios.get(api_url +
			"?text=" + encodeURIComponent(content) +
			'&to=' + 'zh-cn'
		);

		if (debug_mode) {
			console.log(response)
		}
		return response.data.text;
	},
};

module.exports = utils;