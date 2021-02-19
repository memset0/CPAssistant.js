const utils = require('./utils');
const { css } = require('./config.less');

let data = utils.getValue('config');
if (!data) data = {};

const profile = [
	{
		name: 'oj',
		description: '对于每个 Online Judge 配置是否启用',
		children: [
			{
				name: 'atcoder',
				value: true,
			}, {
				name: 'baekjoon',
				value: true,
			}, {
				name: 'codeforces',
				value: true,
			}, {
				name: 'ioihw20',
				value: true,
			}, {
				name: 'loj',
				value: true,
			}, {
				name: 'luogu',
				value: true,
			}, {
				name: 'szkopul',
				value: true,
			}, {
				name: 'uoj',
				value: true,
			}, {
				name: 'vjudge',
				value: true,
			},
		],
	}, {
		name: 'module',
		description: '对于每个功能模块配置是否启用',
		children: [
			{
				name: 'baekjoon-ui-translate',
				description: 'baekjoon 部分 UI 翻译',
				value: true,
			},			{
				name: 'codeforces-translator',
				description: 'codeforces 题面/题解翻译器',
				value: true,
			}, {
				name: 'codeforces-fast-submit',
				description: 'codeforces 快速提交插件（支持在题面页面直接提交代码）',
				value: true,
			}, {
				name: 'vjudge-custom-style',
				description: 'vjudge 自定义样式',
				value: true,
			}, {
				name: 'vjudge-accepted-counter',
				description: 'vjudge 用户资料页面通过题目数分 OJ 统计',
				value: true,
			}, {
				name: 'vjudge-problemlist-generater',
				description: 'vjudge 题单生成器（命令行功能）',
				value: true,
			}, {
				name: 'vjudge-remote-submission-link',
				description: 'vjudge 提交记录添加跳转到原 OJ 提交记录页链接（仅对部分 OJ 有效）',
				value: true,
			},
		],
	}
];

const config = {
	query(path, defaultResponse = undefined) {
		const key = path.split('.');
		let current = data;
		for (let i = 0; i < key.length; i++) {
			if (!Object.keys(current).includes(key[i])) {
				return defaultResponse;
			}
			current = current[key[i]];
		}
		return current;
	},

	modify(path, value) {
		const key = path.split('.');
		let current = data;
		for (let i = 0; i + 1 < key.length; i++) {
			if (!Object.keys(current).includes(key[i])) {
				current[key[i]] = {};
			}
			current = current[key[i]];
		}
		current[key[key.length - 1]] = value;
		utils.setValue('config', data);
		utils.log('[config]', 'current =', data);
	},

	renderHTML(element) {
		const renderTree = (element, profile, prefix, depth) => {
			for (const item of profile) {
				const current = document.createElement('div');
				current.classList.add("oi-helper-config-depth-" + depth);
				current.innerHTML += '<h2>' + item.name + '</h2>';
				if (item.description) {
					current.innerHTML += '<p>' + item.description + '</p>';
				}
				if (item.children) {
					const children = document.createElement('div');
					children.style['padding-left'] = '20px';
					current.appendChild(children);
					renderTree(children, item.children, prefix.concat([item.name]), depth + 1);
				}
				if (item.value) {
					const path = prefix.concat([item.name]).join('.');
					const value = config.query(path, item.value);
					if (value === true || value === false) { // type: boolean 
						const checkbox = document.createElement('input');
						checkbox.type = 'checkbox';
						checkbox.checked = value ? true : false;
						checkbox.onchange = () => {
							utils.log('on change', checkbox.checked);
							config.modify(path, checkbox.checked ? true : false);
						};
						const titleElement = current.getElementsByTagName('h2')[0];
						titleElement.innerHTML += '&nbsp;';
						titleElement.appendChild(checkbox);
					}
				}
				element.appendChild(current);
			}
		};

		const rootNode = document.createElement('div');
		rootNode.id = 'oi-helper-config';
		element.appendChild(rootNode);
		renderTree(rootNode, profile, [], 0);
	}
}

module.exports = {
	source: data,
	...config,
};