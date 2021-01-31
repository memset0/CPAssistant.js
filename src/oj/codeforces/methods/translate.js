const md5 = require('md5');
const utils = require('../../../utils.js');

const children_selector = 'p, ul>li';

function randomInt() {
	let result = '';
	for (let i = 0; i < 6; i++) {
		result += String(Math.floor(Math.random() * 9) + 1);
	}
	return result;
}

async function translate(element) {

	const $element = $(element);
	if ($element.hasClass('translated')) {
		return;
	}
	$element.addClass('translated');

	let source_list = [];
	let content_list = [];
	let transform_groups = {};

	function queryHTML(html) {
		let id;
		let hash = md5(html);
		if (Object.keys(transform_groups).includes(hash)) {
			id = transform_groups[hash].id;
		} else {
			id = randomInt();
			transform_groups[hash] = { id, html };
		}
		return { id, hash };
	}

	$element.find(children_selector)
		.each((index, element) => {
			const $element = $(element);
			$element.find('script, span.MathJax_Preview').remove();
			let content = $element.html();
			$element.children('*')
				.each((index, element) => {
					const html = element.outerHTML;
					const { id } = queryHTML(html);
					content = content.replace(html, `{${id}}`);
					// console.log(id, html.slice(0, 30));
				});
			// console.log(content);
			content_list.push(content);
		});

	const spliter = randomInt();
	const spliter_text = `\n\n{{${spliter}}}\n\n`;
	let source_content = [];
	for (let content of content_list) {
		content = content.replace(/&nbsp;/g, '');
		if (source_content.length && source_content[source_content.length - 1].length + content.length < 1000) {
			source_content[source_content.length - 1] += spliter_text + content;
		} else {
			source_content.push(content);
		}
	}
	// console.log(source_content);

	let target_content = (await Promise.all(source_content.map(ctx => utils.translate(ctx, true)))).join(spliter_text);
	// console.log(target_content);
	for (const hash in transform_groups) {
		const { id, html } = transform_groups[hash];
		target_content = target_content.replace(RegExp(`\\{\\s*${id}\\s*\\}`, 'g'), ' ' + html + ' ');
	}
	content_list = target_content.split(RegExp(`\\{\\{\\s*${spliter}\\s*\\}\\}`));

	$element.find(children_selector)
		.each((index, element) => {
			let $element = $(element);
			let content = content_list[index];
			for (let i = 0; i < source_list.length; i++) {
				let j = content_list.length - source_list.length + i;
				if (~source_list[i].indexOf('tex-font-style-bf')) {
					content_list[j] = '<span class="tex-font-style-bf">' + content_list[j] + '</span>';
				}
				content = content.replaceAll(source_list[i], content_list[j]);
			}
			$element.html(content);
		});
}

module.exports = translate;