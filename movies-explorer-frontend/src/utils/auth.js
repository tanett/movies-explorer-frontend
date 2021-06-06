import {configApi} from "./constants.js";

export const register = (name, email, passw) => {
  return fetch(`${configApi.baseUrl}/signup`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',

    },
    credentials: "include",
    body: JSON.stringify({
      'name': name,
      'email': email,
      "password": passw
    })

  }).then(res => {
    return res.json()
  })
      .then(res => {
        console.log(res);
        return res
      })

}

export const authorize = (email, password) => {
  return fetch(`${configApi.baseUrl}/signin`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          'email': email,
          "password": password
        })
      }
  ).then(res => res.json())
      .then(res => {
            if (res.token) {
              localStorage.setItem('jwt', res.token);
            }
            return res
          }
      )

}

export const checkToken = (token) => {
  return fetch(`${configApi.baseUrl}/users/me`, {
    method: 'GET',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
      .then(res => res.json())
      .then(data => data)
}
