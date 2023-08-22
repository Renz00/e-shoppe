// Utilities
import { defineStore } from 'pinia'
import { allProducts, similarProducts } from "../http/products-api"

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    simProducts: [],
    selectedProduct: {},
    cartItemCount: 0,
    currentProductCategory: '',
  }),
  actions: {
    async fetchAllProducts(){
      const {data} = await allProducts()
      this.products = data.products
      // this.currentProductCategory = data.products.category
    },
    async fetchSelectedProduct(){
      // const {data} = await allProducts()
      // this.selectedProduct = data.products
    },
    async fetchSimilarProducts(category){
      const {data} = await similarProducts(category)
      this.simProducts = data.products
    },
    setCartItemCount(){
      this.cartItemCount++
    }
  }
})
