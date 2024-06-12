// public/scripts.js
function findProductCode() {
    const productName = document.getElementById('product-name').value.trim();

    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
            const resultDiv = document.getElementById('result');
            if (product) {
                resultDiv.innerText = `Product Code: ${product.code}`;
            } else {
                resultDiv.innerText = 'Product not found';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function addProduct() {
    const name = document.getElementById('new-product-name').value.trim();
    const code = document.getElementById('new-product-code').value.trim();

    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, code }),
    })
        .then(response => response.json())
        .then(product => {
            alert(`Product added: ${product.name} - ${product.code}`);
            document.getElementById('new-product-name').value = '';
            document.getElementById('new-product-code').value = '';
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function viewAllProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const productListDiv = document.getElementById('product-list');
            productListDiv.innerHTML = '<h2>Product List</h2>';
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.innerText = `${product.name}: ${product.code}`;
                productListDiv.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function deleteProduct() {
    const productName = document.getElementById('delete-product-name').value.trim();

    fetch('/api/products', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: productName }),
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert(`Product deleted: ${productName}`);
                document.getElementById('delete-product-name').value = '';
                viewAllProducts();
            } else {
                alert(`Error: ${result.error}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
