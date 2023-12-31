import api from "./api";

const url = "/favourites"

export const fetchFavourites = (token) => api.get(url, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const storeToFavourites = (favData, token) => api.post(url+'/store', favData,{
    headers: {
      Authorization: `Bearer ${token}`
    }
})

// export const createTask = (task) => api.post(url, task)

// export const updateTask = (id, task) => api.put(url+'/'+id, task)

// export const removeTask = (id) => api.delete(url+'/'+id)

// export const changeTaskStatus = (id, task) => api.patch(url+'/'+id+'/complete', task)
