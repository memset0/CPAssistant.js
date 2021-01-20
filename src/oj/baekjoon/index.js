const translate = require('./methods/translate');

$(document).ready(function () {
	const submissionResult = {
		'맞았습니다!!': 'Accepted',
	};

	translate({
		'.topbar .loginbar li a': { // topbar
			설정: 'Settings',
			로그아웃: 'Log out',
			로그인: 'Login',
			회원가입: 'Register',
			'replace::코인': 'Coins',
		},
		'.nav.nav-pills li a': { // navbar
			문제: 'Problem',
			출처: 'Category',
			단계: 'Step',
			분류: 'Classification',
			'추가된 문제': 'Added Problems',
			'추가된 영어 문제': 'Added English Problems',
		},
		'.table-responsive .table.table-bordered thead tr th': { // problem list table
			출처: 'Source',
			제목: 'Title',
			'문제 번호': 'ID',
			정보: 'Tags',
			'맞은 사람': 'AC',
			제출: 'Submit',
			'정답 비율': 'AC Ratio',
		},
		'#problem-info tr th': { // problem info #1
			'시간 제한': 'Time Limit',
			'메모리 제한': 'Memory Limit',
			제출: 'Submit',
			정답: 'AC',
			'맞은 사람': 'AC User',
			'정답 비율': 'AC Ratio',
		},
		'#problem-info tr td': { // problem info #2
			'replace::초': 's'
		},
		'.content .headline h2': { // problem content title
			문제: 'Description',
			입력: 'Input',
			출력: 'Output',
			출처: 'Source',
			'알고리즘 분류': 'Problem Tags',
			메모: 'Problem Memo',
			'replaceHTML::예제 입력': 'Sample Input',
			'replaceHTML::예제 출력': 'Sample Output',
			'replaceHTML::복사': 'COPY',
		},
		'.problem-memo-write': { // problem memo
			'메모 작성하기': 'Write Memo',
		},
		'.problem-label': { // problem label
			'스페셜 저지': 'Special Judge',
		},
		'.problem-menu li a': { // problem menu
			'replace::번': '',
			제출: 'Submit',
			'맞은 사람': 'Statistics (Fastest)',
			숏코딩: 'Statistics (Shortest)',
			'채점 현황': 'Submissions',
			'내 제출': 'My Submissions',
		},
		'.submit-form label, .submit-form label input, .submit-form button': { // problem submit page
			언어: 'Language',
			'소스 코드 공개': 'Visibility',
			'소스 코드': 'Source Code',
			제출: 'Submit',
			'replaceHTML::맞았을 때만 공개': 'Only Accepted',
			'replaceHTML::비공개': 'Private',
			'replaceHTML::공개': 'Open',
		},
		'#status-table tr th': { // submit status (thead)
			'제출 번호': 'Submission ID',
			아이디: 'User',
			문제: 'Problem',
			결과: 'Result',
			메모리: 'Memory',
			시간: 'Time',
			언어: 'Language',
			'코드 길이': 'Solution Size',
			'제출한 시간': 'Submit Time',
		},
		'#status-table tr td .result-text span': { // submit status (tbody)
			...submissionResult,
		},
		'form.form-inline': {
			'replaceHTML::아이디': 'User ID',
			'replaceHTML::모든 언어': 'Language',
			'replaceHTML::모든 결과': 'Result',
			'replaceHTML::검색': 'Search',
		}
	});
});

console.log($);