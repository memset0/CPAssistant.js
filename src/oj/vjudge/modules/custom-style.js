module.exports = () => {
	const { css } = require('../style/index.less');

	if (location.pathname.startsWith('/user/')) {
		const { css } = require('../style/profile.less');
	}

	if (location.pathname == '/user') {
		$('body>.container-fluid').addClass('container');
	}

	if (location.pathname == '/group') {
		$('#active-groups-panel').remove();
		$('#explore-groups>.row>.col-md-12>h4:first-child').remove();
		$('#explore-groups>.row>.col-md-12>hr:first-child').remove();
	}

	if ($('body > .container, body > .container-fluid').css('margin-top') == '30px') {
		$('body > .container, body > .container-fluid').addClass('_oi_modified_container');
	}

	$('.navbar .navbar-brand').text('Virtual Judge');
};