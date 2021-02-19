const app = require('@/app');

app.register('codeforces-translator', require('./modules/translator'));
app.register('codeforces-fast-submit', require('./modules/fast-submit'));