import { Dict } from './utils/type'

const config: Dict<any> = {
	match: {
		codeforces: [
			'codeforces.com',
			'codeforc.es',
		],
		qoj: [
			'qoj.ac',
			'pjudge.ac',
		],
		vjudge: [
			'vjudge.net',
			'cn.vjudge.net',
			'vjudge.z180.cn',
		],
	},
}

config.matches = []
for (const module in config.match) {
	for (const domain of config.match[module]) {
		config.matches.push(`http://${domain}`)
		config.matches.push(`https://${domain}`)
		config.matches.push(`http://${domain}/*`)
		config.matches.push(`https://${domain}/*`)
	}
}

export default config