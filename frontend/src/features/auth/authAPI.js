
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8000/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' }
    });
    const data = res.json();
    resolve({ data });
  }
  );
}

export function signOut(userId) {
  return new Promise(async (resolve) => {

    resolve({ data: "success" });
  }
  );
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`http://localhost:8000/auth/login`, {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' }
      });
      if (res.ok) {
        const data = await res.json();
        resolve({ data })
      } else {
        const error = await res.json();
        reject(error)
      }
    } catch (error) {
      reject(error);
    }
  }
  );
}


