const translate = require('../methods/translate.js');
const { css } = require('./translator.less');

const location = unsafeWindow.location;
console.log('location:', location);

if (
	location.pathname.match(/^\/problemset\/problem\/\d+\/[A-Za-z]\d*$/) ||
	location.pathname.match(/^\/contest\/\d+\/problem\/[A-Za-z]\d*$/) ||
	location.pathname.match(/^\/contest\/\d+\/problem\/0$/) ||
	location.pathname.match(/^\/gym\/\d+\/problem\/[A-Za-z]\d*$/)
) {
	let $translateButton = $('<li><a>translate</a></li>');
	$translateButton.children('a').click(function () {
		$('.problem-statement > div:not(.translated):not(.header):not(.sample-tests)')
			.each((_, element) => {
				translate(element);
			});
	});
	$('#pageContent .second-level-menu-list').append($translateButton);
}

if (
	location.pathname.match(/^\/blog\/entry\/\d+$/)
) {
	$('.spoiler').each((_, element) => {
		const $element = $(element);
		if ($element.children(".spoiler-title").text().trim() == 'Tutorial') {
			const $translateButton = $('<a class="spoiler-translate">TRANSLATE</a>');
			$translateButton.click(function () {
				console.log($element.children('.spoiler-content'), $element.children('.spoiler-content')[0]);
				translate($element.children('.spoiler-content')[0]);
			});
			$element.children('.spoiler-content').prepend($translateButton);
		}
	});
}