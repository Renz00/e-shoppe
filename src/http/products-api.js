import api from "./api";

const url = "/api/v1/products"

export const allProducts = () => api.get(url)


export const similarProducts = (category) => api.get(url+'/category/'+category)

// export const createTask = (task) => api.post(url, task)

// export const updateTask = (id, task) => api.put(url+'/'+id, task)

// export const removeTask = (id) => api.delete(url+'/'+id)

// export const changeTaskStatus = (id, task) => api.patch(url+'/'+id+'/complete', task)
