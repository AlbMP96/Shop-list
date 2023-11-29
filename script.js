const submit = document.getElementById('submit');
const productList = document.getElementById('product-list');
const filter = document.getElementById('filter');
const remove = document.getElementById('remove');

const products = [];

let id = null;

window.addEventListener('load', () => {
    if (localStorage.getItem('products')) {
        const productArr = JSON.parse(localStorage.getItem('products'));
        productArr.forEach((product) => {
            products.push(product);
        });
    }
    render();
});

// Add or edit product on submit
submit.addEventListener('click', (e) => {
    e.preventDefault();
    const product = document.getElementById('product');

    if (!products.includes(product.value) && product.value != '') {
        if (id === null) {
            // If id === null create new product
            products.push(product.value);

            localStorage.setItem('products', JSON.stringify(products));
        } else {
            // If id !== null edit product with that id
            products.splice(id, 1, product.value);
            localStorage.setItem('products', JSON.stringify(products));
        }

        render();
    }
    product.value = '';
    id = null;
});

// Remove product
productList.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.tagName == 'BUTTON') {
        if (window.confirm('¿Eliminar producto?')) {
            products.splice(e.target.parentElement.id, 1);

            localStorage.setItem('products', JSON.stringify(products));
            render();
        }
    }
});

// Add product to input to edit
productList.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName == 'DIV' || e.target.tagName == 'SPAN') {
        const input = document.getElementById('product');
        if (e.target.tagName == 'SPAN') {
            id = e.target.parentElement.id;
        } else {
            id = e.target.id;
        }
        input.value = e.target.firstChild.textContent;
    }
});

// Filter products
filter.addEventListener('input', (e) => {
    const content = filter.value;
    const productSpanList = productList.querySelectorAll('span');

    productSpanList.forEach((product) => {
        if (product.textContent.includes(content)) {
            product.parentElement.classList.remove('hide');
        } else {
            product.parentElement.classList.add('hide');
        }
    });
});

// Remove all products
remove.addEventListener('click', () => {
    if (window.confirm('¿Eliminar todo?')) {
        const list = document.querySelectorAll('.product');

        list.forEach((product) => {
            productList.removeChild(product);
        });

        products.splice(0, products.length);
        localStorage.setItem('products', JSON.stringify(products));
    }
});

// Show product list
function render() {
    const list = document.querySelectorAll('.product');

    list.forEach((product) => {
        productList.removeChild(product);
    });

    products.forEach((product) => {
        createProduct(product, products.indexOf(product));
    });
}

// Create product element
function createProduct(product, productId) {
    const list = document.getElementById('product-list');
    const div = document.createElement('div');
    const span = document.createElement('span');

    div.id = productId;
    div.className = 'product';
    span.textContent = product;

    const button = document.createElement('button');
    button.textContent = 'X';

    div.appendChild(span);
    div.appendChild(button);
    list.appendChild(div);
}
