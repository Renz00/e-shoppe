import api from "./api";

const url = "/products"
const url2 = "/favourites"

export const loadPaginatedProducts = () => api.get(url+'/fetch/paginated')
export const fetchOrderProducts = (orderProducts) => api.post(url+'/order/products', orderProducts)
export const loadMore = (limit) => api.get(url+'/load-more/'+limit)
export const loadProductFilterPage = (filter, link) => api.post(link, filter)
export const loadProductPage = (link) => api.get(link)
export const filterProducts = (filters) => api.post(url+'/filter', filters)
export const showProduct = (id) => api.get(url+'/'+id)
export const searchProducts = (searchSlug) => api.get(url+'/search-products/'+searchSlug)
export const storeToFavourites = (favData, token) => api.post(url2+'/store', favData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })


// export const createTask = (task) => api.post(url, task)

// export const updateTask = (id, task) => api.put(url+'/'+id, task)

// export const removeTask = (id) => api.delete(url+'/'+id)

// export const changeTaskStatus = (id, task) => api.patch(url+'/'+id+'/complete', task)
