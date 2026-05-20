export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://marketplace-backend-wjy0.onrender.com/api"
    : "http://localhost:5000/api";

export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const createBooking = async (data, token) => {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getMyArtisanProfile = async (token) => {
  const res = await fetch(`${API_URL}/artisans/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

// CART
export const getCart = async (token) => {
  const res = await fetch(`${API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const addToCart = async (data, token) => {
  const res = await fetch(`${API_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const removeFromCart = async (data, token) => {
  const res = await fetch(`${API_URL}/cart/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
