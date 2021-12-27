function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    
	// 	**	Slider	**

	const slides = document.querySelectorAll(slide);
	const slider = document.querySelector(container);
	const prev = document.querySelector(prevArrow);
	const next = document.querySelector(nextArrow);
	const current = document.querySelector(currentCounter);
	const total = document.querySelector(totalCounter);
	const slidesWrapper = document.querySelector(wrapper);
	const slidesField = document.querySelector(field);
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
		current.textContent = slides.length < 10 ? `0${slideIndex}` : slideIndex;
	}
	function onliDigit(e) {
		return +e.replace(/\D/g, '');
	}

	indexZero();
	total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

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

	for (let i = 0; i < slides.length; i++) {
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

		slidesField.style.transform = `translateX(-${offset}px)`;

		slideIndex = slideIndex == slides.length ? 1 : slideIndex + 1;
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

		slidesField.style.transform = `translateX(-${offset}px)`;

		slideIndex = slideIndex == 1 ? slides.length : slideIndex - 1;
		
		indexZero();
		datActive();
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = onliDigit(width) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			indexZero();
			datActive();
		});
	});
}

export default slider;