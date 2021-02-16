const utils = require('../../../utils');
const spider = require('./spider');

async function generate(problem_list) {
	if (typeof problem_list === 'string') {
		let source = problem_list;
		problem_list = [];
		for (let plain of source.split(',')) {
			console.log(plain);
			let oj = plain.split(':')[0];
			let part = plain.split(':')[1];
			if (~part.indexOf('-')) {
				let l = parseInt(part.slice(0, part.indexOf('-')));
				let r = parseInt(part.slice(part.indexOf('-') + 1, part.length));
				for (let index = l; index <= r; index++) {
					problem_list.push({ oj, id: index });
				}
			} else {
				problem_list.push({ oj, id: part });
			}
		}
	}

	problem_list = await Promise.all(problem_list.map(problem => spider.getProblemInfo(problem.oj, problem.id)));
	const content = problem_list.map(data => {
		return `| [problem:${data.oj}-${data.id}] | [${data.title}](/problem/${data.oj}-${data.id}/origin) | ${data.hidden_id} | ${data.time_limit} | ${data.memory_limit} |`
	});

	const header = '| Problem | Title | ID | Time Limit | Memory Limit |\n' +
		'|---|---|---|---|---|\n';
	const footer = '\n';
	const response = header + content.join('\n') + footer;

	return response;
}

utils.register('vjudge.problemlistGenerater', generate);