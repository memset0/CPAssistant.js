import Module from "../../types/module"
import AcceptedCounter from "./features/accepted-counter"

export default class ModuleVjudge extends Module {
	run() {
	}

	constructor() {
		super('vjudge', [
			'vjudge.net',
			'cn.vjudge.net',
			'vjudge.z180.cn',
		])

		this.register(new AcceptedCounter(this, 'accepted-counter'))
	}
}