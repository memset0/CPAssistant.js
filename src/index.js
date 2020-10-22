import css from './style/index.less';

const utils = require('./utils');

const OJ = require('./oj/index');
OJ.load(window.location.href);

utils.log('Hello, World!');