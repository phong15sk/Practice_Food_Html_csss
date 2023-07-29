let openShopping = document.querySelector('.shopping')
let body = document.querySelector('body')
let closeShopping = document.querySelector('.closeShopping')
let list = document.querySelector('.list')
let listCardUi = document.querySelector('.listCard')
let totalUi = document.querySelector('.total')
let quantityUi = document.querySelector('.quantity')

openShopping.addEventListener('click', () => {
    if (body.classList.contains('active')) {
        body.classList.remove('active');
    }
    else {
        body.classList.add('active');
    }
})

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

let products = [
    {
        id: 1,
        name: 'Product 1',
        image: '1.PNG',
        price: 110000
    },
    {
        id: 2,
        name: 'Product 2',
        image: '2.PNG',
        price: 120000
    },
    {
        id: 3,
        name: 'Product 3',
        image: '3.PNG',
        price: 130000
    },
    {
        id: 4,
        name: 'Product 4',
        image: '4.PNG',
        price: 140000
    },
    {
        id: 5,
        name: 'Product 5',
        image: '5.PNG',
        price: 150000
    },
    {
        id: 6,
        name: 'Product 6',
        image: '6.PNG',
        price: 160000
    }
]
const listCards = JSON.parse(localStorage.listCards || null) || [];
function initApp() {
    products.forEach((value, key) => {
        var newDiv = document.createElement('div')
        newDiv.classList.add('item')
        newDiv.innerHTML = `
        <img src="image/${value.image}">
        <div>${value.name}</div>
        <div>${VND.format(value.price)}</div>
        <button onclick="addToCard(${value.id})">Add To Card </button>
        `
        list.appendChild(newDiv)
    })
}

function addToCard(productId) {
    var product = products.filter(x => x.id === productId)[0]
    if (product != null) {
        var itemResut = listCards.filter(x => x.productId === product.id).map(x => x.quantity += 1)
        if (itemResut == null || itemResut.length === 0) {
            var itemCard =
            {
                productId: product.id,
                productName: product.name,
                productPrice: product.price,
                productImage: product.image,
                quantity: 1
            }
            listCards.push(itemCard)
        }
        localStorage.listCards = JSON.stringify(listCards)
    }
    loadCard()
}

function removeToCard(productId) {
    var product = products.filter(x => x.id === productId)[0]
    if (product != null) {
        var itemResut = listCards.filter(x => x.productId === product.id).map(x => x.quantity -= 1)
        if (itemResut != null && itemResut.length > 0 && itemResut[0] === 0) {
            var index = listCards.findIndex(x => x.productId === product.id)
            if (index > -1) {
                listCards.splice(index, 1)
            }
        }
        localStorage.listCards = JSON.stringify(listCards)
    }

    loadCard()
}

function loadCard() {
    listCardUi.innerHTML = '';
    listCards.forEach((value, key) => {
        var newLi = document.createElement('li')
        newLi.classList.add('item')
        newLi.innerHTML = `
        <img src="image/${value.productImage}">
        <div>${value.productName}</div>
        <div>${value.productPrice}</div> 
        <button onclick="removeToCard(${value.productId})">-</button>
        <span>${value.quantity}</span>
        <button onclick="addToCard(${value.productId})">+</button>
        `
        listCardUi.appendChild(newLi)
    })
    loadTotalAndQuantity()
}

function loadTotalAndQuantity() {
    var total = 0
    listCards.forEach((value, key) => {
        total += value.productPrice * value.quantity
    })

    totalUi.innerHTML = VND.format(total)
    quantityUi.innerHTML = listCards.length
}

initApp()
loadCard()
loadTotalAndQuantity()


