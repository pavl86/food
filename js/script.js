window.addEventListener('DOMContentLoaded', () => {

	// *** Tabs ***

	const tabs = document.querySelectorAll('.tabheader__item');
	const tabsContent = document.querySelectorAll('.tabcontent');
	const tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(tab => {
			tab.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();
	
	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});


	// *** Timer ***

	const deadline = '2022-01-01';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor((t / (1000 * 60 * 60 * 24))),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60) % 24));

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return '0' + num;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {

		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);

	// *** Modal ***

	const modalTrigger = document.querySelectorAll('[data-modal]');
	const modal = document.querySelector('.modal');
	// const modalCloseBtn = document.querySelector('[data-close]');

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		// modal.classList.toggle('show');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}
	
	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		// modal.classList.toggle('show');
		document.body.style.overflow = '';
	}

	// modalCloseBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == "") {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === "Escape" && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 50000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

	// *** Классы для карточек ***

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.trasfer = 27;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.trasfer;
		}

		render() {
			const element = document.createElement('div');

			if (this.classes.length === 0) {
				this.classes = 'menu__item';
				element.classList.add(this.classes);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
				<img src=${this.src} alt=${this.alt} />
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}	</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
		`;
		this.parent.append(element);
		}
	}

	const getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			 throw new Error(`Could not fech ${url}, status: ${res.status}`);
			 // если будет 404 и т.д. fech() не воспримит как ошибку, поэтому прописваем вручную
			 // если не будет интернета, ответа от сервера тогда сработает блок catch и все Ok
		}

		return await res.json();
	};

	// const div = new MenuCard();
	// div.render();

	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});

	// вариант 2, если использовать только один раз (не нужна шаблонизация)

	// getResource('http://localhost:3000/menu')
	// 	.then(data => createCard(data));

	// function createCard(data) {
	// 	data.forEach(({img, altimg, title, descr, price}) => {
	// 		const element = document.createElement('div');

	// 		element.classList.add('menu__item');

	// 		element.innerHTML = `
	// 		<img src=${img} alt=${altimg} />
	// 		<h3 class="menu__item-subtitle">${title}</h3>
	// 		<div class="menu__item-descr">${descr}	</div>
	// 		<div class="menu__item-divider"></div>
	// 		<div class="menu__item-price">
	// 			<div class="menu__item-cost">Цена:</div>
	// 			<div class="menu__item-total"><span>${price}</span> грн/день</div>
	// 		</div>
	// 		`;

	// 		document.querySelector('.menu .container').append(element);
	// 	});
	// }


	//	Forms

	const forms = document.querySelectorAll("form");

	const message = {
		loading: "img/form/spinner.svg",
		success: "Спасибо, Скоро мы с Вами свяжемся",
		failure: "что-то пошло не так..."
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();	// отменит перезагрузку всей страницы после submit (важна для AJAX запросов в начале)

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			// const request = new XMLHttpRequest();
			// request.open('POST', 'server.php');
			// request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			const formData = new FormData(form);
			// ВАЖНО: в HTML > input должен быть атрибут name=""

			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			// ** exaple method Object.entries() - превращает обьект в массив массивов (матрицу)
			// const obj = {a: 23, b: 45};
			// console.log(Object.entries(obj));	//	[ [ 'a', 23 ], [ 'b', 45 ] ]

			// const object = {};
			// formData.forEach(function(value, key){
			// 	object[key] = value;
			// });

			// const json = JSON.stringify(object);

			// fetch('server.php', {
			// 	method: "POST",
			// 	headers: {
			// 		'Content-type': 'application/json'
			// 	},
			// 	body: JSON.stringify(object)
			// })
			postData('http://localhost:3000/requests', json)
			// .then(data => data.text())
			.then(data => {
				console.log(data);
				showThanksModal(message.success);
				statusMessage.remove();
			})
			.catch(() => {
				showThanksModal(message.failure);
			})
			.finally(() => {
				form.reset();
			});

			// request.send(json);

			// request.addEventListener('load', () => {
			// 	if (request.status === 200) {
			// 		console.log(request.response);
			// 		showThanksModal(message.success);
			// 		form.reset();
			// 		statusMessage.remove();
			// 	} else {
			// 		showThanksModal(message.failure);
			// 	}
			// });
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector(".modal__dialog");

		prevModalDialog.classList.add("hide");
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add("modal__dialog");
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>×</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add("show");
			prevModalDialog.classList.remove("hide");
			closeModal();
		}, 4000);
	}
	//	пример fethch запросов
	// fetch('https://jsonplaceholder.typicode.com/posts', {
	// 	method: "POST",
	// 	body: JSON.stringify({name: "Alex"}),
	// 	headers: {
	// 		'Content-type': 'application/json'
	// 	}
	// })
	// .then(response => response.json())
	// .then(json => console.log(json));

	fetch('http://localhost:3000/menu')
		.then(data => data.json())
		.then(res => console.log(res));

	// 	**	Slider	**

	const slides = document.querySelectorAll('.offer__slide');
	const slider = document.querySelector('.offer__slider');
	const prev = document.querySelector('.offer__slider-prev');
	const next = document.querySelector('.offer__slider-next');
	const current = document.querySelector('#current');
	const total = document.querySelector('#total');
	const slidesWrapper = document.querySelector('.offer__slider-wrapper');
	const slidesFieled = document.querySelector('.offer__slider-inner');
	const width = window.getComputedStyle(slidesWrapper).width;
	const indicators = document.createElement('ol');
	const dots =[];
	let slideIndex = 1;
	let offset = 0;

	function datActive() {
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = '1';
	}
	function indexZero() {
		slides.length < 10 ? current.textContent = `0${slideIndex}` : current.textContent = slideIndex;
	}
	function onliDigit(e) {
		return +e.replace(/\D/g, '');
	}

	indexZero();
	slides.length < 10 ? total.textContent = `0${slides.length}` : total.textContent = slides.length;

	slidesFieled.style.width = 100 * slides.length + '%';
	slidesFieled.style.display = 'flex';
	slidesFieled.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';
	indicators.classList.add('carousel-indicators');
	/* 
		indicators.style.cssText = `
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 15;
			display: flex;
			justify-content: center;
			margin-right: 15%;
			margin-left: 15%;
			list-style: none;
		`;
	 */
	slider.append(indicators);

	for (i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');

		if (i == 0) {
			dot.style.opacity = 1;
		}

		indicators.append(dot);
		dots.push(dot);
	}

	next.addEventListener('click', () => {
		// if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {	// удаляем все не числа, меняем на '' (ничего)
		if (offset == onliDigit(width) * (slides.length - 1)) {	// удаляем все не числа, меняем на '' (ничего)
			offset = 0;
		} else {
			offset += onliDigit(width);
		}

		slidesFieled.style.transform = `translateX(-${offset}px)`;

		slideIndex == slides.length ? slideIndex = 1 : slideIndex++;
		indexZero();
		datActive();
	});

	prev.addEventListener('click', () => {
		if (offset === 0) {	// 500 * 4
			// offset = +width.slice(0, -2) * (slides.length - 1);
			offset = onliDigit(width) * (slides.length - 1);
		} else {
			offset -= onliDigit(width);
		}

		slidesFieled.style.transform = `translateX(-${offset}px)`;

		slideIndex == 1 ? slideIndex = slides.length : slideIndex--;
		indexZero();
		datActive();
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = onliDigit(width) * (slideTo - 1);

			slidesFieled.style.transform = `translateX(-${offset}px)`;

			indexZero();
			datActive();
		});
	});
	/*
		(slides.length < 10)
			? (total.textContent = `0${slides.length}`)
			: total.textContent = slides.length;

		function showSlides(n) {
			if (n > slides.length) {
				slideIndex = 1;
			}
			if (n < 1) {
				slideIndex = slides.length;
			}

			slides.forEach((item) => {
				item.classList.remove('show');
				item.classList.add('hide');
			});

			slides[slideIndex - 1].classList.toggle('hide');
			slides[slideIndex - 1].classList.toggle('show');
			
			(slides.length < 10) 
				? current.textContent =  `0${slideIndex}`
				: current.textContent =  slideIndex;
		}

		showSlides(slideIndex);

		function plusSlides (n) {
			showSlides(slideIndex += n);
		}

		prev.addEventListener('click', () => plusSlides(-1));
		next.addEventListener('click', () => plusSlides(1));
	*/

	//	**	Calculator	**

	const result = document.querySelector('.calculating__result span');
	let height, weight, age, sex, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}
	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);

			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}
		});
	}

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);
		// const elements = document.querySelectorAll(`${parentSelector} div`);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}

				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});
	
				e.target.classList.add(activeClass);
	
				calcTotal();
			});
		});
	}

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			input.value.match(/\D/g)
				? input.style.border = '2px solid red'
				: input.style.border = 'none';

			// if (input.value.match(/\D/g)) {
			// 	input.style.border = '2px solid red';
			// } else {
			// 	input.style.border = 'none';
			// }

			switch(input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}

			calcTotal();
		});
	}
	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
	calcTotal();
	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
	getDynamicInformation('#weight');
	getDynamicInformation('#height');
	getDynamicInformation('#age');
});