const oj = require('@/oj');
const app = require('@/app');
const utils = require('@/utils');
const config = require('@/config');
const updater = require('@/updater');

if (window.location.href == 'https://github.com/memset0/oi-helper') {
	config.renderHTML(document.querySelector('article.markdown-body'));
} else {
	oj.load(window.location.href);
}
app.load();
updater.check();

utils.log('Hello, World!');