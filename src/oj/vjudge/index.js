const { css } = require('./style.less');

const utils = require('../../utils.js');

const REMOTE_SUBMISSION_LINK_FORMAT = {
	'LibreOJ': 'https://loj.ac/submission/<id>',
	'UniversalOJ': 'https://uoj.ac/submission/<id>',
	'HDU': 'http://acm.hdu.edu.cn/viewcode.php?rid=<id>',
	'黑暗爆炸': 'https://darkbzoj.tk/submission/<id>',
	'51Nod': 'https://www.51nod.com/Challenge/ProblemSubmitDetail.html#judgeId=<id>'
};

const DESCRIPTION_MEANINGLESS_TITLE = [
	'',
	'Statement',
	'Problem Statement',
	'题目描述',
	'题目大意',
	'题目背景',
];

// layout: /user
if (location.pathname == '/user') {
	$('body>.container-fluid').addClass('container');
}

// layout: /group
if (location.pathname == '/group') {
	$('#active-groups-panel').remove();
	$('#explore-groups>.row>.col-md-12>h4:first-child').remove();
	$('#explore-groups>.row>.col-md-12>hr:first-child').remove();
}

// feat: 题单生成器
require('./problemlist-generater.js');

// fix: `body > .container` 占位
if ($('body > .container, body > .container-fluid').css('margin-top') == '30px') {
	$('body > .container, body > .container-fluid').addClass('_oi_modified_container');
}

// feat: 标题
$('.navbar .navbar-brand').text('Virtual Judge');

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
	if (DESCRIPTION_MEANINGLESS_TITLE.includes($(this).text().trim())) {
		$(this).remove();
	}
});

// feat: RemoteRunID 链接到提交记录
$(document).on('click', '.modal-dialog td.RemoteRunId', function () {
	let remoteProblem = $('#solutionModalLabel a:nth-child(3)').text().slice(1, -1);
	let remoteProblemId = remoteProblem.split('-')[1];
	let remoteProblemOnlineJudge = remoteProblem.split('-')[0];
	let remoteSubmissionId = $(this).text();
	// console.log(remoteProblemOnlineJudge, remoteProblemId, remoteSubmissionId);
	if (Object.keys(REMOTE_SUBMISSION_LINK_FORMAT).includes(remoteProblemOnlineJudge)) {
		let remoteSubmissionUrl = REMOTE_SUBMISSION_LINK_FORMAT[remoteProblemOnlineJudge]
			.replace('<id>', remoteSubmissionId)
			.replace('<prob>', remoteProblemId);
		utils.openInNewTab(remoteSubmissionUrl);
	}
});

// feat: 个人信息界面统计通过题数
if (location.pathname.startsWith('/user/')) {
	$(document).on('click', '.toggle-detail', function () {
		$("#probRecords tbody tr:not(#templ)").each(function () {
			let oj_name = $(this).children('td').eq(0).text().trim();
			let ac_num = $(this).children('td').eq(1).children('a').length;
			let failed_num = $(this).children('td').eq(2).children('a').length;
			$(this).children('td').eq(0).html(`
				${oj_name}
				<br>
				<span style="color: #999">
					${ac_num} / ${ac_num + failed_num}
				</span>
			`);
		});
	});
}