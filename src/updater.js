const app = require('@/app');
const utils = require('@/utils');

const checkInterval = 1000 * 60 * 60 * 24;

async function fetch(url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.send();
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4 && xhr.status == 200) {
				resolve(xhr.responseText);
			}
		};
		setTimeout(() => {reject(new Error('Timed out'))}, 5000);
	});
}

function parseHeader(script) {
	const result = {};
	const header = script.split('// ==UserScript==')[1].split('// ==/UserScript==')[0];
	for (const line of header.split('\n')) {
		const matched = line.match(/^\/\/ @([a-zA-Z]+) (.*)$/);
		if (matched) {
			const key = matched[1];
			const value = matched[2];
			if (result[key] && result[key] instanceof Array) {
				result[key].push(value);
			} else if (result[key] && result[key]) {
				result[key] = [result[key], value];
			} else {
				result[key] = value;
			}
		}
	}
	return result;
}

function versionGreater(verX, verY) {
	const arrX = verX.split('.').map(parseInt);
	const arrY = verY.split('.').map(parseInt);
	for (let i = 0; i < Math.min(arrX.length, arrY.length); i++) {
		if (arrX[i] != arrY[i]) {
			return arrX[i] > arrY[i];
		}
	}
	return arrX.length > arrY.length;
}

async function check(force = false) {
	if (!force) {
		const lastCheckTime = utils.getValue('update-check-last-time') || 0;
		if (Date.now() - lastCheckTime < checkInterval) {
			return;
		}
	}
	utils.setValue('update-check-last-time', Date.now());

	const onlineScript = 'https://cdn.jsdelivr.net/gh/memset0/oi-helper@dist/userscript.js?t=' + Date.now();
	const onlineVersion = parseHeader(await fetch(onlineScript)).version;

	const localVersion = VERSION;

	utils.log('onlineVersion:', onlineVersion);
	utils.log('localVersion', localVersion);

	if (versionGreater(onlineVersion, localVersion)) {
		alert(`[oi-helper] 当前有版本更新 (v${localVersion} -> v${onlineVersion})，请使用 TamperMonkey 更新功能或在 OpenUserJS 网站安装更新。`)
	}
}

app.command('check_update', check);

module.exports = {
	check,
};