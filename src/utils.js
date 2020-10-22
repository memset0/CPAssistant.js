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
};

module.exports = utils;