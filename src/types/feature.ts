import App from '../app';
import Module from './module';
import { Dict } from '../utils/type';

export default class Feature {
	app: App
	module: Module
	name: string

	log(...args: any[]) {
		return this.module.log(`[${this.name}]`, ...args);
	}

	run() { }

	apply() {
		this.run();
	}

	plugin(moduleName: string, func: () => void) {
		if (moduleName in this.app.modules) {
			const module = this.app.modules[moduleName];
			const virtualFeature = new Feature(module, `${this.module.name}::${this.name}`);
			virtualFeature.run = () => { func.call(virtualFeature); };
			module.register(virtualFeature);
		} else {
			if (!(moduleName in this.app._queuedPlugins)) {
				this.app._queuedPlugins[moduleName] = [];
			}
			this.app._queuedPlugins[moduleName].push({ feature: this, func });
		}
	}

	on(match: string | Array<string>, func: (args: Dict<string>) => void): boolean {
		if (match instanceof Array) {
			let ok = false
			for (const singleMatch of match) {
				ok = this.on(singleMatch, func)
				if (ok) {
					return ok
				}
			}
			return false
		}

		const args: Dict<string> = {}
		const matchParts = match.slice(1).split('/')
		const pathParts = location.pathname.slice(1).split('/')

		if (pathParts.length < matchParts.length) {
			return false
		}

		for (let i = 0; i < matchParts.length; i++) {
			if (matchParts[i] === '*') {
				break
			} else if (matchParts[i].startsWith('<') && matchParts[i].endsWith('>')) {
				const key = matchParts[i].slice(1, matchParts[i].length - 1)
				args[key] = pathParts[i]
			} else {
				if (matchParts[i] != pathParts[i]) {
					return false
				}
			}
		}

		func(args)
		return true
	}

	constructor(module: Module, name: string) {
		this.app = module.app;
		this.module = module;
		this.name = name;
	}
}