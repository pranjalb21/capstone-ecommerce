
export function createOrder(order) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8000/orders`, {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' }
    });
    const data = res.json();
    resolve({ data });
  }
  );
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8000/orders/${order.id}`, {
      method: 'PATCH',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' }
    });
    const data = res.json();
    resolve({ data });
  }
  );
}


export function fetchAllOrders(sort, pagination) {
  let queryString = '';
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }
  
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }
  
  return new Promise(async (resolve) => {
    //Todo: Replace hard code of url;
    const res = await fetch(`http://localhost:8000/orders?` + queryString);
    const data = await res.json();
    const totalOrders = await res.headers.get('X-Total-Count');
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  }
  );
}

