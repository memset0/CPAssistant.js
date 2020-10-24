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
	}
};

module.exports = utils;