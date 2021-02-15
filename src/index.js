const { css } = require('./style/index.less');

const utils = require('./utils');
const config = require('./config');
const OJ = require('./oj/index');

if (window.location.href == 'https://github.com/memset0/oi-helper') {
	config.renderHTML(document.querySelector('article.markdown-body'));
} else {
	OJ.load(window.location.href);
}

utils.log('Hello, World!');