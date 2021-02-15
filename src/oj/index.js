const config = require('../config');

const CONFIG = {
	'luogu': {
		match: [
			'www.luogu.org',
			'www.luogu.com.cn',
		],
	},
	'loj': {
		match: [
			'loj.ac',
		],
	},
	'uoj': {
		match: [
			'uoj.ac',
		],
	},
	'vjudge': {
		match: [
			'vjudge.net',
			'cn.vjudge.net',
			'vjudge.z180.cn',
		],
	},
	'szkopul': {
		match: [
			'szkopul.edu.pl',
		],
	},
	'codeforces': {
		match: [
			'codeforces.com',
			'codeforces.ml',
			'codeforc.es',
		],
	},
	'atcoder': {
		match: [
			'atcoder.jp',
		],
	},
	'ioihw20': {
		match: [
			'ioihw20.duck-ac.cn',
		],
	},
	'baekjoon': {
		match: [
			'www.acmicpc.net',
		],
	},
}

const OJ = {
	load: function (url) {
		Object.keys(CONFIG).forEach(oj => {
			if (!config.query('oj.' + oj, true)) {
				return;
			}
			CONFIG[oj].match.forEach((prefix) => {
				if (url.startsWith('http://' + prefix) || url.startsWith('https://' + prefix)) {
					require('./' + oj + '/index.js');
				}
			});
		});
	}
};

module.exports = OJ;