import api from "./api";

const url = "products"

export const allProducts = () => api.get(url+"?limit=12")

// export const createTask = (task) => api.post(url, task)

// export const updateTask = (id, task) => api.put(url+'/'+id, task)

// export const removeTask = (id) => api.delete(url+'/'+id)

// export const changeTaskStatus = (id, task) => api.patch(url+'/'+id+'/complete', task)
