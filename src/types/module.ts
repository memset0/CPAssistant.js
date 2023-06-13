import Feature from './feature';


export default class Module {
	name: string
	match: Array<string>
	features: Array<Feature>

	run() { }

	apply(location: Location) {
		this.run()
		for (const feature of this.features) {
			feature.apply(location)
		}
	}

	register(feature: Feature) {
		this.features.push(feature)
	}

	constructor(name: string, match: Array<string>) {
		this.name = name
		this.match = match
		this.features = []
	}
}