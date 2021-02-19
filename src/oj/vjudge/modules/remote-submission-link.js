const utils = require('@/utils.js');

const REMOTE_SUBMISSION_LINK_FORMAT = {
	'LibreOJ': 'https://loj.ac/submission/<id>',
	'UniversalOJ': 'https://uoj.ac/submission/<id>',
	'HDU': 'http://acm.hdu.edu.cn/viewcode.php?rid=<id>',
	'黑暗爆炸': 'https://darkbzoj.tk/submission/<id>',
	'51Nod': 'https://www.51nod.com/Challenge/ProblemSubmitDetail.html#judgeId=<id>'
};

$(document).on('click', '.modal-dialog td.RemoteRunId', function () {
	let remoteProblem = $('#solutionModalLabel a:nth-child(3)').text().slice(1, -1);
	let remoteProblemId = remoteProblem.split('-')[1];
	let remoteProblemOnlineJudge = remoteProblem.split('-')[0];
	let remoteSubmissionId = $(this).text();
	if (Object.keys(REMOTE_SUBMISSION_LINK_FORMAT).includes(remoteProblemOnlineJudge)) {
		let remoteSubmissionUrl = REMOTE_SUBMISSION_LINK_FORMAT[remoteProblemOnlineJudge]
			.replace('<id>', remoteSubmissionId)
			.replace('<prob>', remoteProblemId);
		utils.openInNewTab(remoteSubmissionUrl);
	}
});