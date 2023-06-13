import Module from './module';

export default class Feature {
	module: Module
	name: string
	location: Location

	run() { }

	apply(location: Location) {
		this.location = location
		this.run()
	}

	on(match: string | Array<string>, func: (args: any) => void): boolean {
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

		const args = {}
		const matchParts = match.slice(1).split('/')
		const pathParts = this.location.pathname.slice(1).split('/')

		if (pathParts.length < matchParts.length) {
			return false
		}

		for (let i = 0; i < matchParts.length; i++) {
			if (matchParts[i] === '*') {
				break
			} else if (matchParts[i].startsWith('<') && matchParts[i].endsWith('>')) {
				const key = matchParts[i].slice(1, matchParts[i].length - 1)
				args[key] = pathParts
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

	}
}