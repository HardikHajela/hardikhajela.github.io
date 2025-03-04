// NAV
class StickyNavigation {

	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		this.lastScroll = 0;
		let self = this;
		$('.et-hero-tab').click(function () {
			self.onTabClick(event, $(this));
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}

	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}

	onScroll() {
		this.checkHeaderPosition();
		this.findCurrentTabSelector();
		this.lastScroll = $(window).scrollTop();
	}

	onResize() {
		if (this.currentId) {
			this.setSliderCss();
		}
	}

	checkHeaderPosition() {
		const headerHeight = 75;
		if ($(window).scrollTop() > headerHeight) {
			$('.et-header').addClass('et-header--scrolled');
		} else {
			$('.et-header').removeClass('et-header--scrolled');
		}
		let offset = ($('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight) - headerHeight;
		if ($(window).scrollTop() > this.lastScroll && $(window).scrollTop() > offset) {
			$('.et-header').addClass('et-header--move-up');
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top-first');
			$('.et-hero-tabs-container').addClass('et-hero-tabs-container--top-second');
		}
		else if ($(window).scrollTop() < this.lastScroll && $(window).scrollTop() > offset) {
			$('.et-header').removeClass('et-header--move-up');
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top-second');
			$('.et-hero-tabs-container').addClass('et-hero-tabs-container--top-first');
		}
		else {
			$('.et-header').removeClass('et-header--move-up');
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top-first');
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top-second');
		}
	}

	findCurrentTabSelector(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.et-hero-tab').each(function () {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
			if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if (this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}

	setSliderCss() {
		let width = 0;
		let left = 0;
		if (this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.et-hero-tab-slider').css('width', width);
		$('.et-hero-tab-slider').css('left', left);
	}

}

new StickyNavigation();

const headerh = document.querySelector('.et-header');
let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', () => {
	const currentScrollPos = window.pageYOffset;
	//   if (prevScrollPos > currentScrollPos) {}
	headerh.classList.remove('et-header--hidden');
	if (currentScrollPos > 600) {
		headerh.classList.add('et-header--hidden');
	}
	prevScrollPos = currentScrollPos;
});
//  NAV

// Name in Header

function WordShuffler(holder, opt) {
	var that = this;
	var time = 0;
	this.now;
	this.then = Date.now();

	this.delta;
	this.currentTimeOffset = 0;

	this.word = null;
	this.currentWord = null;
	this.currentCharacter = 0;
	this.currentWordLength = 0;


	var options = {
		fps: 20,
		timeOffset: 5,
		textColor: '#000',
		fontSize: "50px",
		useCanvas: false,
		mixCapital: false,
		mixSpecialCharacters: false,
		needUpdate: true,
		colors: [
			'#f44336', '#e91e63', '#9c27b0',
			'#673ab7', '#3f51b5', '#2196f3',
			'#03a9f4', '#00bcd4', '#009688',
			'#4caf50', '#8bc34a', '#cddc39',
			'#ffeb3b', '#ffc107', '#ff9800',
			'#ff5722', '#795548', '#9e9e9e',
			'#607d8b'
		]
	}

	if (typeof opt != "undefined") {
		for (key in opt) {
			options[key] = opt[key];
		}
	}



	this.needUpdate = true;
	this.fps = options.fps;
	this.interval = 1000 / this.fps;
	this.timeOffset = options.timeOffset;
	this.textColor = options.textColor;
	this.fontSize = options.fontSize;
	this.mixCapital = options.mixCapital;
	this.mixSpecialCharacters = options.mixSpecialCharacters;
	this.colors = options.colors;

	this.useCanvas = options.useCanvas;

	this.chars = [
		'A', 'B', 'C', 'D',
		'E', 'F', 'G', 'H',
		'I', 'J', 'K', 'L',
		'M', 'N', 'O', 'P',
		'Q', 'R', 'S', 'T',
		'U', 'V', 'W', 'X',
		'Y', 'Z'
	];
	this.specialCharacters = [
		'!', '§', '$', '%',
		'&', '/', '(', ')',
		'=', '?', '_', '<',
		'>', '^', '°', '*',
		'#', '-', ':', ';', '~'
	]

	if (this.mixSpecialCharacters) {
		this.chars = this.chars.concat(this.specialCharacters);
	}

	this.getRandomColor = function () {
		var randNum = Math.floor(Math.random() * this.colors.length);
		return this.colors[randNum];
	}

	//if Canvas

	this.position = {
		x: 0,
		y: 50
	}

	//if DOM
	if (typeof holder != "undefined") {
		this.holder = holder;
	}

	if (!this.useCanvas && typeof this.holder == "undefined") {
		console.warn('Holder must be defined in DOM Mode. Use Canvas or define Holder');
	}


	this.getRandCharacter = function (characterToReplace) {
		if (characterToReplace == " ") {
			return ' ';
		}
		var randNum = Math.floor(Math.random() * this.chars.length);
		var lowChoice = -.5 + Math.random();
		var picketCharacter = this.chars[randNum];
		var choosen = picketCharacter.toLowerCase();
		if (this.mixCapital) {
			choosen = lowChoice < 0 ? picketCharacter.toLowerCase() : picketCharacter;
		}
		return choosen;

	}

	this.writeWord = function (word) {
		this.word = word;
		this.currentWord = word.split('');
		this.currentWordLength = this.currentWord.length;

	}

	this.generateSingleCharacter = function (color, character) {
		var span = document.createElement('span');
		span.style.color = color;
		span.innerHTML = character;
		return span;
	}

	this.updateCharacter = function (time) {

		this.now = Date.now();
		this.delta = this.now - this.then;



		if (this.delta > this.interval) {
			this.currentTimeOffset++;

			var word = [];

			if (this.currentTimeOffset === this.timeOffset && this.currentCharacter !== this.currentWordLength) {
				this.currentCharacter++;
				this.currentTimeOffset = 0;
			}
			for (var k = 0; k < this.currentCharacter; k++) {
				word.push(this.currentWord[k]);
			}

			for (var i = 0; i < this.currentWordLength - this.currentCharacter; i++) {
				word.push(this.getRandCharacter(this.currentWord[this.currentCharacter + i]));
			}


			if (that.useCanvas) {
				c.clearRect(0, 0, stage.x * stage.dpr, stage.y * stage.dpr);
				c.font = that.fontSize + " sans-serif";
				var spacing = 0;
				word.forEach(function (w, index) {
					if (index > that.currentCharacter) {
						c.fillStyle = that.getRandomColor();
					} else {
						c.fillStyle = that.textColor;
					}
					c.fillText(w, that.position.x + spacing, that.position.y);
					spacing += c.measureText(w).width;
				});
			} else {

				if (that.currentCharacter === that.currentWordLength) {
					that.needUpdate = false;
				}
				this.holder.innerHTML = '';
				word.forEach(function (w, index) {
					var color = null
					if (index > that.currentCharacter) {
						color = that.getRandomColor();
					} else {
						color = that.textColor;
					}
					that.holder.appendChild(that.generateSingleCharacter(color, w));
				});
			}
			this.then = this.now - (this.delta % this.interval);
		}
	}

	this.restart = function () {
		this.currentCharacter = 0;
		this.needUpdate = true;
	}

	function update(time) {
		time++;
		if (that.needUpdate) {
			that.updateCharacter(time);
		}
		requestAnimationFrame(update);
	}

	this.writeWord(this.holder.innerHTML);


	console.log(this.currentWord);
	update(time);


}

// Name in Header

//Certificates

var $cont = document.querySelector('.cont');
var $elsArr = [].slice.call(document.querySelectorAll('.el'));
var $closeBtnsArr = [].slice.call(document.querySelectorAll('.el__close-btn'));

setTimeout(function () {
	$cont.classList.remove('s--inactive');
}, 200);

$elsArr.forEach(function ($el) {
	$el.addEventListener('click', function () {
		if (this.classList.contains('s--active')) return;
		$cont.classList.add('s--el-active');
		this.classList.add('s--active');
	});
});

$closeBtnsArr.forEach(function ($btn) {
	$btn.addEventListener('click', function (e) {
		e.stopPropagation();
		$cont.classList.remove('s--el-active');
		document.querySelector('.el.s--active').classList.remove('s--active');
	});
});

//Certificates

// Contact

$(".social").hover(function () {
	$(this).toggleClass("is-active");
});

// Contact

var head_name = document.getElementById('head_name');

var headText = new WordShuffler(head_name, {
	textColor: '#000',
	timeOffset: 5,
	mixCapital: true,
	mixSpecialCharacters: true
});

// console.log('waiting');
// wait(5);
// console.log('5 Sec!');

setTimeout(function () {

	document.getElementById("typed").innerHTML = "";
	var options = {
		strings: [
			//"Hardik",
			//"I'm a Business <br> Systems Analyst",
			"I'm a Business <br> Analyst",
			"I'm a Software <br> Developer",
			//"I'm a Technical <br> Project Manager",
			"I'm a Technology <br> Instructor",
		],
		typeSpeed: 45,
		backSpeed: 40,
		loop: true,
		smartBackspace: true
	}

	var typed = new Typed("#typed", options);
}, 3060); // wait for 3 seconds before starting the Animation

function wait(sec) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < sec * 1000);
}



