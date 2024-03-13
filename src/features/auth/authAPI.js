
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const res = await fetch(`http://localhost:8000/users`, {
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
    const email = loginInfo.email;
    const password = loginInfo.password
    const res = await fetch(`http://localhost:8000/users?email=${email}&password=${password}`);
    const data = await res.json();
    if (data.length > 0)
      resolve({ data: data[0] });
    else
      reject({ message: "Invalid username/password" })
  }
  );
}


