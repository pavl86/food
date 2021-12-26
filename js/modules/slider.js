function slider() {
    
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
		current.textContent = slides.length < 10 ? `0${slideIndex}` : slideIndex;
		// slides.length < 10 ? current.textContent = `0${slideIndex}` : current.textContent = slideIndex;
	}
	function onliDigit(e) {
		return +e.replace(/\D/g, '');
	}

	indexZero();
	// slides.length < 10 ? total.textContent = `0${slides.length}` : total.textContent = slides.length;
	total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;

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

		// slideIndex == slides.length ? slideIndex = 1 : slideIndex++;
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

		slidesFieled.style.transform = `translateX(-${offset}px)`;

		// slideIndex == 1 ? slideIndex = slides.length : slideIndex--;
		slideIndex = slideIndex == 1 ? slides.length : slideIndex - 1;
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
}

module.exports = slider;