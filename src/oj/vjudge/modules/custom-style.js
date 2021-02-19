const app = require('@/app');

module.exports = () => {
	require('../style/index.less');
	app.at('/user/*', () => { require('../style/profile.less'); });

	$('.navbar .navbar-brand').text('Virtual Judge');

	if ($('body > .container, body > .container-fluid').css('margin-top') == '30px') {
		$('body > .container, body > .container-fluid').addClass('_oi_modified_container');
	}

	app.at('/user', () => {
		$('body>.container-fluid').addClass('container');
	});

	app.at('/group', () => {
		$('#active-groups-panel').remove();
		$('#explore-groups>.row>.col-md-12>h4:first-child').remove();
		$('#explore-groups>.row>.col-md-12>hr:first-child').remove();		
	});
};