// Utilities
import { defineStore } from 'pinia'
import { allProducts } from "../http/products-api"

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: []
  }),
  actions: {
    async fetchAllProducts(){
      const {data} = await allProducts()
      this.products = data.products
    }
  }
})
