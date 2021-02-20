const config = require('@/config');

let processList = [];

function isCurrectRoute(route) {
	if (route instanceof Array) {
		for (const childRoute of route) {
			if (isCurrectRoute(childRoute)) {
				return true;
			}
		}
		return false;
	} else if (route instanceof RegExp) {
		return !!location.pathname.match(route);
	} else if (typeof route === 'string') {
		const partten = new RegExp('^' + route.replace('*', '.*') + '$');
		return !!location.pathname.match(partten);
	} else {
		return false;
	}
}

const app = {
	when(route, callback) {
		processList.push({ format: 'route', route, callback });
	},
	register(name, callback) {
		processList.push({ format: 'module', name, callback });
	},

	at(route, callback) {
		if (isCurrectRoute(route)) {
			callback();
		}
	},

	command(dir, callback) {
		const path = dir.split('.');
		let current = unsafeWindow.mem = unsafeWindow.mem || {};
		for (let index = 0; index + 1 < path.length; index++) {
			current[path[index]] = current[path[index]] || {};
			current = current[path[index]];
		}
		current[path[path.length - 1]] = callback;
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