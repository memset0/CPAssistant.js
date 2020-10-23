const statementTranslater = require('./methods/statement-translater.js');

if (
	location.pathname.match(/^\/problemset\/problem\/\d+\/[A-Za-z]\d*$/) ||
	location.pathname.match(/^\/contest\/\d+\/problem\/[A-Za-z]\d*$/) ||
	location.pathname.match(/^\/gym\/\d+\/problem\/[A-Za-z]\d*$/) 
) {
	statementTranslater();
}