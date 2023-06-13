import { app } from './app'
import { Dict } from './utils/type'

const config: Dict<any> = {}

config.match = []
for (const module of app.modules) {
	for (const domain of module.match) {
		config.match.push(`http://${domain}`)
		config.match.push(`http://${domain}/*`)
		config.match.push(`https://${domain}`)
		config.match.push(`https://${domain}/*`)
	}
}

export default config