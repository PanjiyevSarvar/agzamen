fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => {
    const productList = document.getElementById('product-list');
    data.products.slice(0, 8).forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" width="100%" />
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <p>${product.rating} stars</p>
      `;
      productList.appendChild(card);
    });
  });
