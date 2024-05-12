// Slick carousel
$('.slick-carousel').slick()

// DOM elements
const cards = document.getElementById('cards')
const buttons = document.getElementsByClassName('btn-accent')

const image = document.getElementById('image')
const name = document.getElementById('name')
const brand = document.getElementById('brand')
const storage = document.getElementById('storage')
const display = document.getElementById('display')
const processor = document.getElementById('processor')
const ram = document.getElementById('ram')
const sensors = document.getElementById('sensors')
const released = document.getElementById('released')

const search = document.getElementById('search')
const loading = document.getElementById('loading')
const notFound = document.getElementById('not-found')
const form = document.getElementById('form')

// Variables
let model = []
let len = 0

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
	fetchData()
})

search.addEventListener('input', (e) => {
	if (e.target.value) {
		fetchData(e.target.value)
	} else {
		fetchData()
	}
})

form.addEventListener('submit', (e) => {
	e.preventDefault()
})


const addBtnListeners = () => {
	Array.from(buttons).forEach((btn) => {
		btn.addEventListener('click', (e) => {
			const id = e.target.parentElement.parentElement.parentElement.id
			fetchDetails(id)
		})
	})
}




const fetchData = async (search = 'iphone') => {
	loading.style.opacity = 1
	cards.style.opacity = 0
	fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
		.then((res) => res.json())
		.then((data) => {
			loading.style.opacity = 0
			model = data.data
			len = model.length
			renderData()
			cards.style.opacity = 1
		})
		.catch((err) => console.log(err))
}


const renderData = async () => {
	cards.innerHTML = ''

	if (len === 0) {
		notFound.style.opacity = 1
	} else {
		notFound.style.opacity = 0
	}

	let limit = len > 12 ? 12 : len

	renderWithinLimit(0, limit)

	if (len > 12) {
		const showAllBtn = document.createElement('btn')
		showAllBtn.classList.add('btn', 'btn-secondary')
		showAllBtn.innerText = 'Show All'

		showAllBtn.addEventListener('click', () => {
			renderWithinLimit(12, len)

			showAllBtn.remove()
		})

		cards.appendChild(showAllBtn)
	}
}


const renderWithinLimit = (start, end) => {
	const fragment = document.createDocumentFragment()

	for (let i = start; i < end; i++) {
		const item = model[i]
		const card = document.createElement('div')
		card.classList.add('card-container')

		card.id = item.slug

		const elements = `
            <figure class="px-10 pt-10">
                <img
                    src="${item.image}"
                    alt="${item.phone_name}"
                    class="rounded-xl"
                />
            </figure>
            <div class="items-center text-center card-body">
                <h2 class="mb-2 card-title">${item.phone_name}</h2>
                <div class="card-actions">
                    <button class="btn btn-accent">
                        See details
                    </button>
                </div>
            </div>
        `

		card.innerHTML = elements
		fragment.appendChild(card)
	}

	cards.appendChild(fragment)
	addBtnListeners()
}


const fetchDetails = async (id) => {
	fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
		.then((res) => res.json())
		.then((data) => {
			changeModalData(data.data)
			modal.showModal()
		})
		.catch((err) => console.log(err))
}


const changeModalData = (data) => {
	image.src = data.image
	name.innerText = data.name
	brand.innerText = data.brand
	storage.innerText = data.mainFeatures.storage
	display.innerText = data.mainFeatures.displaySize
	processor.innerText = data.mainFeatures.chipSet
	ram.innerText = data.mainFeatures.memory
	sensors.innerText = data.mainFeatures.sensors
	released.innerText = data.releaseDate
}
