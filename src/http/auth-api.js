import api from "./api";

const url = "/auth"

export const login = (creds) => api.post(url+'/login', creds)
.then(function (response) {
 return response
})
.catch(function (error) {
  return error
})

export const register = (newUser) => api.post(url+'/register', newUser)
.then(function (response) {
  return response
 })
.catch(function (error) {
  return error
})

export const logout = (token) => api.post(url+'/logout', {} ,{
    headers: {
      Authorization: `Bearer ${token}`
    }
})
.then(function (response) {
  return response
})
.catch(function (error) {
    return error
})

// export const revokeToken = (token) => api.post(url+'/revoke', {} ,{
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// })
// export const updateTask = (id, task) => api.put(url+'/'+id, task)

// export const removeTask = (id) => api.delete(url+'/'+id)

// export const changeTaskStatus = (id, task) => api.patch(url+'/'+id+'/complete', task)