// ================================================================================================================
// Projects

//     /*
//       More about this function -
//       https://codepen.io/rachsmith/post/animation-tip-lerp
//     */
//     function lerp({
//         x,
//         y
//     }, {
//         x: targetX,
//         y: targetY
//     }) {
//         const fraction = 0.1;
//         x += (targetX - x) * fraction;
//         y += (targetY - y) * fraction;
//         return {
//             x,
//             y
//         };
//     }
//     class Slider {
//         constructor(el) {
//             const imgClass = this.IMG_CLASS = 'slider__images-item';
//             const textClass = this.TEXT_CLASS = 'slider__text-item';
//             const activeImgClass = this.ACTIVE_IMG_CLASS = `${imgClass}--active`;
//             const activeTextClass = this.ACTIVE_TEXT_CLASS = `${textClass}--active`;
//             this.el = el;
//             this.contentEl = document.getElementById('slider-content');
//             this.onMouseMove = this.onMouseMove.bind(this);

//             // taking advantage of the live nature of 'getElement...' methods
//             this.activeImg = el.getElementsByClassName(activeImgClass);
//             this.activeText = el.getElementsByClassName(activeTextClass);
//             this.images = el.getElementsByTagName('img');
//             document.getElementById('slider-dots').addEventListener('click', this.onDotClick.bind(this));
//             document.getElementById('left').addEventListener('click', this.prev.bind(this));
//             document.getElementById('right').addEventListener('click', this.next.bind(this));
//             window.addEventListener('resize', this.onResize.bind(this));
//             this.onResize();
//             this.length = this.images.length;
//             this.lastX = this.lastY = this.targetX = this.targetY = 0;
//         }
//         onResize() {
//             const htmlStyles = getComputedStyle(document.documentElement);
//             const mobileBreakpoint = htmlStyles.getPropertyValue('--mobile-bkp');
//             const isMobile = this.isMobile = matchMedia(`only screen and (max-width: ${mobileBreakpoint})`).matches;
//             this.halfWidth = innerWidth / 2;
//             this.halfHeight = innerHeight / 2;
//             this.zDistance = htmlStyles.getPropertyValue('--z-distance');
//             if (!isMobile && !this.mouseWatched) {
//                 this.mouseWatched = true;
//                 this.el.addEventListener('mousemove', this.onMouseMove);
//                 this.el.style.setProperty('--img-prev', `url(${this.images[+this.activeImg[0].dataset.id - 1].src})`);
//                 this.contentEl.style.setProperty('transform', `translateZ(${this.zDistance})`);
//             } else if (isMobile && this.mouseWatched) {
//                 this.mouseWatched = false;
//                 this.el.removeEventListener('mousemove', this.onMouseMove);
//                 this.contentEl.style.setProperty('transform', 'none');
//             }
//         }
//         getMouseCoefficients({
//             pageX,
//             pageY
//         } = {}) {
//             const halfWidth = this.halfWidth;
//             const halfHeight = this.halfHeight;
//             const xCoeff = ((pageX || this.targetX) - halfWidth) / halfWidth;
//             const yCoeff = (halfHeight - (pageY || this.targetY)) / halfHeight;
//             return {
//                 xCoeff,
//                 yCoeff
//             };
//         }
//         onMouseMove({
//             pageX,
//             pageY
//         }) {
//             this.targetX = pageX;
//             this.targetY = pageY;
//             if (!this.animationRunning) {
//                 this.animationRunning = true;
//                 this.runAnimation();
//             }
//         }
//         runAnimation() {
//             if (this.animationStopped) {
//                 this.animationRunning = false;
//                 return;
//             }
//             const maxX = 10;
//             const maxY = 10;
//             const newPos = lerp({
//                 x: this.lastX,
//                 y: this.lastY
//             }, {
//                 x: this.targetX,
//                 y: this.targetY
//             });
//             const {
//                 xCoeff,
//                 yCoeff
//             } = this.getMouseCoefficients({
//                 pageX: newPos.x,
//                 pageY: newPos.y
//             });
//             this.lastX = newPos.x;
//             this.lastY = newPos.y;
//             this.positionImage({
//                 xCoeff,
//                 yCoeff
//             });
//             this.contentEl.style.setProperty('transform', `
//   translateZ(${this.zDistance})
//   rotateX(${maxY * yCoeff}deg)
//   rotateY(${maxX * xCoeff}deg)
// `);
//             if (this.reachedFinalPoint) {
//                 this.animationRunning = false;
//             } else {
//                 requestAnimationFrame(this.runAnimation.bind(this));
//             }
//         }
//         get reachedFinalPoint() {
//             const lastX = ~~this.lastX;
//             const lastY = ~~this.lastY;
//             const targetX = this.targetX;
//             const targetY = this.targetY;
//             return (lastX == targetX || lastX - 1 == targetX || lastX + 1 == targetX) && (lastY == targetY || lastY - 1 == targetY || lastY + 1 == targetY);
//         }
//         positionImage({
//             xCoeff,
//             yCoeff
//         }) {
//             const maxImgOffset = 1;
//             const currentImage = this.activeImg[0].children[0];
//             currentImage.style.setProperty('transform', `
//   translateX(${maxImgOffset * -xCoeff}em)
//   translateY(${maxImgOffset * yCoeff}em)
// `);
//         }
//         onDotClick({
//             target
//         }) {
//             if (this.inTransit) return;
//             const dot = target.closest('.slider__nav-dot');
//             if (!dot) return;
//             const nextId = dot.dataset.id;
//             const currentId = this.activeImg[0].dataset.id;
//             if (currentId == nextId) return;
//             this.startTransition(nextId);
//         }
//         transitionItem(nextId) {
//             function onImageTransitionEnd(e) {
//                 e.stopPropagation();
//                 nextImg.classList.remove(transitClass);
//                 self.inTransit = false;
//                 this.className = imgClass;
//                 this.removeEventListener('transitionend', onImageTransitionEnd);
//             }
//             const self = this;
//             const el = this.el;
//             const currentImg = this.activeImg[0];
//             const currentId = currentImg.dataset.id;
//             const imgClass = this.IMG_CLASS;
//             const textClass = this.TEXT_CLASS;
//             const activeImgClass = this.ACTIVE_IMG_CLASS;
//             const activeTextClass = this.ACTIVE_TEXT_CLASS;
//             const subActiveClass = `${imgClass}--subactive`;
//             const transitClass = `${imgClass}--transit`;
//             const nextImg = el.querySelector(`.${imgClass}[data-id='${nextId}']`);
//             const nextText = el.querySelector(`.${textClass}[data-id='${nextId}']`);
//             let outClass = '';
//             let inClass = '';
//             this.animationStopped = true;
//             nextText.classList.add(activeTextClass);
//             el.style.setProperty('--from-left', nextId);
//             currentImg.classList.remove(activeImgClass);
//             currentImg.classList.add(subActiveClass);
//             if (currentId < nextId) {
//                 outClass = `${imgClass}--next`;
//                 inClass = `${imgClass}--prev`;
//             } else {
//                 outClass = `${imgClass}--prev`;
//                 inClass = `${imgClass}--next`;
//             }
//             nextImg.classList.add(outClass);
//             requestAnimationFrame(() => {
//                 nextImg.classList.add(transitClass, activeImgClass);
//                 nextImg.classList.remove(outClass);
//                 this.animationStopped = false;
//                 this.positionImage(this.getMouseCoefficients());
//                 currentImg.classList.add(transitClass, inClass);
//                 currentImg.addEventListener('transitionend', onImageTransitionEnd);
//             });
//             if (!this.isMobile) this.switchBackgroundImage(nextId);
//         }
//         startTransition(nextId) {
//             function onTextTransitionEnd(e) {
//                 if (!e.pseudoElement) {
//                     e.stopPropagation();
//                     requestAnimationFrame(() => {
//                         self.transitionItem(nextId);
//                     });
//                     this.removeEventListener('transitionend', onTextTransitionEnd);
//                 }
//             }
//             if (this.inTransit) return;
//             const activeText = this.activeText[0];
//             const backwardsClass = `${this.TEXT_CLASS}--backwards`;
//             const self = this;
//             this.inTransit = true;
//             activeText.classList.add(backwardsClass);
//             activeText.classList.remove(this.ACTIVE_TEXT_CLASS);
//             activeText.addEventListener('transitionend', onTextTransitionEnd);
//             requestAnimationFrame(() => {
//                 activeText.classList.remove(backwardsClass);
//             });
//         }
//         next() {
//             if (this.inTransit) return;
//             let nextId = +this.activeImg[0].dataset.id + 1;
//             if (nextId > this.length) nextId = 1;
//             this.startTransition(nextId);
//         }
//         prev() {
//             if (this.inTransit) return;
//             let nextId = +this.activeImg[0].dataset.id - 1;
//             if (nextId < 1) nextId = this.length;
//             this.startTransition(nextId);
//         }
//         switchBackgroundImage(nextId) {
//             function onBackgroundTransitionEnd(e) {
//                 if (e.target === this) {
//                     this.style.setProperty('--img-prev', imageUrl);
//                     this.classList.remove(bgClass);
//                     this.removeEventListener('transitionend', onBackgroundTransitionEnd);
//                 }
//             }
//             const bgClass = 'slider--bg-next';
//             const el = this.el;
//             const imageUrl = `url(${this.images[+nextId - 1].src})`;
//             el.style.setProperty('--img-next', imageUrl);
//             el.addEventListener('transitionend', onBackgroundTransitionEnd);
//             el.classList.add(bgClass);
//         }
//     }
//     const sliderEl = document.getElementById('slider');
//     const slider = new Slider(sliderEl);

