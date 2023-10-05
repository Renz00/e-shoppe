import api from "./api";

const url = "/orders"

export const storeOrder = (orderData, token) => api.post(url+'/store', orderData,{
    headers: {
      Authorization: `Bearer ${token}`
    }
})

export const showOrder = (orderId, token) => api.get(url+`/${orderId}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

// export const createTask = (task) => api.post(url, task)

// export const updateTask = (id, task) => api.put(url+'/'+id, task)

// export const removeTask = (id) => api.delete(url+'/'+id)

// export const changeTaskStatus = (id, task) => api.patch(url+'/'+id+'/complete', task)
