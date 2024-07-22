import config from '../../config'
import App from '../../app'
import Module from "../../types/module"

export default class ModuleHDU extends Module {
	run() {
	}

	constructor(app: App) {
		super(app, 'hdu', config.match.hdu)
	}
}