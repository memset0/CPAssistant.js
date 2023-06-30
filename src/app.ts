import { Dict } from './utils/type';
import Module from './types/module';
import Feature from './types/feature';
import ModuleVjudge from './modules/vjudge/main';
import ModuleCodeforces from './modules/codeforces/main';

export default class App {
	modules: Dict<Module>
	_queuedPlugins: Dict<Array<{ feature: Feature, func: () => void }>>

	log(...args: any[]) {
		return console.log('[CPAssistant.js]', ...args);
	}

	apply() {
		for (const name in this.modules) {
			const module = this.modules[name];
			if (module.match.includes(location.host)) {
				module.apply();
				break;
			}
		}
	}

	register(module: Module) {
		this.modules[module.name] = module;
		if (module.name in this._queuedPlugins) {
			for (const queuedPlugin of this._queuedPlugins[module.name]) {
				const { feature, func } = queuedPlugin;
				feature.plugin(module.name, func);
			}
		}
	}

	constructor() {
		this._queuedPlugins = {};

		this.modules = {};
	}
}

export const app = new App();
app.register(new ModuleVjudge(app));
app.register(new ModuleCodeforces(app));