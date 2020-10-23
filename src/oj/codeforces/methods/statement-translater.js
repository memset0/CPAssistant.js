const md5 = require('md5');
const utils = require('../../../utils.js');

let is_processing = false;

function randomInt() {
	let result = '';
	for (let i = 0; i < 6; i++) {
		result += String(Math.floor(Math.random() * 10));
	}
	return result;
}

async function translate() {
	if (is_processing) {
		return;
	}
	is_processing = true;

	$('.problem-statement > div:not(.translated):not(.header):not(.sample-tests)')
		.each(async (index, element) => {
			// if (index) {
			// 	return;
			// }
			let $element = $(element);
			let content_list = [];
			let transform_groups = {};

			console.log($element);

			$element.children('p').each((index, element) => {
				let $element = $(element);
				let content = $element.html();
				$element.children('*')
					.each((index, element) => {
						let id, html;
						let hash = md5(element.outerHTML);
						if (Object.keys(transform_groups).includes(hash)) {
							id = transform_groups[hash].id;
							html = transform_groups[hash].html;
						} else {
							id = randomInt();
							html = element.outerHTML;
							transform_groups[hash] = { id, html };
						}
						content = content.replace(html, `{${id}}`);
					});
				console.log(content);
				content_list.push(content);
			});

			let spliter = randomInt();
			let source_content = content_list.join(`{{${spliter}}}`);
			console.log(source_content);
			let target_content = await utils.translate(source_content);
			console.log(target_content);
			for (let hash in transform_groups) {
				let { id, html } = transform_groups[hash];
				target_content = target_content.replace(RegExp(`\\{\\s*${id}\\s*\\}`, 'g'), html);
				console.log(id, html.slice(0, 20));
			}
			content_list = target_content.split(RegExp(`\\{\\{\\s*${spliter}\\s*\\}\\}`));

			$element.children('p').each((index, element) => {
				let $element = $(element);
				let content = content_list[index];
				$element.html(content);
			});
		});

	is_processing = false;
}

module.exports = async function () {
	console.log('[oi-helper CST] >> codeforces-statement-translater');

	let $translateButton = $('<li><a>translate</a></li>');
	$translateButton.children('a').click(translate);
	$('#pageContent .second-level-menu-list').append($translateButton);
}