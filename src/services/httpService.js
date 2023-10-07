const httpService = {
  login: data => {
    return fetch('http://localhost:3000/employee/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  },
  createUser: data => {
    return fetch('http://localhost:3000/employee/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  },

  createProduct: (data) => {
    return fetch('http://localhost:3000/employee/Product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    });
  },
  getProducts: async () => {

    const response = await fetch('http://localhost:3000/employee/Product', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 'authorization': localStorage.getItem('token')
      }
    });
    const data = await response.json();
    return data;

  },
  getEmployee: async (value) => {

    const response = await fetch('http://localhost:3000/employee/id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'authorization': localStorage.getItem('token') },
      body: JSON.stringify(value)
    })
    const data = await response.json();
    return data;

  },
  createPromotion: (data) => {
    return fetch('http://localhost:3000/employee/Product/id', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json', 'authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    });
  },
  removeProduct: (data) => {
    return fetch('http://localhost:3000/employee/Product/id', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', 'authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    });

  }
}


export default httpService;
