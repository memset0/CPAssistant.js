require('./style-loader');
require('./modules/accepted-counter'); // 个人信息界面统计通过题数
require('./modules/remote-submission-link'); // 远程提交链接跳转
require('./modules/problemlist-generater'); // (命令行)题单生成器

// fix: codeforces 等 OJ 会屏蔽外链跳转
$('#prob-title a, a#prob-title').attr('rel', 'noreferrer');
$('#problem-origin a, a#problem-origin').attr('rel', 'noreferrer');

// feat: 删除题面中空白或无意义的 dd 或 dt
$('#description-container > dd').each(function () {
	let e = $.clone(this);
	$(e).find('style, script').remove();
	if (!$(e).text().trim()) {
		let html = $(this).html();
		$('#description-container').append('<div>' + html + '</div>');
		$(this).prev().remove();
		$(this).remove();
	}
});
$('#description-container > dt').each(function () {
	if ([
		'',
		'Statement',
		'Problem Statement',
		'题目描述',
		'题目大意',
		'题目背景',
	].includes($(this).text().trim())) {
		$(this).remove();
	}
});