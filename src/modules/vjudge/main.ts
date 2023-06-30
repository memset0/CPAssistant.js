import config from '../../config'
import App from '../../app'
import Module from "../../types/module"
import AcceptedCounter from "./features/AcceptedCounter"
import ForkContest from './features/ForkContest'

export default class ModuleVjudge extends Module {
	run() {
	}

	constructor(app: App) {
		super(app, 'vjudge', config.match.vjudge)

		this.register(new AcceptedCounter(this, 'accepted-counter'))
		this.register(new ForkContest(this, 'fork-contest'))
	}
}