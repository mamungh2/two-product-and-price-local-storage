const addProduct = () => {
    const productName1 = document.getElementById('product-name1');
    const product1 = productName1.value;
    const productPrice1 = document.getElementById('product-price1');
    const price1 = productPrice1.value;
    const productName2 = document.getElementById('product-name2');
    const product2 = productName2.value;
    const productPrice2 = document.getElementById('product-price2');
    const price2 = productPrice2.value;

    if (!product1 && !price1 && !product2 && !price2) {
        return;
    }
    productName1.value = '';
    productPrice1.value = '';
    productName2.value = '';
    productPrice2.value = '';
    addProductToLocalStorage(product1, price1, product2, price2);
    displayLocalStorageProduct();
}

const getProduct = () => {
    const productStr = localStorage.getItem('product');
    let productObj;
    if (productStr) {
        productObj = JSON.parse(productStr);
    }
    else {
        productObj = {};
    }
    return productObj;
}

const addProductToLocalStorage = (product1, price1, product2, price2) => {
    const productObj = getProduct();
    if (!product2 || !price2) {
        if (productObj[product1]) {
            productObj[product1] = parseFloat(productObj[product1]) + parseFloat(price1);
        }
        else {
            productObj[product1] = price1;
        }
    }
    else if (!product1 || !price1) {
        if (productObj[product2]) {
            productObj[product2] = parseFloat(productObj[product2]) + parseFloat(price2);
        }
        else {
            productObj[product2] = price2;
        }
    }
    else {
        if (productObj[product1]) {
            productObj[product1] = parseFloat(productObj[product1]) + parseFloat(price1);
        }
        else {
            productObj[product1] = price1;
        }
        if (productObj[product2]) {
            productObj[product2] = parseFloat(productObj[product2]) + parseFloat(price2);
        }
        else {
            productObj[product2] = price2;
        }
    }
    const productStringified = JSON.stringify(productObj);
    localStorage.setItem('product', productStringified);
}

const displayProduct = (product1, price1) => {
    const productList = document.getElementById('product-list');
    const li = document.createElement('li');
    li.innerText = product1 + ' - ' + price1;
    productList.appendChild(li);
}

const displayLocalStorageProduct = () => {
    document.getElementById('product-list').textContent = '';
    const productObj = getProduct();
    for (const key in productObj) {
        displayProduct(key, productObj[key]);
    }
}

displayLocalStorageProduct();

// place order
const placeOrder = () => {
    localStorage.removeItem('product');
    location.reload();
}


