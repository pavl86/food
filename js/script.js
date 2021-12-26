window.addEventListener('DOMContentLoaded', () => {
	const cards = require('./modules/cards');
	const culc = require('./modules/culc');
	const forms = require('./modules/forms');
	const modal = require('./modules/modal');
	const slider = require('./modules/slider');
	const tabs = require('./modules/tabs');
	const timer = require('./modules/timer');

	tabs();
	modal();
	timer();
	cards();
	culc();
	forms();
	slider();
});