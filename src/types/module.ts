import App from '../app';
import Feature from './feature';
import { PlainFunction } from '../utils/type';

export default class Module {
	app: App
	name: string
	match: Array<string>
	features: Array<Feature>
	plugins: Array<PlainFunction>

	log(...args: any[]) {
		return this.app.log(`[${this.name}]`, ...args);
	}

	run() { }

	apply() {
		this.run()
		for (const feature of this.features) {
			feature.apply()
		}
		for (const pluginFunction of this.plugins) {
			pluginFunction()
		}
	}

	register(feature: Feature) {
		this.features.push(feature)
	}

	constructor(app: App, name: string, match: Array<string>) {
		this.app = app
		this.name = name
		this.match = match
		this.features = []
		this.plugins = []
	}
}