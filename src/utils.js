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

	request: {
		async get(url, { timeout = 5000 }) {
			return new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.open("GET", url, true);
				xhr.send();
				xhr.onreadystatechange = () => {
					if (xhr.readyState == 4 && xhr.status == 200) {
						resolve(xhr.responseText);
					}
				};
				setTimeout(() => { reject(new Error('Timed out')) }, timeout);
			});
		},
	},

	// 在新标签页打开
	openInNewTab(href) {
		let element = document.createElement('a');
		element.setAttribute('href', encodeURI(href));
		element.setAttribute('target', '_blank');
		element.click();
	},

	async translate(content, debug_flag = false) {
		// 自建 API，基于 Google Translate，请勿滥用
		const api_root = `https://translate.memset0.cn`;
		const response = await utils.request.get(api_root +
			"?text=" + encodeURIComponent(content) +
			'&to=' + 'zh-cn'
		);
		if (debug_flag) {
			console.log(response)
		}
		return response.data.text;
	},
};

module.exports = utils;