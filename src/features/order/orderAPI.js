
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
