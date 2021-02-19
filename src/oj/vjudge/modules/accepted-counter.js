module.exports = () => {
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
};