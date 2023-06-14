import Module from "../../types/module"
import CustomStyle from "./features/CustomStyle"
import AcceptedCounter from "./features/AcceptedCounter"

export default class ModuleVjudge extends Module {
	run() {
	}

	constructor() {
		super('vjudge', [
			'vjudge.net',
			'cn.vjudge.net',
			'vjudge.z180.cn',
		])

		this.register(new CustomStyle(this, 'custom-style'))
		this.register(new AcceptedCounter(this, 'accepted-counter'))
	}
}