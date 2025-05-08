let allProducts = [];

    async function fetchProducts() {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        const data = await response.json();
        allProducts = data.products;
        renderProducts(allProducts);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    }

    function renderProducts(products) {
      const container = document.getElementById('productsContainer');
      container.innerHTML = '';
      if (products.length === 0) {
        container.innerHTML = '<p>Ничего не найдено</p>';
        return;
      }
      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product';
        card.innerHTML = `
          <div>
            <img src="${product.thumbnail}" alt="${product.title}" />
            <div class="product-title">${product.title}</div>
            <div class="product-price">$${product.price}</div>
            <p>${product.description}</p>
          </div>
        `;
        container.appendChild(card);
      });
    }

    function applyFilters() {
      const searchTerm = document.getElementById('searchInput').value.toLowerCase();
      const maxPrice = parseFloat(document.getElementById('priceInput').value);

      const filtered = allProducts.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm);
        const matchesPrice = isNaN(maxPrice) || product.price <= maxPrice;
        return matchesSearch && matchesPrice;
      });

      renderProducts(filtered);
    }

    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('priceInput').addEventListener('input', applyFilters);

    fetchProducts();