import Module from './types/module';
import ModuleVjudge from './modules/vjudge/main';

export default class App {
	modules: Array<Module>

	apply(location: Location) {
		for (const module of this.modules) {
			if (module.match.includes(location.host)) {
				module.apply(location)
				break
			}
		}
	}

	register(module: Module) {
		this.modules.push(module)
	}

	constructor() {
		this.modules = []
	}
}

export const app = new App();
app.register(new ModuleVjudge());
