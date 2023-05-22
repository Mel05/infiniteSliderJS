const slider = Array.from(document.querySelectorAll('.slider-single'))
const slideContainer = document.querySelector('.slider')

const leftButton = document.querySelector('.slider-prev')
const rightButton = document.querySelector('.slider-next')

let sliderWidth = document.querySelector('.slider-single').offsetWidth

let step = -1

slider.forEach(slide => slideContainer.removeChild(slide))

function renderSlide(direction) {
	step += direction === 'left' ? -1 : 1

	if (step === slider.length) {
		step = 0
	} else if (step < 0) {
		step = slider.length - 1
	}

	const nextSlide = slider[step].cloneNode(true)
	slideContainer.appendChild(nextSlide)
}

function animateSlider(direction) {
	leftButton.disabled = true
	rightButton.disabled = true

	const currentSlides = document.querySelectorAll('.slider-single')
	let offset = 0

	currentSlides.forEach(slide => {
		const distance =
			direction === 'left'
				? offset - (sliderWidth + 500)
				: offset + (sliderWidth + 500)
		slide.style.left = `${distance}px`
		offset++
	})

	currentSlides[0].addEventListener('transitionend', () => {
		currentSlides[0].remove()
		renderSlide(direction)
		leftButton.disabled = false
		rightButton.disabled = false
	})
}

function handleClickLeft() {
	animateSlider('left')
}

function handleClickRight() {
	animateSlider('right')
}

const setHeight = () => {
	let sliderHeight = document.querySelector('.slider-single').offsetHeight
	sliderWidth = document.querySelector('.slider-single').offsetWidth

	slideContainer.style.height = `${sliderHeight}px`
}

window.addEventListener('resize', setHeight)

renderSlide()
setHeight()

leftButton.addEventListener('click', handleClickLeft)
rightButton.addEventListener('click', handleClickRight)
