const CONFIG = {
	'luogu': {
		match: [
			'www.luogu.org',
			'www.luogu.com.cn',
		]
	},
	'loj': {
		match: [
			'loj.ac',
		]
	},
	'uoj': {
		match: [
			'uoj.ac',
		]
	},
	'vjudge': {
		match: [
			'vjudge.net',
			'cn.vjudge.net',
		]
	},
	'szkopul': {
		match: [
			'szkopul.edu.pl',
		]
	},
	'codeforces': {
		match: [
			'codeforces.com',
			'codeforces.ml',
			'codeforc.es',
		]
	},
	'atcoder': {
		match: [
			'atcoder.jp',
		]
	}
}

const OJ = {
	load: function (url) {
		Object.keys(CONFIG).forEach(oj => {
			CONFIG[oj].match.forEach((prefix) => {
				if (url.startsWith('http://' + prefix) || url.startsWith('https://' + prefix)) {
					require('./' + oj + '/index.js');
				}
			});
		});
	}
};

module.exports = OJ;