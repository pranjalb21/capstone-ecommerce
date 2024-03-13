
export function fetchLoggedInUserOrders(userId) {
  return new Promise(async(resolve) => {
    const res = await fetch(`http://localhost:8000/orders/?user.id=${userId}`);
    const data = res.json();
    resolve({ data });
  }
  );
}

export function fetchLoggedInUser(userId) {
  return new Promise(async(resolve) => {
    const res = await fetch(`http://localhost:8000/users/${userId}`);
    const data = res.json();
    resolve({ data });
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8000/users/${update.id}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    });
    const data = res.json();
    resolve({ data });
  }
  );
}