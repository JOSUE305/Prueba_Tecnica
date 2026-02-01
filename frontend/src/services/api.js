const API_URL = "http://localhost:3000/api";


//metodos de los productos
//ver producto
export async function getProducts() {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
}

// agregar producto
export async function addProduct(token, product) {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  return res.json();
}

// actualizar producto
export async function updateProduct(token, id, product) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  return res.json();
}

// eliminar producto
export async function deleteProduct(token, id) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}


//metodo de login

export async function login(username, password) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}



export async function addToCart(token, productId, quantity, price) {
  const res = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ product_id: productId, quantity, price }),
  });
  return res.json();
}

export async function getCart(token) {
  const res = await fetch(`${API_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}


// obtener categorías 
export async function getCategories() {
   const res = await fetch(`${API_URL}/categories`);
    return res.json(); 
  }


  export async function register({ username, password, role }) {
  try {
    const res = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });
    return await res.json();
  } catch (err) {
    return { message: "Error de conexión con el servidor" };
  }
}

