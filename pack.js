const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

let config = YAML.parse(fs.readFileSync('config.yml').toString());
let npmConfig = JSON.parse(fs.readFileSync('package.json').toString());
['name', 'author', 'description', 'version', 'license'].forEach(key => {
	config.tampermonkey[key] = npmConfig[key];
});

function build(_config, bundle) {
	let config = JSON.parse(JSON.stringify(_config));
	let result = ''
	result += '// ==UserScript==\n'
	config.tampermonkey.match = config.tampermonkey.match || [];
	config.domain.forEach(domain => {
		config.tampermonkey.match.push('http://' + domain);
		config.tampermonkey.match.push('https://' + domain);
		config.tampermonkey.match.push('http://' + domain + '/*');
		config.tampermonkey.match.push('https://' + domain + '/*');
	});
	Object.keys(config.tampermonkey).forEach((key) => {
		let val = config.tampermonkey[key];
		if (val instanceof Array) {
			val.forEach(val => {
				result += `// @${key} ${val}\n`
			});
		} else {
			result += `// @${key} ${val}\n`;
		}
	});
	result += '// ==/UserScript==\n';
	result += '// ==Notes==\n';
	config.notes.forEach((val) => {
		result += `// ${val}\n`;
	});
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