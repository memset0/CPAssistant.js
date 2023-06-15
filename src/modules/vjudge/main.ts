import config from '../../config'
import Module from "../../types/module"
import CustomStyle from "./features/CustomStyle"
import AcceptedCounter from "./features/AcceptedCounter"

export default class ModuleVjudge extends Module {
	run() {
	}

	constructor() {
		super('vjudge', config.match.vjudge)

		this.register(new CustomStyle(this, 'custom-style'))
		this.register(new AcceptedCounter(this, 'accepted-counter'))
	}
}