//     // ------------------ Demo stuff ------------------------ //

//     let timer = 0;
//     function autoSlide() {
//         requestAnimationFrame(() => {
//             slider.next();
//         });
//         timer = setTimeout(autoSlide, 5000);
//     }
//     function stopAutoSlide() {
//         clearTimeout(timer);
//         this.removeEventListener('touchstart', stopAutoSlide);
//         this.removeEventListener('mousemove', stopAutoSlide);
//     }
//     sliderEl.addEventListener('mousemove', stopAutoSlide);
//     sliderEl.addEventListener('touchstart', stopAutoSlide);
//     timer = setTimeout(autoSlide, 2000);

// ================================================================================================================

//Progress Bar
var offsetStart = 0;
var offsetEnd = 0;

window.addEventListener('scroll', () => {
	document.documentElement.style.setProperty('--scroll', (window.pageYOffset - offsetStart) / (document.body.offsetHeight - offsetStart - offsetEnd - window.innerHeight));
}, false);
//Progress Bar


//Projects
const h = elem => {
	return elem.getBoundingClientRect().height;
};
const distance = (elemA, elemB, prop) => {
	const sizeA = elemA.getBoundingClientRect()[prop];
	const sizeB = elemB.getBoundingClientRect()[prop];
	return sizeB - sizeA;
};
const factor = (elemA, elemB, prop) => {
	const sizeA = elemA.getBoundingClientRect()[prop];
	const sizeB = elemB.getBoundingClientRect()[prop];
	return sizeB / sizeA;
};
document.querySelectorAll('.card').forEach(elem => {
	const head = elem.querySelector('.card__head');
	const image = elem.querySelector('.card__image');
	const author = elem.querySelector('.card__author');
	const bodyy = elem.querySelector('.card__body');
	const f = elem.querySelector('.card__foot');
	elem.onmouseenter = () => {
		elem.classList.add('hover');
		const imageScale = 1 + factor(head, bodyy, 'height');
		image.style.transform = `scale(${imageScale})`;
		const bodyDistance = h(f) * -1;
		bodyy.style.transform = `translateY(${bodyDistance}px)`;
		const authorDistance = distance(head, author, 'height');
		author.style.transform = `translateY(${authorDistance}px)`;
	};
	elem.onmouseleave = () => {
		elem.classList.remove('hover');
		image.style.transform = `none`;
		bodyy.style.transform = `none`;
		author.style.transform = `none`;
	};
});
//Projects

// ICONS backup 

window.onload = function () {
	document.querySelectorAll('.bi').forEach((icon, index) => {
	  let computedStyle = window.getComputedStyle(icon, '::before');
	  let iconContent = computedStyle.content;
  
	  if (!iconContent || iconContent === 'none' || iconContent === '""') {
		let fallbackImages = document.querySelectorAll('.fallback');
		if (fallbackImages[index]) {
		  fallbackImages[index].style.display = 'inline';
		}
	  }
	});
  };

// window.onload = function () {
// 	if (!document.querySelector('.bi')) {
// 	  document.getElementById('fallback').style.display = 'inline-block';
// 	}
//   };

//   window.onload = function () {
// 	let testIcon = document.querySelector('.bi.bi-github');
// 	let computedStyle = window.getComputedStyle(testIcon, '::before');
// 	let iconContent = computedStyle.content;
  
// 	if (!iconContent || iconContent === 'none' || iconContent === '""') {
// 	  document.querySelector('.fallback').style.display = 'inline';
// 	}
//   };
  
// ICONS backup 
