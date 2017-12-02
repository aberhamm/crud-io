class Api {
  static login(credentials) {
    const uri = '/auth/login';
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(credentials)
    };

    return fetch(uri, options).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static register(credentials) {
    const uri = '/auth/signup';
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(credentials)
    };

    return fetch(uri, options).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getDashboard() {
    const uri = '/api/dashboard';
    const options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.auth_token
      })
    };

    return fetch(uri, options).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static putUser(user) {
    const uri = '/api/users/' + user.id;
    const options = {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.auth_token
      }),
      body: JSON.stringify(user)
    };

    return fetch(uri, options).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static postDonation(donation) {
    const uri = '/api/donations';
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.auth_token
      }),
      body: JSON.stringify(donation)
    };

    return fetch(uri, options).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getUserDonations(userId) {
    const uri = `/api/users/${userId}/donations`;
    const options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.auth_token
      })
    };

    return fetch(uri, options).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getAllDonations() {
    const uri = '/api/donations';
    const options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.auth_token
      })
    };

    return fetch(uri, options).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default Api;
