
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //Todo: Replace hard code of url;
    const res = await fetch(`http://localhost:8000/products`);
    const data = await res.json();
    resolve({ data });
  }
  );
}

export function fetchProductByID(id) {
  return new Promise(async (resolve) => {
    //Todo: Replace hard code of url;
    const res = await fetch(`http://localhost:8000/products/${id}`);
    const data = await res.json();
    resolve({ data });
  }
  );
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    //Todo: Replace hard code of url;
    const res = await fetch(`http://localhost:8000/products/`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' },
    });
    const data = await res.json();
    resolve({ data });
  }
  );
}

export function updateProduct(product) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8000/products/${product.id}`, {
      method: 'PATCH',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' }
    });
    const data = res.json();
    resolve({ data });
  }
  );
}
export function fetchProductsByFilter(filter, sort, pagination) {
  let queryString = '';
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }
  return new Promise(async (resolve) => {
    //Todo: Replace hard code of url;
    const res = await fetch(`http://localhost:8000/products?` + queryString);
    const data = await res.json();
    const totalItems = await res.headers.get('X-Total-Count');
    resolve({ data: { products: data, totalItems: totalItems } });
  }
  );
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    //Todo: Replace hard code of url;
    const res = await fetch(`http://localhost:8000/categories`);
    const data = await res.json();
    resolve({ data });
  }
  );
}
export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    //Todo: Replace hard code of url;
    const res = await fetch(`http://localhost:8000/brands`);
    const data = await res.json();
    resolve({ data });
  }
  );
}
