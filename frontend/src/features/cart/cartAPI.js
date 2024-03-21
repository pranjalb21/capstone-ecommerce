
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8000/cart`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' }
    });
    const data = res.json();
    resolve({ data });
  }
  );
}

export function fetchItemsByUserId(userId) {
  return new Promise(async(resolve) => {
    //Todo: Replace hard code of url;
    const res = await fetch(`http://localhost:8000/cart?userId=${userId}`);
    const data = await res.json();
    resolve({ data});
  }
  );
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8000/cart/${update.id}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    });
    const data = res.json();
    resolve({ data });
  }
  );
}

export function deleteCartItem(id) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8000/cart/${id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
    });
    const data = res.json();
    resolve({ data: {id: id} });
  }
  );
}

export function resetCart(userId) {
  return new Promise (async (resolve)=>{
    const response = await fetchItemsByUserId(userId);
    const items = response.data;
    for(let item of items){
      await deleteCartItem(item.id);
    }
    console.log(items)
    resolve({status: 'Success'})
  })
}