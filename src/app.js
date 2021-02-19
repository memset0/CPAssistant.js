const config = require('@/config');

function isCurrectRoute(route) {
	const partten = new RegExp('^' + route.replace('*', '.*') + '$');
	return !!location.pathname.match(partten);
}

let processList = [];

const app = {
	at(route, callback) {
		if (isCurrectRoute(route)) {
			callback();
		}
	},
	when(route, callback) {
		processList.push({ format: 'route', route, callback });
	},
	register(name, callback) {
		processList.push({ format: 'module', name, callback });
	},
	load() {
		for (const process of processList) {
			switch (process.format) {
				case 'route':
					if (isCurrectRoute(process.route)) {
						process.callback();
					}
					break;
				case 'module':
					if (config.query('module.' + process.name, true)) {
						process.callback();
					}
					break;
				default:
					throw new Error('No such format!');
			}
		}
	},
};

module.exports = app;