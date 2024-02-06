
document.addEventListener('DOMContentLoaded', fetchData);

let currentCategory = 'Men';
let productData = null;

function fetchData() {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            productData = data;
            showCategory(currentCategory);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function showCategory(category) {
    if (productData) {
        const categoryProducts = productData.categories.find(cat => cat.category_name === category)?.category_products || [];
        displayProducts(categoryProducts);
        updateTabIcons(category);
    }
}

function displayProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImageContainer = document.createElement('div');
    productImageContainer.classList.add('product-image-container');

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;
    productImage.classList.add('product-image');

    const badge = document.createElement('div');
    badge.classList.add('badge');
    badge.innerText = product.badge_text || 'New Arrival';

    productImageContainer.appendChild(productImage);
    productImageContainer.appendChild(badge);

    const productTitle = document.createElement('div');
    productTitle.classList.add('product-title');
    productTitle.innerText = product.title;

    
    const vendor = document.createElement('div');
    vendor.classList.add('vendor');
    vendor.innerText = '• ' + product.vendor;

    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container');

    const price = document.createElement('div');
    price.classList.add('price');
    price.innerText = 'Rs ' + product.price;

    const comparePrice = document.createElement('div');
    comparePrice.classList.add('compare-price');
    comparePrice.innerText = 'Compare at: ' + product.compare_at_price;

    const discount = document.createElement('div');
    discount.classList.add('discount');
    discount.innerText = '' + calculateDiscount(product.price, product.compare_at_price) + '% off';

    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('add-to-cart-button');
    addToCartButton.innerText = 'Add to Cart';

    productCard.appendChild(productImageContainer);
    productCard.appendChild(productTitle);
    productCard.appendChild(vendor);
    priceContainer.appendChild(price);
    priceContainer.appendChild(comparePrice);
    productCard.appendChild(priceContainer);
    productCard.appendChild(discount);
    productCard.appendChild(addToCartButton);

    return productCard;
}

function calculateDiscount(price, comparePrice) {
    const discountPercentage = ((comparePrice - price) / comparePrice) * 100;
    return discountPercentage.toFixed(2);
}

function updateTabIcons(selectedCategory) {
    const tabIcons = {
        'Men': '<i class="fas fa-male"></i>  Men',
        'Women': '<i class="fas fa-female"></i>  Women',
        'Kids': '<i class="fas fa-child"></i>  Kids'
    };

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        const category = tab.dataset.category;
        tab.innerHTML = category === selectedCategory ? tabIcons[category] : category;
    });
}
