const utils = require('@/utils.js');

async function getProblemInfo(oj, id) {
	oj = String(oj);
	id = String(id);

	const res = await $.get(`/problem/${encodeURIComponent(oj)}-${encodeURIComponent(id)}`);

	const page_title = res.match(/<title>(.+)<\/title>/)[1];
	const data_json = JSON.parse(res.match(/<textarea style="display: none" name="dataJson">(.+)<\/textarea>/)[1]);

	let response = {
		oj,
		id,
		title: page_title.split(` - ${oj} ${id}`)[0],
		hidden_id: data_json.problemId,
	};
	for (let property of data_json.properties) {
		if (property.title == 'Time limit') {
			response.time_limit = property.content;
		}
		if (property.title == 'Memory limit') {
			response.memory_limit = property.content;
		}
	}

	return response;
}

utils.register('vjudge.getProblemInfo', async (oj, id) => {
	const response = await getProblemInfo(oj, id);
	console.log(response);
	return response;
});

module.exports = {
	getProblemInfo
};