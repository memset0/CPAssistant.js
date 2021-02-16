const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

let config = YAML.parse(fs.readFileSync('config.yml').toString());
let npmConfig = JSON.parse(fs.readFileSync('package.json').toString());
for (const key of ['license', 'version', 'description', 'author', 'name']) {
	config.tampermonkey = {
		[key]: npmConfig[key],
		...config.tampermonkey
	};
}

function build(_config, bundle) {
	bundle = bundle.replace('/*! For license information please see bundle.js.LICENSE.txt */\n', '');
	let config = JSON.parse(JSON.stringify(_config));
	let result = ''
	result += '// ==UserScript==\n'
	config.tampermonkey.match = config.tampermonkey.match || [];
	for (const domain of config.domain) {
		config.tampermonkey.match.push('http://' + domain);
		config.tampermonkey.match.push('https://' + domain);
		config.tampermonkey.match.push('http://' + domain + '/*');
		config.tampermonkey.match.push('https://' + domain + '/*');
	}
	for (const key of Object.keys(config.tampermonkey)) {
		let val = config.tampermonkey[key];
		if (val instanceof Array) {
			val.forEach(val => {
				result += `// @${key} ${val}\n`
			});
		} else {
			result += `// @${key} ${val}\n`;
		}
	}
	result += '// ==/UserScript==\n';
	result += '// ==Notes==\n';
	for (const val of config.notes) {
		result += `// ${val}\n`;
	}
	result += '// ==/Notes==\n';
	result += bundle;
	return result;
};

function mode_production(config) {
	return build(config, fs.readFileSync('dist/bundle.js').toString());
}

function mode_development(_config) {
	let config = JSON.parse(JSON.stringify(_config));
	delete config.tampermonkey.updateURL;
	delete config.tampermonkey.downloadURL;
	config.tampermonkey.name += '[dev]';
	config.tampermonkey.require.push('file://' + path.resolve(path.join(__dirname, './dist/bundle.js')));
	return build(config, '');
}

fs.writeFileSync('dist/userscript.js', mode_production(config));
fs.writeFileSync('dist/userscript_dev.js', mode_development(config));