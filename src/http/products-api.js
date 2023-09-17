import api from "./api";

const url = "/v1/products"

export const allProducts = () => api.get(url)
export const similarProducts = (category) => api.get(url+'/category/'+category)
export const loadMore = (limit) => api.get(url+'/load-more/'+limit)
export const loadPaginatedProducts = () => api.get(url+'/fetch/paginated')
export const loadProductPage = (page) => api.get(url+'/fetch/paginated?page='+page)
export const filterProducts = (filters) => api.post(url+'/filter', filters)

// export const createTask = (task) => api.post(url, task)

// export const updateTask = (id, task) => api.put(url+'/'+id, task)

// export const removeTask = (id) => api.delete(url+'/'+id)

// export const changeTaskStatus = (id, task) => api.patch(url+'/'+id+'/complete', task)
